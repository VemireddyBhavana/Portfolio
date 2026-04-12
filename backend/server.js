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

// POST Route for Contact Form
app.post('/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Check if all fields are provided
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    try {
        // --- STEP 1: SEND EMAILS (Nodemailer) ---
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email to YOU (Notification)
        const myMailOptions = {
            from: email,
            to: process.env.EMAIL_USER,
            subject: "New Contact Form Submission",
            text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
        };

        // Email to VISITOR (Auto-Reply)
        const visitorMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Thank you for reaching out!",
            text: `Hi ${name},\n\nThank you for contacting me! I have received your message regarding "${subject}" and will get back to you as soon as possible.\n\nBest regards,\nVemireddy Bhavana`
        };

        const emailToMePromise = transporter.sendMail(myMailOptions);
        const emailToVisitorPromise = transporter.sendMail(visitorMailOptions);

        // --- STEP 2: SEND DATA TO GOOGLE SHEETS (Axios) ---
        const googleSheetsPromise = axios.post(process.env.GOOGLE_SCRIPT_URL, {
            name,
            email,
            subject,
            message
        });

        // Run all tasks simultaneously
        await Promise.all([emailToMePromise, emailToVisitorPromise, googleSheetsPromise]);

        // Success Response
        res.status(200).json({
            success: true,
            message: "Message sent successfully"
        });

    } catch (error) {
        console.error('Submission Error:', error);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
