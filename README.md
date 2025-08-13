# 🌍 Wonderland — Discover Places, Seamlessly

**Wonderland** is a responsive full-stack web application that lets users explore, search, and list resorts,destinations or properties. Built with **Tailwind CSS** for modern, scalable styling and designed with a focus on user experience, responsiveness, and clean architecture.

> 🔥 Designed to scale — from mobile to desktop.  
> 🎯 Built with job-ready, production-standard frontend practices.

---

## 🖼 Preview

uploading soon

---

## 🚀 Key Features

- 🔍 **Smart Search:** Clean, centered search bar with semantic accessibility.
- 📱 **Mobile-first Navbar:** Toggle-based navigation with conditional rendering (auth-aware).
- 🎨 **Tailwind-Powered UI:** BootStrap classes & custom utility-first design.
- 🧠 **Auth-aware UX:** Login, logout, and registration dynamically shown.
- 🧭 **Custom Logo UI:** Large compass icon integrated as a brandable visual identity.
- ✨ **Fully responsive:** Seamlessly adapts from small screens to wide desktops.

---

## ⚙️ Tech Stack

| Layer       | Technology                |
|-------------|---------------------------|
| **Frontend**| HTML5, Tailwind CSS, Font Awesome |
| **Templating** | EJS (server-side rendering) |
| **Backend** | Node.js, Express |
| **Auth**    | Express-session / Passport |
| **Icons**   | Font Awesome               |           
| **CSS**     | BootStrap & Tailwind Utility Classes Only |

---

## 📁 Folder Structure

```bash
.
├── public/
│   ├── css/
│   ├── js/
├── models/
│   ├── listing/
│   ├── review/
│   ├── user/
├── views/
│   ├── partials/
│   └── listings/
├── controllers/
│   ├── listings/
│   ├── reviews/
│   ├── users/
├── routes/
│   └── listing.js
│   └── review.js
│   └── user.js
├── app.js            # Entry point
└── README.md


## 🧱 Architecture Highlights

- 🔧 **Componentized Navbar**: Brand, search, and user links split into responsive, manageable units.
- 🌐 **SEO-Friendly**: Server-rendered HTML with semantic tags.
- 🧩 **Reusable styles**: Consistent use of Tailwind utility classes for padding, spacing, colors, and layout.
- 🧠 **User-centric Design**: Conditional navigation logic based on session state (`<% if (curUser) { %>`).

---

## 🛠 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/wonderland.git
cd wonderland
node app.js
