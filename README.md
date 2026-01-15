# SmartMeet: An AI-powered Meeting Scheduler with Email Automation
A smart web app that extracts meeting details from natural language, auto-schedules meetings, and sends personalized email invites.

---

## Tech Stack
- **Python 3.10+**
- **Flask** – Lightweight backend web framework
- **FastAPI** *(future extension suggested)*
- **Azure OpenAI (GPT-4o)** – Natural Language Processing
- **python-dotenv** – Manage secrets via `.env`
- **Tailwind CSS** – Clean and responsive UI styling
- **SMTP (Gmail)** – Sending email notifications

---

## Features
-  Extracts meeting **title, date, time, duration, platform**, and **participants** from plain English
-  Sends email invitations to a list of participants
-  Supports HTML-formatted emails with clickable meeting links
-  Clean Tailwind UI and dynamic status feedback
-  Extensible and modular code (ideal for integrating FastAPI or scheduling tools)

---

## Project Structure
- intelligent-meeting-scheduler/
- │
- ├── app.py # Flask app and route logic
- ├── scheduler.py # Azure OpenAI meeting parser
- ├── email_utils.py # Email composition and SMTP sending
- ├── templates/
- │ └── index.html # Main UI template (Jinja2)
- ├── static/ # (Optional) For Tailwind custom CSS
- ├── .env # Environment variables (API keys, secrets)
- └── README.md # This file


---

## How It Works

1. User enters:
   - Meeting request in natural language
   - List of participant emails
2. GPT-4o processes the request via Azure OpenAI API
3. Extracted details are displayed in the UI
4. Emails are sent to participants via Gmail SMTP
5. Email status is reported on-screen

---

## Setup Instructions

### 1. Clone the Repo
- git clone https://github.com/Shiwam-m/PROJECT_CLG   
- cd intelligent-meeting-scheduler

---

### 2. Create & Activate Virtual Environment
- python -m venv venv   
- source venv/bin/activate  # On Windows: venv\Scripts\activate   

---

### 3. Install Dependencies
- pip install -r requirements.txt
- requirements.txt should include:
    - Flask
    - openai
    - python-dotenv

---

### 4. Set Up .env File
- Create a .env file in the root directory:
    - AZURE_OPENAI_API_KEY=your_azure_api_key
    - AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com/
    - OPENAI_API_VERSION=2023-12-01-preview
    - AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o-mini

---

### 5. Configure Gmail for SMTP
- Replace sender_email and sender_password in email_utils.py.
- Use App Passwords instead of your real password:
- Go to https://myaccount.google.com/security
- Enable 2FA
- Generate an App Password (e.g., for "Mail")

---

### Run the App
- python app.py

---

### Sample Prompt
- Schedule a review meeting with the design team next Tuesday at 10 AM on Zoom. Duration: 45 minutes.

---

### Sample Email Output
- Subject: Meeting Scheduled: Review Meeting
- Hello,
- Your meeting "Review Meeting" has been scheduled.
- Date: 2025-10-21
- Time: 10:00
- Duration: 45 minutes
- Platform: Zoom
- Join Meeting Link
- Regards,
- Intelligent Meeting Scheduler

---

### Security Tips
- Never commit your .env file or API credentials
- Use environment variables securely via python-dotenv
- Rotate App Passwords periodically

---

### Future Enhancements
- Transition backend from Flask to FastAPI
- Google Calendar / Outlook Calendar integration
- Multi-language support (i18n)
- Notification & reminder system
- Meeting clash detection & smart scheduling

---

### License
- MIT License. Contributions welcome.