# 🌌 Vemireddy Bhavana - Modern Full-Stack 3D Portfolio

![Portfolio Banner](https://img.shields.io/badge/Bhavana-FullStack_Portfolio-00f5ff?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-v8.0.1-purple?style=for-the-badge&logo=vite)
![Node](https://img.shields.io/badge/Backend-Node_|_Express-green?style=for-the-badge&logo=node.js)

Welcome to my professional developer portfolio. This is a premium, high-performance web experience featuring interactive 3D aesthetics, glassmorphic UI components, smooth parallax motion, and a complete backend contact form workflow.

---

## ✨ Features

- **🚀 Interactive 3D Canvas**: Smooth starfield rendering and dynamic lighting using **Three.js** and **React Three Fiber**.
- **🎨 Premium Glassmorphic Design**: Curated dark and light themes with responsive CSS layouts, neon ambient lighting, and high-quality visuals.
- **✨ Micro-Animations**: Smooth hover tilts, text scrambling, scroll-based animations, and magnetic interactive buttons powered by **Framer Motion**.
- **📁 Projects Showcase**: Beautiful selected works with high-resolution thumbnail previews, modals, deployment links, and repository tracking.
- **✉️ Full-Stack Contact Flow**:
  - Auto-reply emails to visitors and instant notifications to the host via **Nodemailer**.
  - Direct data syncing to **Google Sheets** for real-time contact management.

---

## 🏗️ Architecture

```text
portfilo/
├── frontend/           # React + Vite (Visual & UI Layer)
│   ├── src/            # Components, Pages, Assets, Layouts
│   └── index.html      # SEO & Metadata setup
├── backend/            # Node.js + Express (API Layer)
│   ├── server.js       # Contact API & email dispatch logic
│   └── google-script.gs# Apps Script configuration for Google Sheets
```

---

## 🛠️ Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend UI** | React.js, Tailwind CSS / Vanilla CSS | Interactive modular UI components |
| **3D Rendering** | Three.js, React Three Fiber, Drei | Ambient lighting, camera controls, starfields |
| **Animations** | Framer Motion, GSAP | Physics-based spring tilts, transitions, parallax |
| **Backend API** | Node.js, Express.js | Secure backend router for handling contact requests |
| **Integrations** | Nodemailer, Google Apps Script | Auto-replies, mail alerts, and Google Sheets database sync |
| **Hosting** | Vercel (Frontend), Render / Glitch (Backend) | Edge hosting and serverless deployments |

---

## 🚀 Getting Started

### 1. Installation
Run the following in the root folder to install dependencies for both frontend and backend:

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 2. Environment Variables Configuration

Create a `.env` file in the **backend** directory:
```env
PORT=5000
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
GOOGLE_SCRIPT_URL=your_google_apps_script_deployment_url
```

Create a `.env` file in the **frontend** directory:
```env
VITE_API_URL=http://localhost:5000
```

### 3. Running Locally

Start the development servers for both layers:

```bash
# In the frontend directory
npm run dev

# In the backend directory
npm start
```

---

## 📡 Backend API Endpoints

- **POST `/contact`**: Receives customer messages, forwards email alerts, and logs submission to Google Sheets.
  - Body Params: `{ name, email, subject, message }`

---

## 🔒 Security & Best Practices
- Environment variables are excluded from GitHub commits.
- Handles rate-limiting and CORS controls safely on the API level.
- Clean separation of concerns between visual layout and network functions.
