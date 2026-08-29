import { checkAdminAccess } from './admin-auth.js';
import { db } from './firebase-init.js';
import { collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', async () => {
    await checkAdminAccess();
    const snap = await getDocs(collection(db, "users"));
    const tbody = document.getElementById('user-list');

    snap.forEach(userDoc => {
        const u = userDoc.data();
        tbody.innerHTML += `
            <tr>
                <td>${u.firstName} ${u.lastName}</td>
                <td>${u.email}</td>
                <td>${u.state}</td>
                <td>${u.role}</td>
                <td><span class="badge-status status-active">${u.accountStatus}</span></td>
                <td><button class="btn btn-outline" style="padding: 5px 10px; font-size: 0.8rem;">Edit</button></td>
            </tr>
        `;
    });
});