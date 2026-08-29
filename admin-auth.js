import { auth, db } from './firebase-init.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function checkAdminAccess() {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(async (user) => {
            if (!user) {
                window.location.href = 'login.html';
                return;
            }
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const role = userDoc.data()?.role;
            
            if (role === 'admin' || role === 'super_admin') {
                resolve(true);
            } else {
                alert("Unauthorized Access");
                window.location.href = 'dashboard.html';
                reject(false);
            }
        });
    });
}