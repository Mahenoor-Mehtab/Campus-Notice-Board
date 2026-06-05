<div align="center">
<br />

# 📋 Campus Notice Board

### 📋 A Full-Stack Notice Board App — Create, Manage & Prioritize Notices with Ease

**Add a notice. Mark it Urgent. Let everyone see it instantly.**

<br />

[![Next.js](https://img.shields.io/badge/Next.js-Pages_Router-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Neon](https://img.shields.io/badge/Neon-Postgres-00E5BF?style=for-the-badge)](https://neon.tech/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](./LICENSE)

<br />

[🚀 Live Demo](#) · [🐛 Report Bug](#) · [💡 Request Feature](#)

<br />
</div>

---

## 🤔 What is Campus Notice Board?

**Campus Notice Board** is a full-stack CRUD web application built with Next.js (Pages Router), Prisma, and Neon Postgres. It allows admins to create, manage, and display notices — sorted by priority, filtered by category, and persisted in a hosted database. Urgent notices always appear at the top with a red badge, and expired notices are visually distinguished so nothing gets missed.

> *"One board. All notices. Zero confusion."*

---

## ✨ Features

### 🔴 Core Features

| Feature | Description |
|---|---|
| **Create Notice** | Add a new notice with title, body, category, priority, date, and optional image |
| **Read Notices** | View all notices as responsive cards on home dashboard |
| **Update Notice** | Edit any existing notice — form pre-fills with current values |
| **Delete Notice** | Delete a notice with a confirmation modal before removal |
| **Urgent First** | Urgent notices always appear above Normal notices — sorted in database query |
| **Server Validation** | All required fields and date validated on the server inside API routes |

### 🟡 UI & UX Features

| Feature | Description |
|---|---|
| **Urgent Badge** | Bold red "URGENT" badge + red left border on urgent notice cards |
| **Expired Tag** | Greyed out card + "Expired" tag for notices whose date has passed |
| **Updated Tag** | Light blue "Updated" tag shows when a notice was recently edited |
| **Search Bar** | Real-time search to filter notices by title |
| **Category Filter** | Filter notices by All, Exam, Event, or General tabs |
| **Notice Count** | Shows total notices with Urgent and Normal breakdown |
| **Toast Notifications** | Success/error popups on create, update, and delete actions |
| **Loading Skeleton** | Animated skeleton cards while data is being fetched |
| **Empty State** | Friendly message when no notices match the filter or search |
| **Responsive Design** | 1 column mobile, 2 columns tablet, 3 columns desktop |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js** (Pages Router) | Full-stack framework — frontend pages + backend API routes |
| **Prisma** | ORM for database access and schema management |
| **Neon** | Free hosted Postgres database |
| **Tailwind CSS** | Styling — clean, responsive, utility-first |
| **React Hot Toast** | Toast notifications for user feedback |
| **date-fns** | Date formatting and expiry comparison |
| **Vercel** | Free deployment and hosting |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         Next.js Frontend (Pages)        │
│   Tailwind CSS · React Hot Toast        │
│   Home Page · Add Page · Edit Page      │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│       Next.js API Routes (Backend)      │
│   pages/api/notices/index.js            │
│   pages/api/notices/[id].js             │
│   GET · POST · PUT · DELETE             │
│   Server-side Validation                │
└──────────┬──────────────────────────────┘
           │
┌──────────▼──────────────────────────────┐
│         Prisma ORM                      │
│   Schema · Client · Migrations          │
└──────────┬──────────────────────────────┘
           │
┌──────────▼──────────────────────────────┐
│         Neon (Postgres Database)        │
│   Hosted · Free · Persistent            │
└─────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
campus-notice-board/
│
├── pages/
│   ├── index.js                  → Home page — notice list dashboard
│   ├── notices/
│   │   ├── new.js                → Add new notice form
│   │   └── [id]/
│   │       └── edit.js           → Edit existing notice form
│   └── api/
│       └── notices/
│           ├── index.js          → GET all, POST create
│           └── [id].js           → GET one, PUT update, DELETE remove
│
├── components/
│   ├── NoticeCard.js             → Single notice card UI
│   ├── NoticeForm.js             → Shared form (add + edit)
│   ├── DeleteModal.js            → Confirmation modal
│   ├── SkeletonCard.js           → Loading skeleton
│   └── Navbar.js                 → Top header with Add Notice button
│
├── prisma/
│   └── schema.prisma             → Database schema
│
├── lib/
│   └── prisma.js                 → Prisma client singleton
│
├── styles/
│   └── globals.css               → Global Tailwind styles
│
├── .env.local                    → Environment variables (not committed)
├── .env.example                  → Example env file for reference
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 🗄️ Database Schema

```prisma
model Notice {
  id            String   @id @default(cuid())
  title         String
  body          String
  category      String   // Exam | Event | General
  priority      String   // Urgent | Normal
  priorityOrder Int      // 0 = Urgent, 1 = Normal (for DB sorting)
  publishDate   DateTime
  imageUrl      String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

---

## 🔄 User Flow

```
1. Open App → See all notices (Urgent on top)
        ↓
2. Search or Filter by Category
        ↓
3. Click "Add Notice" → Fill form → Submit
        ↓
4. Server validates → Saves to Neon DB → Toast shown
        ↓
5. Click "Edit" on a card → Form pre-filled → Update
        ↓
6. Click "Delete" → Confirmation modal → Confirm → Removed
        ↓
7. Expired notices → Auto greyed out based on date ✅
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js 18+](https://nodejs.org/)
- [Neon Account](https://neon.tech/) — free hosted Postgres
- [Vercel Account](https://vercel.com/) — free deployment

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/campus-notice-board.git
cd campus-notice-board
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create `.env.local`:

```env
DATABASE_URL=your_neon_postgres_connection_string
```

### 4. Run Prisma Migration

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment (Vercel)

1. Push your code to a public GitHub repository
2. Go to [vercel.com](https://vercel.com/) and import your repo
3. Add `DATABASE_URL` in Vercel environment variables
4. Add this to `package.json` build script:

```json
"build": "prisma migrate deploy && prisma generate && next build"
```

5. Deploy — your app will be live at a public Vercel URL

---

## 📡 API Routes

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/notices` | Fetch all notices (Urgent first) |
| `POST` | `/api/notices` | Create a new notice |
| `GET` | `/api/notices/[id]` | Fetch single notice |
| `PUT` | `/api/notices/[id]` | Update a notice |
| `DELETE` | `/api/notices/[id]` | Delete a notice |

---

## ✅ Evaluation Checklist

- [x] Full CRUD — create, read, update, delete all work
- [x] Server-side validation on all API routes
- [x] Urgent notices sorted to top via Prisma `orderBy`
- [x] Correct HTTP methods and status codes
- [x] Pages Router used — not App Router
- [x] Prisma + Neon (hosted DB) — no local SQLite
- [x] Deployed on Vercel — publicly accessible without login
- [x] Public GitHub repo with real commit history
- [x] Free services only — no credit card required
- [x] Responsive on mobile and desktop

---

## 🤖 AI Usage

This project was built with assistance from Claude (Anthropic) for planning the UI structure, discussing component architecture, and generating boilerplate code. All logic, validation, database queries, and final implementation were reviewed, understood, and written by the developer. Every line of code can be explained and modified independently.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) — Full-stack React framework
- [Prisma](https://www.prisma.io/) — Type-safe ORM
- [Neon](https://neon.tech/) — Serverless Postgres database
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [React Hot Toast](https://react-hot-toast.com/) — Toast notifications
- [date-fns](https://date-fns.org/) — Date utility library
- [Vercel](https://vercel.com/) — Deployment platform

---

<div align="center">

**Built with ❤️**

*If this project helped you, drop a ⭐ on GitHub!*

</div>