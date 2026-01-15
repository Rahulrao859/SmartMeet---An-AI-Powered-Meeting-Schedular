import axios from 'axios';

// Configure base URL for API
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds
});

// API methods
export const api = {
    // Health check
    healthCheck: async () => {
        const response = await apiClient.get('/health');
        return response.data;
    },

    // Schedule a meeting
    scheduleMeeting: async (query, emails) => {
        const response = await apiClient.post('/schedule', {
            query,
            emails,
        });
        return response.data;
    },

    // Get all meetings
    getMeetings: async () => {
        const response = await apiClient.get('/meetings');
        return response.data;
    },

    // Get email logs
    getEmailLogs: async () => {
        const response = await apiClient.get('/email-logs');
        return response.data;
    },

    // Get dashboard statistics
    getStats: async () => {
        const response = await apiClient.get('/stats');
        return response.data;
    },
};

// Error handler helper
export const handleApiError = (error) => {
    if (error.response) {
        // Server responded with error status
        return error.response.data.error || 'Server error occurred';
    } else if (error.request) {
        // Request made but no response
        return 'Cannot connect to server. Please ensure the backend is running on http://localhost:5000';
    } else {
        // Something else happened
        return error.message || 'An unexpected error occurred';
    }
};

export default api;
