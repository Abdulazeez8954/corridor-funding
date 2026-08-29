import { auth, db } from './firebase-init.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

auth.onAuthStateChanged(async (user) => {
    if (!user) return;
    const q = query(collection(db, "loans"), where("userId", "==", user.uid));
    const snap = await getDocs(q);
    const container = document.getElementById('loans-container');
    
    if (snap.empty) container.innerHTML = "<p>No active loans found.</p>";
    snap.forEach(doc => {
        const loan = doc.data();
        container.innerHTML += `
            <div class="card">
                <h3>${loan.productName}</h3>
                <p>Principal: $${loan.principal}</p>
                <p>APR: ${loan.apr}%</p>
                <p>Next Payment: ${loan.nextPaymentDate}</p>
            </div>`;
    });
});