import { auth, db } from './firebase-init.js';
import { collection, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { checkAuth } from './auth-guard.js';

document.addEventListener('DOMContentLoaded', async () => {
    checkAuth();
    
    auth.onAuthStateChanged(async (user) => {
        if (!user) return;
        
        const listContainer = document.getElementById('applications-list');
        const noAppsMsg = document.getElementById('no-apps-message');
        
        try {
            const q = query(
                collection(db, "applications"), 
                where("userId", "==", user.uid),
                orderBy("createdAt", "desc")
            );
            
            const querySnapshot = await getDocs(q);
            
            if (querySnapshot.empty) {
                noAppsMsg.style.display = 'block';
                return;
            }

            querySnapshot.forEach((doc) => {
                const app = doc.data();
                const row = `
                    <tr style="border-bottom: 1px solid var(--medium-gray);">
                        <td style="padding: 15px;">${app.applicationNumber}</td>
                        <td style="padding: 15px;">${app.productId.toUpperCase()}</td>
                        <td style="padding: 15px;">$${Number(app.requestedAmount).toLocaleString()}</td>
                        <td style="padding: 15px;"><span class="badge status-${app.status}">${app.status.replace('_', ' ')}</span></td>
                        <td style="padding: 15px;">${app.createdAt?.toDate().toLocaleDateString() || 'Draft'}</td>
                        <td style="padding: 15px;"><a href="application-details.html?id=${doc.id}" style="color: var(--primary-navy); font-weight: 600;">View</a></td>
                    </tr>
                `;
                listContainer.innerHTML += row;
            });
        } catch (err) {
            console.error("Error fetching applications:", err);
        }
    });
});