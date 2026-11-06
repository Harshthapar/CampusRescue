# 🌱 CampusRescue — Smart Campus Food Waste Reduction Platform

CampusRescue is a campus-based surplus food discovery and reservation platform designed to reduce food waste while making meals more affordable for students.

The platform connects campus cafeterias, canteens, bakeries, and food outlets with students who can discover surplus meals, reserve portions, and collect food during designated pickup windows.

## 🚀 Features

- **Surplus Food Discovery:** Explore available surplus food from campus food outlets.
- **Food Categories:** Browse meals, snacks, bakery items, beverages, fruits, and more.
- **Smart Search & Filters:** Search food listings and filter by category, dietary preference, price, and availability.
- **Food Reservations:** Reserve available food portions and view reservation details.
- **Reservation Management:** View, cancel, and track food reservations.
- **Favorites:** Save favorite food items for quick access.
- **Food Partner Listings:** Discover participating campus food outlets.
- **Impact Dashboard:** Track meals rescued, food saved, and money saved.
- **Interactive Notifications:** Receive reservation confirmations and status updates.
- **Responsive UI:** Designed for desktop, tablet, and mobile devices.
- **Local Storage Persistence:** Preserve selected application data across browser refreshes.

## 🎯 Problem Statement

Food waste is a major issue in educational institutions, where cafeterias and food outlets often have surplus food at the end of the day.

At the same time, students seek affordable food options.

CampusRescue addresses this challenge by providing a digital platform that helps students discover and reserve surplus food, encouraging sustainable consumption and reducing food waste.

## 💡 Solution

CampusRescue creates a simple food-rescue ecosystem within a campus.

1. Food outlets list surplus food portions.
2. Students discover available food items.
3. Students reserve portions through the platform.
4. Students collect their reservations during the specified pickup window.
5. The platform showcases the impact of rescued food.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Development server and build tool |
| JavaScript | Application logic |
| Tailwind CSS | Styling and responsive UI |
| Lucide React | Icons |
| Recharts | Data visualization |
| localStorage | Client-side data persistence |

## 📂 Project Structure

```text
CampusRescue/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── data/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Harshthapar/CampusRescue.git
```

### 2. Navigate to the project directory

```bash
cd CampusRescue
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Visit the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## 🌍 Deployment

CampusRescue can be deployed using Vercel.

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Select Vite as the framework preset.
4. Use `npm run build` as the build command.
5. Use `dist` as the output directory.
6. Deploy the application.

## 📊 Impact

CampusRescue aims to:

- Reduce campus food waste.
- Make surplus meals accessible to students.
- Encourage sustainable food consumption.
- Help campus food outlets manage surplus inventory.
- Promote environmental awareness within student communities.

## 🔮 Future Enhancements

- Backend integration for shared reservations across users.
- Firebase or Supabase database integration.
- Student and food partner authentication.
- Real-time food availability updates.
- Online payment integration.
- QR-code-based food pickup verification.
- AI-powered surplus food demand prediction.
- Real-time notifications.
- Admin dashboard for food partner management.

## ⚠️ Current Limitations

This project currently uses mock data
