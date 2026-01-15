# 🚀 SmartMeet - Complete Setup & Running Guide

## ✅ Step 1: Configure Environment Variables

### 1.1 Open the `.env` file
- Located at: `c:\Users\HP\OneDrive\Documents\SmartMeet Project\SmartMeet-main\.env`
- I've already created this file with the proper template

### 1.2 Add Your Credentials

Replace these placeholder values with your actual credentials:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_character_app_password_here
```

#### How to Get Gemini API Key:
1. Visit: https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key (starts with `AIza...`)
5. Paste it in the `.env` file

#### How to Get Gmail App Password:
1. Enable 2-Step Verification: https://myaccount.google.com/security
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Select "Mail" → Generate
4. Copy the 16-character password (remove spaces)
5. Paste it in the `.env` file

### 1.3 Save the `.env` File
- Make sure to save the file after adding your credentials
- DO NOT share this file or commit it to Git

---

## ✅ Step 2: Install Dependencies (if needed)

If you encounter any module errors, run these commands:

### Frontend Dependencies:
```powershell
cd "c:\Users\HP\OneDrive\Documents\SmartMeet Project\SmartMeet-main"
npm install
```

### Backend Dependencies:
```powershell
cd "c:\Users\HP\OneDrive\Documents\SmartMeet Project\SmartMeet-main\backend"
npm install
```

---

## ✅ Step 3: Start the Application

You need to run **TWO terminals** (one for frontend, one for backend):

### Terminal 1 - Start Backend Server:
```powershell
cd "c:\Users\HP\OneDrive\Documents\SmartMeet Project\SmartMeet-main\backend"
npm start
```

**Expected output:**
```
Current working directory: ...
GEMINI_API_KEY loaded: YES (Length: XX)
Server is running on port 5000
```

⚠️ **If you see "GEMINI_API_KEY loaded: NO"** → Your `.env` file is not configured properly

### Terminal 2 - Start Frontend:
```powershell
cd "c:\Users\HP\OneDrive\Documents\SmartMeet Project\SmartMeet-main"
npm run dev
```

**Expected output:**
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

## ✅ Step 4: Access the Application

1. **Open your browser** and go to: http://localhost:5173/
2. **You should see** the SmartMeet landing page

---

## ✅ Step 5: Test the Application

### Test 1: AI Scheduler
1. Click on **"AI Scheduler"** from the navigation
2. Enter a meeting request like:
   ```
   Schedule a team meeting next Monday at 2 PM for 1 hour on Google Meet
   ```
3. Add participant emails (comma-separated)
4. Click **"Schedule Meeting"**
5. Check if meeting details are generated

### Test 2: Email Sending
- If emails are configured correctly, participants should receive email invites
- Check the **"Email Logs"** page to see sent emails

### Test 3: Dashboard
- Click on **"Dashboard"** to see statistics
- Should show total meetings, emails sent, etc.

---

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot connect to server"
**Solution:** Make sure the backend is running on port 5000
```powershell
cd "c:\Users\HP\OneDrive\Documents\SmartMeet Project\SmartMeet-main\backend"
npm start
```

### Issue 2: "GEMINI_API_KEY loaded: NO"
**Solution:** Check your `.env` file:
- Make sure it's in the root directory
- No spaces around the `=` sign
- No quotes around the API key
- Format: `GEMINI_API_KEY=AIzaXXXXXXXXXXXX`

### Issue 3: Email not sending
**Possible causes:**
- Wrong email credentials in `.env`
- App Password not generated correctly
- 2-Step Verification not enabled on Gmail

### Issue 4: Port already in use
**Solution:** Kill the process using that port:
```powershell
# For port 5000 (backend)
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# For port 5173 (frontend)
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F
```

---

## 📁 Project Structure Overview

```
SmartMeet-main/
├── .env                          # ← YOUR CREDENTIALS GO HERE
├── backend/
│   ├── .env                      # Backend-specific config (optional)
│   ├── src/
│   │   ├── app.js               # Backend entry point
│   │   ├── controllers/         # Request handlers
│   │   ├── routes/              # API routes
│   │   └── services/            # Business logic (AI, email)
│   └── package.json
├── src/
│   ├── App.jsx                  # Frontend entry point
│   ├── pages/                   # React pages
│   ├── components/              # React components
│   └── services/api.js          # API client
├── package.json                 # Frontend dependencies
└── vite.config.js              # Vite configuration
```

---

## 🎯 Quick Start Commands (Copy & Paste)

### Option 1: Run Backend First, Then Frontend

**Terminal 1:**
```powershell
cd "c:\Users\HP\OneDrive\Documents\SmartMeet Project\SmartMeet-main\backend"
npm start
```

**Terminal 2:**
```powershell
cd "c:\Users\HP\OneDrive\Documents\SmartMeet Project\SmartMeet-main"
npm run dev
```

### Option 2: Development Mode (with auto-restart)

**Terminal 1:**
```powershell
cd "c:\Users\HP\OneDrive\Documents\SmartMeet Project\SmartMeet-main\backend"
npm run dev
```

**Terminal 2:**
```powershell
cd "c:\Users\HP\OneDrive\Documents\SmartMeet Project\SmartMeet-main"
npm run dev
```

---

## ✅ Checklist Before Running

- [ ] `.env` file configured with real API keys
- [ ] Gemini API key added (starts with `AIza...`)
- [ ] Gmail email address added
- [ ] Gmail App Password added (16 characters, no spaces)
- [ ] Dependencies installed (`npm install` in both root and backend folders)
- [ ] Two terminals open and ready
- [ ] No other apps using ports 5000 or 5173

---

## 🎉 Success Indicators

✅ **Backend is working:** Console shows "Server is running on port 5000"
✅ **Frontend is working:** Browser opens http://localhost:5173/
✅ **API connection working:** Dashboard loads without errors
✅ **AI working:** Meeting details are generated from natural language
✅ **Email working:** Email logs show sent messages

---

## 📞 Need Help?

If you're still facing issues:
1. Check the browser console (F12) for frontend errors
2. Check the backend terminal for server errors
3. Verify your `.env` file has NO syntax errors
4. Make sure both servers are running simultaneously

---

**Last Updated:** January 12, 2026
