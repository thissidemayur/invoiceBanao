# 📄 InvoiceBanao

A full-stack **Next.js** application that allows users to **create, manage, and send invoices** directly to their clients' emails, along with transaction reports and dashboards.

Live Demo: **[invoiceBanao.vercel.app](https://invoiceBanao.vercel.app)**

---

## ✨ Features

- 🔐 **Cookie-based authentication** with NextAuth
- 🌐 **Google OAuth** and **Magic Link Login**
- 📩 Send invoices and reminders via **Mailtrap SMTP & SDK**
- 🖨 Generate & send **PDF invoices from scratch (editable & copyable)**
- 📝 Create, edit, delete invoices
- ✅ Mark invoices as paid and send reminders
- 📊 Interactive **dashboard with graphs** (Recharts)
- 🔒 Protected routes & onboarding flow to collect user info
- ⚙️ Environment variable-based config
- 📬 PDF sent for both invoice creation and updates
- 🎨 Clean UI with Radix UI & Tailwind CSS

---

## 🧠 Tech Stack

**Frontend:**

- Next.js 15
- React 19
- Tailwind CSS 4
- Radix UI Components
- Recharts (Graphing)

**Backend:**

- Next.js API Routes
- NextAuth (cookie-based auth)
- Prisma ORM with PostgreSQL
- Mailtrap SMTP & SDK
- PDFKit, jsPDF, jsPDF-Autotable (for generating PDFs)

**Other Tools:**

- Zod (validation)
- Nodemailer
- Date-fns
- Class Variance Authority, CLSX

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/thissidemayur/invoiceBanao.git
cd invoiceBanao

```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

```bash
AUTH_SECRET=

NEXTAUTH_URL=http://localhost:3000

# SMTP server (Mailtrap)
EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_SERVER_HOST=sandbox.smtp.mailtrap.io
EMAIL_SERVER_PORT=2525
EMAIL_FROM=Mailtrap ma@example.com

MAILTRAP_TOKEN=

DATABASE_URL=

NEXT_SERVER=http://localhost:3000

```

### 4️⃣ Run the App Locally

```bash
npm run dev
```

## 📦 API Endpoints

- All API routes are inside /app/api:

```bash
api/auth – Handles authentication (Google OAuth & Magic Link)

api/invoices – Generates PDFs & manages invoice CRUD

api/email – Sends reminder emails
```

## 🖼️ Screenshots

- ### Dashboard
- ### Create Invoice

## 🔗 Live Demo

```bash
👉 invoiceBanao.vercel.app
```

## 🙋 Author

👤 Mayur (thissidemayur)

## 🛠️ Contributing

Contributions, issues, and feature requests are welcome!

- Fork the project

- Create a feature branch: git checkout -b feature/YourFeature

- Commit your changes: git commit -m 'Add some feature'

- Push to the branch: git push origin feature/YourFeature

- Open a pull request
