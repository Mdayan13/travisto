<div align="center">
  <br />
  <a>
    <img src="public/readme/new.png" alt="Project Banner">
  </a>
  <br />
  <div>
    <img alt="Static Badge" src="https://img.shields.io/badge/React-4c84f3?style=for-the-badge&logo=react&logoColor=white">
    <img alt="Static Badge" src="https://img.shields.io/badge/Appwrite-f05695?style=for-the-badge&logo=appwrite&logoColor=white">
    <img alt="Static Badge" src="https://img.shields.io/badge/Syncfusion-181758?style=for-the-badge&logoColor=white">
    <img src="https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Snippets](#snippets)
6. 🔗 [Assets](#links)
7. 🚀 [More](#more)

## <a name="introduction">🤖 Introduction</a>

Travisto is a travel agency platform with a public website for booking trips and an admin dashboard for managing operations. It uses AI to generate personalized trip itineraries based on user preferences like country, travel style, and budget.

## <a name="tech-stack">⚙️ Tech Stack</a>

- **React 19**: Component-based UI with React Router v7 for navigation.
- **Appwrite**: Backend for authentication, database, and storage.
- **Syncfusion**: UI components for interactive dashboards and charts.
- **Tailwind CSS**: Utility-first styling for responsive design.
- **Vite**: Fast build tool for development and production.
- **Gemini AI**: Powers AI-driven itinerary generation.
- **Others**: Stripe for payments, Unsplash for images, Sentry for error tracking.

## <a name="features">🔋 Features</a>

- **AI Itinerary Generator**: Crafts personalized travel plans.
- **Trip Booking**: Seamless reservations on the public site.
- **Admin Dashboard**: Manage trips, users, and analytics (admin-only).
- **Analytics**: Interactive charts for user and trip metrics.
- **Responsive UI**: Modern, mobile-friendly design with secure authentication.
- **Scalable Code**: Modular architecture with reusable components.

## <a name="quick-start">🤸 Quick Start</a>

Set up the project locally with these steps.

**Prerequisites**

Install:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

**Install dependncies**
```bash
npm install
```

**Cloning the Repository**

```bash
git clone https://github.com/Mdayan13/travisto.git
cd travisto
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
VITE_SYNC_LICENSE_KEY=
VITE_APPWRITE_PROJECT_ID=
SENTRY_AUTH_TOKEN=
VITE_APPWRITE_API_ENDPOINT=
VITE_APPWRITE_API_KEY=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_USERS_COLLECTION_ID=
VITE_APPWRITE_TRIPS_COLLECTION_ID=
VITE_GEMINI_API_KEY=
VITE_UNSPLASH_ACCESS_KEY=
VITE_BASE_URL="http://localhost:5173"
```

### Replace the placeholder values with your actual credentials.

- **[Syncfusion](https://jsm.dev/tourvisto-syncfusion)**

- **[Appwrite](https://jsm.dev/tourvisto-appwrite)**

- **[Gemini AI](https://aistudio.google.com/)**

- **[Sentry](https://jsm.dev/tourvisto-sentry)**

- **[Stripe](https://stripe.com/)**

- **[Unsplash](https://unsplash.com/)**

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173/) in your browser to view the project.
