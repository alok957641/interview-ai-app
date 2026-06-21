# 🎯 NextHire.AI - AI-Powered Interview Platform

<div align="center">

![NextHire.AI Logo](https://img.shields.io/badge/NextHire.AI-AI%20Interview%20Platform-7c3aed?style=for-the-badge&logo=ai&logoColor=white)
![Version](https://img.shields.io/badge/version-1.0.0-7c3aed?style=flat-square)
![React](https://img.shields.io/badge/React-18.x-61dafb?style=flat-square&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-3.x-38bdf8?style=flat-square&logo=tailwindcss)
![Redux](https://img.shields.io/badge/Redux-4.x-764abc?style=flat-square&logo=redux)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

</div>

---

## 📖 About

**NextHire.AI** is an AI-powered mock interview platform that helps job seekers practice and improve their interview skills. The platform provides real-time feedback on answers, grammar, fluency, and confidence — just like a real interview!

### ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI-Powered Interviews** | Realistic mock interviews with intelligent follow-up questions |
| 🎙️ **Voice & Text Input** | Speak or type your answers naturally |
| 📊 **Real-Time Scoring** | Instant feedback on technical depth, communication & confidence |
| 📄 **Resume Analysis** | Project-specific questions based on your uploaded resume |
| 📈 **Performance Analytics** | Track progress with detailed graphs and insights |
| 📥 **PDF Reports** | Downloadable detailed performance reports |
| 🏆 **Multiple Modes** | HR, Technical, and Confidence Detection modes |
| 🔒 **Secure Authentication** | Google OAuth integration |

---

## 🚀 Tech Stack

### Frontend
- ⚛️ **React 18** - UI Framework
- 🎨 **Tailwind CSS** - Styling
- 🎭 **Framer Motion** - Animations
- 🔄 **Redux Toolkit** - State Management
- 📊 **Recharts** - Data Visualization
- 📱 **React Icons** - Icons
- 🎯 **React Router** - Navigation

### Backend
- 🟢 **Node.js** - Runtime
- 🚀 **Express.js** - Framework
- 🗄️ **MongoDB** - Database
- 🔐 **JWT** - Authentication
- ☁️ **Firebase** - Google Auth

### Deployment
- 🌐 **Vercel** / **Netlify** - Frontend
- ☁️ **Railway** / **Render** - Backend

---

## 📸 Screenshots

<div align="center">

### 🏠 Home Page
![Home Page]<img width="1856" height="862" alt="Screenshot 2026-06-21 215543" src="https://github.com/user-attachments/assets/39e79476-edae-49c4-bcb3-f21887f4be6b" />

### 🎙️ Interview Session
![Interview]<img width="1868" height="859" alt="Screenshot 2026-06-21 215952" src="https://github.com/user-attachments/assets/cfaf698b-5f01-4bc2-9059-825376213cd4" />



### 📊 Performance Report
![Report]!<img width="1608" height="848" alt="Screenshot 2026-06-21 215907" src="https://github.com/user-attachments/assets/43c407ad-14b2-4fde-a9a5-99405b08a1ef" />


</div>

---

## 📂 Project Structure

```
nexthire-ai/
├── src/
│   ├── assets/              # Images & Icons
│   ├── components/          # Reusable Components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── AuthModel.jsx
│   │   └── Timer.jsx
│   ├── pages/               # Pages
│   │   ├── Home.jsx
│   │   ├── Auth.jsx
│   │   ├── Step1SetUp.jsx
│   │   ├── Step2Interview.jsx
│   │   ├── Step3Report.jsx
│   │   └── InterviewHistory.jsx
│   ├── redux/               # Redux Store
│   │   ├── store.js
│   │   └── userSlice.js
│   ├── utils/               # Utilities
│   │   └── firebase.js
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud)
- Firebase account (for Google Auth)

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/nexthire-ai.git
cd nexthire-ai
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Environment Variables

Create a `.env` file in the root directory:

```env
# Backend
VITE_SERVER_URL=http://localhost:5000

# Firebase
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### Step 4: Run Development Server

```bash
npm run dev
# or
yarn dev
```

### Step 5: Build for Production

```bash
npm run build
# or
yarn build
```

---

## 🎯 Features in Detail

### 1. 🎤 Smart Interview
- AI generates role-specific questions
- Adaptive difficulty based on your answers
- Real-time follow-up questions
- Timer-based simulation

### 2. 📊 Performance Analytics
- Technical depth scoring
- Communication clarity analysis
- Confidence detection
- Historical progress tracking
- Visual performance graphs

### 3. 📄 Resume Integration
- Upload PDF resumes
- Auto-extract projects & skills
- Project-specific questions
- Tailored interview experience

### 4. 📥 Reports & History
- Detailed PDF reports
- Question-wise breakdown
- Strengths & weaknesses analysis
- Improvement roadmap

---

## 🔧 Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit: `git commit -m "Add your feature"`
5. Push: `git push origin feature/your-feature`
6. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

**Your Name**

- 🌐 [Website](https://your-website.com)
- 🐦 [Twitter](https://twitter.com/your-handle)
- 📧 [Email](mailto:your-email@example.com)
- 💼 [LinkedIn](https://linkedin.com/in/your-profile)

---

## 🙏 Acknowledgments

- OpenAI - AI Technology
- Firebase - Authentication
- Tailwind CSS - Styling
- Framer Motion - Animations

---

## ⭐ Show Your Support

If you like this project, please give it a ⭐ on GitHub!

---

<div align="center">
Built with ❤️ by Alok Kumar
</div>
