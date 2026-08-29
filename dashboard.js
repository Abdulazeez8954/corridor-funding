import { auth, db } from './firebase-init.js';
import { getCurrentUserProfile } from './user.js';
import { logoutUser } from './auth.js';
import { checkAuth } from './auth-guard.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Secure page
    checkAuth();

    // Set Date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').innerText = new Date().toLocaleDateString(undefined, options);

    // Logout logic
    document.getElementById('logout-btn').addEventListener('click', async (e) => {
        e.preventDefault();
        await logoutUser();
        window.location.href = 'login.html';
    });

    try {
        const profile = await getCurrentUserProfile();
        document.getElementById('welcome-text').innerText = `Welcome back, ${profile.firstName}!`;
        document.getElementById('user-name-display').innerText = `${profile.firstName} ${profile.lastName}`;
        
        // Dynamic balance and application fetching would happen here
        // (Will be connected in Group 5/6 as we build the application system)
    } catch (err) {
        console.error("Error loading dashboard data:", err);
    }
});