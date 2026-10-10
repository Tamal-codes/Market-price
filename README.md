# 🛒 বাজার দর (BazarDor) — Daily Market Price Tracker

**BazarDor** is a Bangla-language web application that helps people check the daily prices of everyday essentials such as rice, lentils, oil, vegetables, fish, meat, eggs and spices.

Users can browse prices by category, follow the live price ticker, see which items became more expensive today, and sign in securely to view full product details and manage their profile.

## 🚀 Live Demo

🌐 **Live Website:** _add your deployed link here_

## 🛠️ Technologies Used

| Category | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + DaisyUI |
| Authentication | Better Auth (Email/Password, Google, GitHub) |
| Database | MongoDB Atlas |
| Notifications | React Hot Toast |
| Fonts | Noto Serif Bengali, Hind Siliguri |

## ✨ Features

### 📈 Live Price Ticker
A scrolling marquee shows current prices with ▲ / ▼ percentage changes, so users can spot price movements instantly.

### 🗂️ Category Browsing
Quickly move between categories: rice, lentils, oil, vegetables, fish, meat, eggs-dairy and spices.

### 🔺 Daily Price Movements
Product cards highlight what got more expensive today, with the price and the percentage change.

### 🔐 Secure Authentication
Users can sign up and sign in with email and password, or continue with Google or GitHub.

### 🛡️ Protected Pages
Product details and the profile page are available only to signed-in users. Visitors are redirected to the sign-in page and sent back after logging in.

### 👤 Profile Management
A profile page shows the user's photo, name and email, and lets them update their name. Users can also sign out from the header menu.

### 🔔 Instant Feedback
Toast notifications confirm sign in, sign out, profile updates and show clear error messages.

### 📱 Responsive Bangla Interface
A clean, mobile-friendly layout designed for Bangla readers.

## 💻 Run Locally

Follow these steps to run the project on your local machine.

### 1. Clone the repository
```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project folder
```bash
cd market-price
```

### 3. Install dependencies
```bash
npm install
```


### 4. Create a `.env` file
```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### 5. Start the development server
```bash
npm run dev
```

### 6. Open in your browser
```
http://localhost:3000
```

## 📦 Main Dependencies

- Next.js
- React and React DOM
- TypeScript
- Tailwind CSS
- DaisyUI
- Better Auth
- MongoDB
- React Hot Toast


## 🔗 Relevant Links

🌐 **Live Demo:** _add your deployed link here_
💻 **GitHub Repository:** https://github.com/Tamal-codes

## 👨‍💻 Author

**Towfiqul Islam**

Web Developer | Frontend Developer

🔗 [LinkedIn](https://www.linkedin.com/in/towfiqul-islam-46a312431/)