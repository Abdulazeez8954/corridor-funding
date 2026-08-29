import { checkAdminAccess } from './admin-auth.js';
import { db } from './firebase-init.js';
import { collection, getDocs, query, where, limit } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', async () => {
    await checkAdminAccess();
    
    // Fetch Quick Stats
    const userSnap = await getDocs(collection(db, "users"));
    document.getElementById('total-users').innerText = userSnap.size;

    const appSnap = await getDocs(query(collection(db, "applications"), where("status", "==", "submitted")));
    document.getElementById('pending-apps').innerText = appSnap.size;
});