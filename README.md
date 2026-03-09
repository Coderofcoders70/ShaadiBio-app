💍 ShaadiBio - Professional Matrimonial Biodata Generator

ShaadiBio is a premium, "Value First" SaaS application designed to help families create professional, beautiful, and effortless matrimonial biodatas. Built with the MERN Stack, it features a modern Glassmorphism UI, a unified modal system, and a robust PDF generation engine.

🚀 Live Demo

Live link:- 

🛠️ Tech Stack

Frontend: React (Vite), TypeScript, Tailwind CSS, Lucide React, Zustand (State Management).

Backend: Node.js, Express.js, MongoDB (Atlas), Mongoose.

Integrations:

1. Cloudinary: For high-performance profile photo hosting.

2. Google Sheets API: Acts as a lightweight CRM for contact form inquiries.

3. jsPDF/html2pdf: Client-side high-resolution PDF generation with encryption.

✨ Key Features

Value First Guest Flow: Guests can use the full editor immediately; registration is only required to download or save progress, maximizing user engagement.

Real-time Preview: A live-updating A4 template preview with dynamic template switching (Modern vs. Traditional).

Image Processing Engine: Built-in cropper ensuring all profile photos are perfectly sized at $500 \times 500$px for uniform layouts.

Premium Ecosystem: Mock payment flow that unlocks watermark removal and PDF password protection ($jsPDF$ encryption).

🔐 Admin Access

Reviewers can access the Admin Panel to see live system statistics, manage users, and monitor biodata versions.

Admin Login: admin@example.com 

Password: admin123

🏗️ Architectural Decisions & Challenges

1. Secure Authentication Flow

While a Password Reset flow was planned, it was intentionally omitted in this version to avoid utilizing insecure mock SMTP protocols in a live environment. In a production-scale deployment, this would be implemented via AWS SES or SendGrid with signed JWT tokens for secure verification.

2. Mock Payment IntegrationTo keep the project lightweight and accessible for portfolio review, I implemented a Mock Payment Gateway. This allows me to demonstrate the logic behind the "Premium" state—such as triggering watermark removal and PDF encryption—without the financial overhead of a real merchant account.

3. Monorepo DeploymentThe project is organized as a monorepo. I configured custom build pipelines for both Vercel (Frontend) and Render (Backend) to ensure seamless communication while maintaining independent scalability.
