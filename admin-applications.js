import { checkAdminAccess } from './admin-auth.js';
import { db } from './firebase-init.js';
import { collection, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', async () => {
    await checkAdminAccess();
    const q = query(collection(db, "applications"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    const tbody = document.getElementById('admin-app-list');

    snap.forEach(doc => {
        const app = doc.data();
        tbody.innerHTML += `
            <tr>
                <td>${app.applicationNumber}</td>
                <td>${app.productId}</td>
                <td>$${app.requestedAmount}</td>
                <td><span class="badge-status status-pending">${app.status}</span></td>
                <td>${app.createdAt?.toDate().toLocaleDateString()}</td>
                <td><a href="admin-application-details.html?id=${doc.id}">Review</a></td>
            </tr>
        `;
    });
});