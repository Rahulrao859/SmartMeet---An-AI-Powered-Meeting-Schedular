const geminiService = require('../services/geminiService');
const emailService = require('../services/emailService');

// In-memory storage
let meetings = [];
let emailLogs = [];

class MeetingController {
    async scheduleMeeting(req, res) {
        try {
            const { query, emails } = req.body;

            // 1. Parse meeting details using Gemini
            const meetingDetails = await geminiService.parseMeetingDetails(query);

            // Generate a simple ID
            meetingDetails.id = Date.now().toString();
            meetingDetails.status = 'confirmed';

            // 2. Process emails
            const emailList = emails.split(',').map(e => e.trim()).filter(e => e);
            const emailResults = [];
            let successfulEmails = 0;

            for (const email of emailList) {
                const result = await emailService.sendMeetingEmail(email, meetingDetails);
                emailResults.push(result);
                if (result.success) successfulEmails++;

                // Log email
                emailLogs.push({
                    id: Date.now() + Math.random().toString(),
                    email,
                    status: result.status,
                    timestamp: new Date(),
                    meetingId: meetingDetails.id
                });
            }

            // 3. Save meeting
            meetingDetails.participants = emailList;
            meetings.push(meetingDetails);

            // 4. Return response
            res.json({
                meeting: meetingDetails,
                successful_emails: successfulEmails,
                total_emails: emailList.length,
                email_results: emailResults
            });

        } catch (error) {
            console.error('Error scheduling meeting:', error);
            res.status(500).json({ error: 'Failed to schedule meeting' });
        }
    }

    getMeetings(req, res) {
        res.json({ meetings });
    }

    getEmailLogs(req, res) {
        res.json({ logs: emailLogs });
    }

    getStats(req, res) {
        const totalEmailsSent = emailLogs.filter(l => l.status === 'Sent').length;
        const totalEmails = emailLogs.length;
        const successRate = totalEmails > 0 ? Math.round((totalEmailsSent / totalEmails) * 100) : 0;
        const activeParticipants = new Set(emailLogs.map(l => l.email)).size;

        res.json({
            stats: {
                meetings_scheduled: meetings.length,
                emails_sent: totalEmailsSent,
                success_rate: successRate,
                active_participants: activeParticipants
            }
        });
    }

    healthCheck(req, res) {
        res.json({ status: 'healthy', timestamp: new Date() });
    }
}

module.exports = new MeetingController();
