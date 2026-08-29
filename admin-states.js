import { checkAdminAccess } from './admin-auth.js';
import { db } from './firebase-init.js';
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.getElementById('update-state-btn').onclick = async () => {
    const state = document.getElementById('adm-state').value;
    const prod = document.getElementById('adm-prod').value;
    const status = document.getElementById('adm-status').value === 'true';

    if (status) {
        const confirmMsg = "Confirm that all applicable licensing, regulatory, and disclosure requirements have been verified before activating this product in this state.";
        if (!confirm(confirmMsg)) return;
    }

    try {
        const docId = `${state}_${prod}`;
        await setDoc(doc(db, "stateProducts", docId), {
            active: status,
            stateId: state,
            productId: prod,
            updatedAt: serverTimestamp(),
            updatedBy: "Admin"
        }, { merge: true });
        alert(`Product ${prod} in ${state} is now ${status ? 'ACTIVE' : 'INACTIVE'}`);
    } catch (err) { alert(err.message); }
};