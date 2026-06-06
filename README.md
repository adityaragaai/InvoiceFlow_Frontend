<div align="center">

# ⚡ InvoiceFlow Frontend

### A Modern, Full-Featured Invoice Management Dashboard

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

<br/>

**[🚀 Live Demo](https://invoice-flow-frontend.vercel.app/invoices) · [📦 Backend Repo](https://github.com/adityaragaai/InvoiceFlow_Backend) · [🐛 Report Bug](https://github.com/adityaragaai/InvoiceFlow_Frontend/issues) · [✨ Request Feature](https://github.com/adityaragaai/InvoiceFlow_Frontend/issues)**

<br/>

> A production-grade invoice management dashboard built as a full-stack internship assignment.  
> Features real-time filtering, pagination, analytics, and full CRUD — backed by a live REST API.

</div>

---

## 📋 Table of Contents

- [📖 Overview](#-overview)
- [🌐 Live Demo](#-live-demo)
- [🖼️ Screenshots](#️-screenshots)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Folder Structure](#-folder-structure)
- [⚙️ Installation & Setup](#️-installation--setup)
- [🔑 Environment Variables](#-environment-variables)
- [📜 Available Scripts](#-available-scripts)
- [🔌 API Integration](#-api-integration)
- [🚀 Deployment](#-deployment)
- [🔮 Future Improvements](#-future-improvements)
- [👤 Author](#-author)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 📖 Overview

**InvoiceFlow** is a clean, responsive invoice management dashboard that gives businesses a centralized view of their billing operations. Built with React and Vite for blazing-fast performance, it connects to a separately deployed REST API backend to deliver real-time data across all views.

The application was designed with a recruiter-friendly and production-level standard in mind — clean component architecture, graceful error and loading states, fully responsive layouts, and optimized API calls throughout.

> 🏗️ **Project Type:** Full-Stack Internship Assignment  
> 🔗 **Backend:** Separately deployed — see [InvoiceFlow Backend](https://github.com/adityaragaai/InvoiceFlow_Backend)

---

## 🌐 Live Demo

| Environment | URL |
|---|---|
| 🟢 Production | [https://invoice-flow-frontend.vercel.app/invoices](https://invoice-flow-frontend.vercel.app/invoices) |
| 🔗 Backend API | [https://github.com/adityaragaai/InvoiceFlow_Backend](https://github.com/adityaragaai/InvoiceFlow_Backend) |

---

## 🖼️ Screenshots

<div align="center">

### 📊 Invoice Dashboard
![Invoice Dashboard](./screenshots/dashboard.png)

### 🔍 Filtering & Sorting
![Filters](./screenshots/filters.png)

### 📈 Analytics — Top 5 Customers
![Analytics](./screenshots/analytics.png)

### 👤 Customer Profile Page
![Customer Profile](./screenshots/customer-profile.png)

### 📝 Invoice Creation Form
![Invoice Form](./screenshots/invoice-form.png)

</div>

> 💡 Add your screenshots to a `/screenshots` folder in the root of the repo and update the paths above.

---

## ✨ Features

### 📋 Invoice Management
- 📄 **Paginated Invoice Dashboard** — Browse large invoice datasets with smooth, server-side pagination
- ✏️ **Create & Edit Invoices** — Full invoice form with validation and live feedback
- 🗑️ **Delete Invoices** — Safely remove invoices with confirmation handling

### 🔍 Filtering & Sorting
- 🏷️ **Filter by Status** — Narrow down invoices by `Draft`, `Sent`, `Paid`, `Overdue`, etc.
- 👤 **Filter by Customer** — Instantly isolate invoices for a specific client
- 📅 **Issue Date Range Filter** — Custom date-range picker for issue dates
- 📅 **Due Date Range Filter** — Custom date-range picker for due dates
- ↕️ **Sort by Amount** — Ascending / descending sort on invoice value
- ↕️ **Sort by Due Date** — Chronological ordering at a click

### 📊 Analytics
- 🏆 **Top 5 Customers Section** — Visual breakdown of highest-value customers
- 📉 **Summary Metrics** — At-a-glance totals and status distributions

### 🧑‍💼 Customer Pages
- 👤 **Customer Profile Page** — Dedicated view showing all invoices per customer with aggregated stats

### 💅 UX & Performance
- 📱 **Fully Responsive UI** — Optimized for desktop, tablet, and mobile
- ⚡ **Optimized API Calls** — Debounced search, conditional fetching, no redundant requests
- 🔄 **Loading States** — Skeleton loaders and spinners for every async action
- ❌ **Error Handling** — User-friendly error messages with retry prompts
- 🎨 **Dynamic Table Rendering** — Columns, badges, and rows driven by live data

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| ⚛️ Framework | [React.js 18](https://reactjs.org/) | Component-based UI |
| ⚡ Build Tool | [Vite](https://vitejs.dev/) | Fast dev server & bundler |
| 🌐 HTTP Client | [Axios](https://axios-http.com/) | API requests with interceptors |
| 🗺️ Routing | [React Router DOM v6](https://reactrouter.com/) | Client-side navigation |
| 🎨 Styling | [Tailwind CSS v3](https://tailwindcss.com/) | Utility-first responsive design |
| 💬 Language | [JavaScript (ES2022)](https://tc39.es/) | Core application logic |
| 🚀 Deployment | [Vercel](https://vercel.com/) | Hosting with SPA routing rewrites |

---

## 📁 Folder Structure

```
InvoiceFlow_Frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── api/
│   │   └── axios.js              # Axios instance & base URL config
│   ├── components/
│   │   ├── InvoiceForm.jsx       # Create / edit invoice modal form
│   │   ├── InvoiceTable.jsx      # Paginated, sortable invoice table
│   │   ├── StatusBadge.jsx       # Colored status pill component
│   │   └── ...                   # Shared UI components
│   ├── pages/
│   │   ├── Dashboard.jsx         # Main invoice dashboard with filters
│   │   ├── CustomerProfile.jsx   # Per-customer invoice view
│   │   └── Summary.jsx           # Analytics & top customers
│   ├── App.jsx                   # Root component & route definitions
│   ├── main.jsx                  # React DOM entry point
│   └── index.css                 # Tailwind directives & global styles
├── .env.example                  # Environment variable template
├── index.html                    # Vite HTML entry
├── tailwind.config.js            # Tailwind configuration
├── vite.config.js                # Vite configuration (SPA rewrites)
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

Make sure you have the following installed:

- **Node.js** `>= 18.x` — [Download](https://nodejs.org/)
- **npm** `>= 9.x` or **yarn**
- A running instance of the [InvoiceFlow Backend](https://github.com/adityaragaai/InvoiceFlow_Backend)

### 1. Clone the Repository

```bash
git clone https://github.com/adityaragaai/InvoiceFlow_Frontend.git
cd InvoiceFlow_Frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Open `.env` and set your backend API URL (see [Environment Variables](#-environment-variables)).

### 4. Start the Development Server

```bash
npm run dev
```

The app will be available at **[http://localhost:5173](http://localhost:5173)**.

---

## 🔑 Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```env
# .env

# Base URL of the InvoiceFlow Backend API
VITE_API_BASE_URL=http://localhost:8000/api
```

| Variable | Description | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Full base URL of the backend REST API | `http://localhost:8000/api` |

> ⚠️ All Vite environment variables **must** be prefixed with `VITE_` to be exposed to the browser bundle.  
> 🔒 Never commit your `.env` file — it is listed in `.gitignore`.

---

## 📜 Available Scripts

Run these from the project root:

| Script | Command | Description |
|---|---|---|
| 🔥 Dev Server | `npm run dev` | Starts Vite dev server with HMR |
| 🏗️ Production Build | `npm run build` | Bundles app for production into `/dist` |
| 👀 Preview Build | `npm run preview` | Locally previews the production build |
| 🔍 Lint | `npm run lint` | Runs ESLint across all source files |

---

## 🔌 API Integration

All HTTP communication is handled through a centralized **Axios instance** (`src/api/axios.js`) configured with:

- `baseURL` sourced from `VITE_API_BASE_URL` environment variable
- Consistent `Content-Type: application/json` headers
- A safe fallback to `/api` for Vercel-proxied deployments

### Key API Endpoints Consumed

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/invoices` | Fetch paginated, filtered, sorted invoices |
| `POST` | `/invoices` | Create a new invoice |
| `PUT` | `/invoices/:id` | Update an existing invoice |
| `DELETE` | `/invoices/:id` | Delete an invoice |
| `GET` | `/customers` | Fetch all customers |
| `GET` | `/customers/:id/invoices` | Fetch invoices for a specific customer |
| `GET` | `/summary` | Fetch analytics & top customer data |

> 📡 The backend is **deployed separately** and independently scalable. See [InvoiceFlow Backend](https://github.com/adityaragaai/InvoiceFlow_Backend) for API documentation and setup.

---

## 🚀 Deployment

This project is deployed on **[Vercel](https://vercel.com/)** with automatic deployments on every push to `main`.

### Deploy Your Own

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project root
vercel --prod
```

### SPA Routing on Vercel

React Router requires all routes to serve `index.html`. This is handled via a `vercel.json` rewrite rule:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Environment Variables on Vercel

Set `VITE_API_BASE_URL` in your Vercel project dashboard under **Settings → Environment Variables** to point to your deployed backend URL.

---

## 🔮 Future Improvements

- [ ] 🌙 **Dark Mode Toggle** — Persist theme preference via `localStorage`
- [ ] 📤 **PDF Export** — Generate and download invoice PDFs client-side
- [ ] 📧 **Email Invoice** — Send invoices directly to customers via integrated email API
- [ ] 🔐 **Authentication** — JWT-based login with protected routes
- [ ] 📊 **Advanced Charts** — Revenue trends and monthly breakdowns using Recharts
- [ ] 🔔 **Overdue Alerts** — Notification system for past-due invoices
- [ ] 🌍 **Internationalization** — Multi-language and multi-currency support
- [ ] ♾️ **Infinite Scroll** — Alternative to pagination for mobile experience
- [ ] 🧪 **Unit & Integration Tests** — Vitest + React Testing Library coverage

---

## 👤 Author

<div align="center">

**Aditya Gupta**

[![GitHub](https://img.shields.io/badge/GitHub-adityaragaai-181717?style=for-the-badge&logo=github)](https://github.com/adityaragaai)
[![Email](https://img.shields.io/badge/Email-aditya.gupta%40raga.ai-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:aditya.gupta@raga.ai)

*Built with ☕ and a lot of `console.log` debugging.*

</div>

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** your feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes
   ```bash
   git commit -m "feat: add amazing feature"
   ```
4. **Push** to your branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages and ensure your code passes linting before submitting.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">

Made with ❤️ by [Aditya Gupta](https://github.com/adityaragaai)

⭐ **Star this repo if you found it useful!** ⭐

</div>
