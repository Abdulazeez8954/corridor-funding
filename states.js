import { db } from './firebase-init.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function checkStateAvailability(stateCode, productId) {
    // Default fallback: inactive
    const defaultStatus = { active: false };
    
    try {
        // Document ID pattern: CA_personal, TX_mortgage, etc.
        const stateProductRef = doc(db, "stateProducts", `${stateCode}_${productId}`);
        const snap = await getDoc(stateProductRef);
        
        if (snap.exists()) {
            return snap.data(); // Returns { active: true/false, ... }
        }
    } catch (err) {
        console.error("Availability check failed:", err);
    }
    
    return defaultStatus;
}