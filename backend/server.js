const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Target recipient email
const RECIPIENT_EMAIL = process.env.EMAIL_USER || 'bhavanavemireddy6@gmail.com';

// POST Route for Contact Form & Modal Inquiries
app.post('/contact', async (req, res) => {
    const { name, email, subject, message, phone, company, purpose } = req.body;

    // Check if essential fields are provided
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }

    const contactPurpose = purpose || subject || 'General Inquiry';

    try {
        // --- STEP 1: CONFIGURE NODEMAILER ---
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER || 'bhavanavemireddy6@gmail.com',
                pass: process.env.EMAIL_PASS
            }
        });

        // --- STEP 2: NOTIFICATION EMAIL TO BHAVANA ---
        const myMailOptions = {
            from: `"Portfolio Inquiry" <${process.env.EMAIL_USER || 'bhavanavemireddy6@gmail.com'}>`,
            replyTo: email,
            to: RECIPIENT_EMAIL,
            subject: `New Portfolio Inquiry: ${contactPurpose} from ${name}`,
            text: `You received a new inquiry from your portfolio website!

----------------------------------------
Full Name: ${name}
Email Address: ${email}
Phone Number: ${phone || 'Not provided'}
Company / Org: ${company || 'Not provided'}
Purpose of Contact: ${contactPurpose}
----------------------------------------

Message:
${message}
`,
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px;">
                <div style="background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%); padding: 18px 24px; border-radius: 12px; margin-bottom: 24px; color: #ffffff;">
                    <h2 style="margin: 0; font-size: 20px;">New Portfolio Inquiry!</h2>
                    <p style="margin: 4px 0 0 0; opacity: 0.9; font-size: 13px;">Received from your "Start a Conversation" form</p>
                </div>

                <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 10px 0; color: #64748b; font-size: 13px; font-weight: bold; width: 35%;">FULL NAME</td>
                        <td style="padding: 10px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${name}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 10px 0; color: #64748b; font-size: 13px; font-weight: bold;">EMAIL ADDRESS</td>
                        <td style="padding: 10px 0; color: #0f172a; font-size: 14px;"><a href="mailto:${email}" style="color: #ea580c; text-decoration: none; font-weight: 600;">${email}</a></td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 10px 0; color: #64748b; font-size: 13px; font-weight: bold;">PHONE NUMBER</td>
                        <td style="padding: 10px 0; color: #0f172a; font-size: 14px;">${phone ? `<a href="tel:${phone}" style="color: #0f172a; text-decoration: none;">${phone}</a>` : '<span style="color: #94a3b8;">Not provided</span>'}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 10px 0; color: #64748b; font-size: 13px; font-weight: bold;">COMPANY / ORG</td>
                        <td style="padding: 10px 0; color: #0f172a; font-size: 14px;">${company || '<span style="color: #94a3b8;">Not provided</span>'}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #f1f5f9;">
                        <td style="padding: 10px 0; color: #64748b; font-size: 13px; font-weight: bold;">PURPOSE OF CONTACT</td>
                        <td style="padding: 10px 0; color: #ea580c; font-size: 14px; font-weight: 700;">${contactPurpose}</td>
                    </tr>
                </table>

                <div style="background: #f8fafc; border-left: 4px solid #ea580c; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
                    <div style="color: #64748b; font-size: 12px; font-weight: bold; margin-bottom: 8px;">MESSAGE</div>
                    <div style="color: #1e293b; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
                </div>

                <div style="text-align: center; padding-top: 16px; border-top: 1px solid #f1f5f9; color: #94a3b8; font-size: 12px;">
                    Hit "Reply" to respond directly to ${email}
                </div>
            </div>
            `
        };

        // --- STEP 3: AUTO-REPLY TO VISITOR ---
        const visitorMailOptions = {
            from: `"Vemireddy Bhavana" <${process.env.EMAIL_USER || 'bhavanavemireddy6@gmail.com'}>`,
            to: email,
            subject: `Thank you for reaching out, ${name}!`,
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 24px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px;">
                <h2 style="color: #0f172a; margin-top: 0;">Hi ${name},</h2>
                <p style="color: #334155; font-size: 15px; line-height: 1.6;">
                    Thank you for reaching out regarding <strong>${contactPurpose}</strong>! I have received your message and will review it and get back to you within 24 hours.
                </p>
                <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0; font-weight: bold; color: #0f172a;">Best regards,</p>
                    <p style="margin: 4px 0 0 0; color: #ea580c; font-weight: bold; font-size: 16px;">Vemireddy Bhavana</p>
                    <p style="margin: 2px 0 0 0; color: #64748b; font-size: 13px;">Full Stack Developer & UI/UX Designer</p>
                </div>
            </div>
            `
        };

        // Send emails
        await transporter.sendMail(myMailOptions);
        transporter.sendMail(visitorMailOptions).catch(err => console.log('Auto-reply log:', err.message));

        // --- STEP 4: GOOGLE SHEETS SYNC (NON-BLOCKING) ---
        if (process.env.GOOGLE_SCRIPT_URL) {
            axios.post(process.env.GOOGLE_SCRIPT_URL, {
                name,
                email,
                subject: contactPurpose,
                message: `${phone ? `Phone: ${phone} | ` : ''}${company ? `Company: ${company} | ` : ''}${message}`
            }).catch(err => console.error('Google Sheets sync skipped:', err.message));
        }

        // Return clean success response
        res.status(200).json({
            success: true,
            message: "Inquiry received and sent successfully!"
        });

    } catch (error) {
        console.error('Submission Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to deliver message."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
