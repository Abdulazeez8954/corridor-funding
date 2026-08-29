import { auth, db } from './firebase-init.js';
import { collection, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

auth.onAuthStateChanged(async (user) => {
    if (!user) return;
    const q = query(collection(db, "transactions"), where("userId", "==", user.uid), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    const list = document.getElementById('trans-list');
    
    snap.forEach(doc => {
        const t = doc.data();
        list.innerHTML += `<tr><td>${t.createdAt.toDate().toLocaleDateString()}</td><td>${t.description}</td><td>$${t.amount}</td><td>${t.status}</td></tr>`;
    });
});