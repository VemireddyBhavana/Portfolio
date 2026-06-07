# 📡 Portfolio Website (Backend API Server)

This directory contains the backend server codebase, built on Node.js, Express, and Nodemailer, designed to securely handle contact form submissions, manage automated email notifications, and synchronise messages to Google Sheets in real-time.

---

## 🛠️ Features & Integrations

- **📧 Nodemailer Notifications**: Instant alerts sent directly to the site owner on every new form submission.
- **✉️ Automated Auto-Replies**: Professional immediate auto-acknowledgement emails dispatched to visitors.
- **📊 Google Sheets Integration**: Custom Web Apps API connection to log entries into Google Sheets for CRM management.
- **🛡️ Secure Communication**: Handles CORS and isolates sensitive credentials using local environment variables.

---

## 🏗️ Technical Stack

- **Server Core**: Node.js & Express.js
- **Network Requests**: Axios
- **Mail Dispatch**: Nodemailer
- **Secrets Management**: dotenv

---

## 🚀 Local Installation & Setup

### 1. Prerequisites
Ensure you have **Node.js** (v14 or higher) installed.

### 2. Install Dependencies
From this `backend` directory, run:
```bash
npm install
```

### 3. Environment Variables Config (`.env`)
Create a `.env` file in this directory and define the following variables:
```env
PORT=5000
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
GOOGLE_SCRIPT_URL=your_google_apps_script_web_app_url
```
> [!IMPORTANT]
> The `EMAIL_PASS` must be a Gmail **App Password**, not your regular account password. Ensure that Google Apps Script is deployed as a Web App configured to accept requests from "Anyone".

---

## 📂 Key Codebase Components

- [server.js](file:///d:/projects/portfilo/backend/server.js): Main server controller, cors policy, and the contact handler.
- [google-script.gs](file:///d:/projects/portfilo/backend/google-script.gs): Google Apps Script utility script to deploy to your target Google Sheet.

---

## 📡 API Specifications

### `POST /contact`

Receives, validates, logs, and forwards visitor submissions.

- **Request Headers**: `Content-Type: application/json`
- **Request Body JSON**:
  ```json
  {
    "name": "Alex Johnson",
    "email": "alex@example.com",
    "subject": "Inquiry: 3D Visualization",
    "message": "Hi Bhavana, I would love to collaborate on a 3D web application project."
  }
  ```
- **Response Success (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Message sent successfully"
  }
  ```
- **Response Failure (400 / 500)**:
  ```json
  {
    "success": false,
    "message": "All fields are required."
  }
  ```
