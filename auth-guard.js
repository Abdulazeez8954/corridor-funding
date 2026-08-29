import { auth } from './firebase-init.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

export function checkAuth(requireAdmin = false) {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = 'login.html';
        } else if (!user.emailVerified && window.location.pathname !== '/verify-email.html') {
            window.location.href = 'verify-email.html';
        }
        // Admin checks will be added in the Admin group
    });
}