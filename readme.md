# Ganesha: Digital Altar Management System

> "Learning under the divine guidance of Lord Ganesha, with deepest devotion and reverence."

[Live Preview](https://ganesha-monolith.vercel.app/)

Next.js is Full stack framework? Wow, Let's try it out!

![Lord Ganesha](https://res.cloudinary.com/s0vscy04/image/upload/w_800,q_auto,f_auto/007_ncz2qc.png)
![Ganesha Demo](https://github.com/weerayosong/weerayosong.github.io/blob/main/images/gif/proj11.gif?raw=true)

## 📌 Overview

Ganesha Digital Altar is a full-stack monolithic web application built to serve as a digital repository and management system for the 32 forms of Lord Ganesha.

Initially conceived as a training ground to explore the capabilities of Next.js as a complete full-stack framework, this project demonstrates the seamless integration of client-side React interfaces and server-side API routes within a single, unified codebase (Monorepo architecture).

## 🏗 System Design & Software Architecture

Comprehensive system design documentation, workflow diagrams, and architectural decisions can be found in our external documentation portal:

🔗 **[View System Design Documentation](https://reliable-chebakia-e37cd1.netlify.app/)**

## ✨ Key Features

- **Full-Stack Monolith:** Utilizes Next.js App Router to handle both frontend rendering and backend API endpoints securely within the same environment.
- **Complete CRUD Operations:** Robust data management system allowing administrators to Create, Read, Update, and Soft-Delete information regarding the deities.
- **Cloud Media Management:** Integrated with Cloudinary for secure, optimized image uploading and storage via RESTful APIs.
- **Strict Data Validation:** Implements `Zod` schema validation across both client forms and server routes to ensure data integrity and prevent malformed requests.
- **Modern UI/UX:** A responsive, culturally-themed dark mode interface crafted with Tailwind CSS, featuring Skeleton loading states and interactive Toast notifications.

## 🛠 Technology Stack

- **Core Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** MongoDB with Mongoose ODM
- **Cloud Storage:** Cloudinary
- **Validation:** Zod
- **UI Components:** React Icons, React Hot Toast

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed and configured:

- [Node.js](https://nodejs.org/) (v18.0.0 or later)
- A [MongoDB](https://www.mongodb.com/) database instance (Atlas or Local)
- A [Cloudinary](https://cloudinary.com/) account for image hosting

### Installation

1. Clone the repository:

```bash
git clone [https://github.com/your-username/ganesha-monolith.git](https://github.com/your-username/ganesha-monolith.git)
cd ganesha-monolith
```

2. Install dependencies:

```bash
npm install
```

3. Configure Environment Variables:
   Create a `.env.local` file in the root directory and add the following keys:

```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
