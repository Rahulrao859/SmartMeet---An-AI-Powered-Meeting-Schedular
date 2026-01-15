# 🎯 SmartMeet - AI-Powered Meeting Scheduler

<div align="center">

![SmartMeet](https://img.shields.io/badge/SmartMeet-v1.0.0-blue)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?logo=google)

**Transform natural language into scheduled meetings with AI-powered automation**

*"Schedule a team standup tomorrow at 10 AM on Zoom"* → ✨ Instant meeting + email invites

[Quick Start](#-quick-start) • [Features](#-features) • [Installation](#-installation)

</div>

---

## 🚀 What is SmartMeet?

SmartMeet uses **Google Gemini AI** to understand your natural language meeting requests and automatically:
- 📅 Parse meeting details (date, time, duration, platform)
- 📧 Send professional email invitations to all participants
- 📊 Track meetings and email analytics in a beautiful dashboard
- 🎨 Provide a modern, responsive interface

**Tech Stack:** React + Node.js + Express + Gemini AI + Nodemailer + Tailwind CSS

---

## ✨ Features

### Core Capabilities
- 🧠 **AI Scheduling** - Natural language processing for meeting requests
- 📨 **Auto Email** - Gmail SMTP integration with customizable templates
- 📅 **Calendar** - Visual timeline of all meetings
- 📊 **Dashboard** - Real-time analytics and statistics
- 📝 **Email Logs** - Complete history with delivery tracking
- ⚙️ **Settings** - User preferences and integrations

### Platform Support
- Google Meet • Zoom • Microsoft Teams • Custom Links

### Additional Features
- Smart search and filtering • Responsive design • Activity feed • Secure authentication • Multi-participant support

---

## 📦 Installation

### Prerequisites
- Node.js v16+ ([Download](https://nodejs.org/))
- Gmail account with 2-Step Verification enabled
- Gemini API key ([Get it free](https://aistudio.google.com/app/apikey))

### Setup

```bash
# Clone the repository
git clone https://github.com/Rahulrao859/SmartMeet---An-AI-Powered-Meeting-Schedular.git
cd SmartMeet---An-AI-Powered-Meeting-Schedular

# Install dependencies
npm install
cd backend && npm install && cd ..

# Configure environment variables
# Create .env file in root directory with:
GEMINI_API_KEY=your_gemini_api_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_character_app_password
PORT=5000
```

> 📖 **Need detailed setup help?** Check [SETUP_GUIDE.md](SETUP_GUIDE.md)

---

## 🚀 Quick Start

### Option 1: Automated (Windows)
```bash
start.bat
```

### Option 2: Manual

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

**Access:** localhost:5173

✅ **Success indicators:**
- Backend: `✓ GEMINI_API_KEY loaded: YES`
- Frontend: Landing page loads without errors

---

## 💡 Usage

1. Navigate to **AI Scheduler**
2. Enter your request in natural language:
   ```
   Schedule a project review next Monday at 2 PM for 1 hour on Google Meet
   ```
3. Add participant emails: `john@example.com, sarah@example.com`
4. Click **Schedule Meeting**
5. Done! Meeting created and invitations sent ✨

### Example Prompts
```
"Team standup tomorrow at 10 AM for 15 minutes on Zoom"
"Client presentation Friday at 3 PM for 2 hours on Teams"
"Quick sync today at 4 PM for 30 minutes"
```

---

## 📂 Project Structure

```
SmartMeet-main/
├── backend/
│   ├── src/
│   │   ├── app.js              # Express server
│   │   ├── controllers/        # Request handlers
│   │   ├── routes/             # API endpoints
│   │   └── services/           # AI & Email services
│   └── package.json
├── src/
│   ├── pages/                  # React pages
│   │   ├── AIScheduler.jsx     # Main scheduling UI
│   │   ├── Dashboard.jsx       # Analytics
│   │   ├── Calendar.jsx        # Calendar view
│   │   └── EmailLogs.jsx       # Email tracking
│   ├── components/             # Reusable components
│   └── services/api.js         # API client
├── .env                        # Configuration
└── start.bat                   # Quick start script
```

---

## 🛠️ API Endpoints

```http
POST /api/meetings/schedule    # Schedule new meeting
GET  /api/emails/logs          # Get email history
GET  /api/meetings             # Get all meetings
GET  /api/health               # Health check
```

**Base URL:** `localhost:5000/api`

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Cannot connect to server | Ensure backend is running: `cd backend && npm start` |
| GEMINI_API_KEY loaded: NO | Check `.env` file exists in root directory |
| Emails not sending | Verify Gmail App Password (16 chars, no spaces) |
| Port already in use | Kill process: `netstat -ano \| findstr :5000` |
| Blank page | Clear cache and ensure backend is running |

> 📖 **More help?** See [SETUP_GUIDE.md](SETUP_GUIDE.md) and [QUICK_START.md](QUICK_START.md)

---

## 🗺️ Roadmap

**Current Features ✅**
- AI-powered scheduling • Email automation • Calendar & Dashboard • Analytics • Authentication

**Coming Soon 🚀**
- Google Calendar API integration • Zoom API • Recurring meetings • Team collaboration • Mobile app • Voice input • Multi-language support

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push and open a Pull Request

---

## 📞 Support

- 📧 **Email:** rahulrao1849@gmail.com
- 🐛 **Issues:** [GitHub Issues](https://github.com/Rahulrao859/SmartMeet---An-AI-Powered-Meeting-Schedular/issues)
- 📖 **Docs:** [SETUP_GUIDE.md](SETUP_GUIDE.md) • [QUICK_START.md](QUICK_START.md)

---

## 📄 License

MIT License - Copyright © 2026 SmartMeet

---

## 🌟 Acknowledgments

Built with ❤️ using [Google Gemini AI](https://ai.google.dev/) • [React](https://react.dev/) • [Tailwind CSS](https://tailwindcss.com/) • [Node.js](https://nodejs.org/)

---

<div align="center">

⭐ **Star this repo if you find it helpful!**

[⬆ Back to Top](#-smartmeet---ai-powered-meeting-scheduler)

</div>
