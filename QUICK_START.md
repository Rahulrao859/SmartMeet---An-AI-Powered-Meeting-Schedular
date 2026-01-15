# 🚀 SmartMeet - Quick Reference Card

## 📝 What You Need

### 1️⃣ Gemini API Key
- **Get it from:** https://aistudio.google.com/app/apikey
- **Format:** Starts with `AIza...`
- **Used for:** AI-powered meeting scheduling

### 2️⃣ Gmail App Password
- **Get it from:** https://myaccount.google.com/apppasswords (requires 2FA)
- **Format:** 16 characters (remove spaces)
- **Used for:** Sending email invitations

---

## ⚙️ Configuration

Edit `.env` file in project root:

```env
GEMINI_API_KEY=AIzaXXXXXXXXXXXXXXXXXXXXXXXXXXXX
EMAIL_USER=yourname@gmail.com
EMAIL_PASS=abcdabcdabcdabcd
PORT=5000
```

⚠️ **Important:** No spaces, no quotes, no extra characters!

---

## 🎯 How to Run

### **Option 1: Easy Way (Double-click)**
1. Double-click `start.bat` file
2. Wait for both servers to start
3. Open browser: http://localhost:5173

### **Option 2: Manual Way (Two Terminals)**

**Terminal 1 - Backend:**
```powershell
cd "c:\Users\HP\OneDrive\Documents\SmartMeet Project\SmartMeet-main\backend"
npm start
```

**Terminal 2 - Frontend:**
```powershell
cd "c:\Users\HP\OneDrive\Documents\SmartMeet Project\SmartMeet-main"
npm run dev
```

---

## ✅ How to Test

1. **Open:** http://localhost:5173
2. **Go to:** AI Scheduler page
3. **Type:** "Schedule a team meeting tomorrow at 3 PM for 30 minutes on Zoom"
4. **Add emails:** test1@example.com, test2@example.com
5. **Click:** Schedule Meeting
6. **Check:** Meeting details should appear

---

## 🐛 Quick Fixes

| Problem | Solution |
|---------|----------|
| Backend not starting | Check `.env` file has correct API key |
| Frontend blank page | Make sure backend is running first |
| API errors | Verify both servers are running |
| Email not sending | Check Gmail App Password is correct |
| Port already in use | Close other terminals or restart computer |

---

## 📊 Success Checklist

- [ ] Backend shows: "Server is running on port 5000"
- [ ] Backend shows: "GEMINI_API_KEY loaded: YES"
- [ ] Frontend opens: http://localhost:5173
- [ ] Landing page loads without errors
- [ ] AI Scheduler generates meeting details
- [ ] Dashboard shows statistics

---

## 🔗 Important URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/api/health
- **Get Gemini Key:** https://aistudio.google.com/app/apikey
- **Gmail App Pass:** https://myaccount.google.com/apppasswords

---

## 📞 Still Not Working?

1. Make sure `.env` file is in the **root folder** (not in backend folder)
2. Check for typos in API keys
3. Ensure 2FA is enabled on Gmail
4. Try restarting both servers
5. Check browser console (F12) for errors
6. Check backend terminal for error messages

---

**Pro Tip:** Keep both terminal windows visible so you can see if any errors occur!
