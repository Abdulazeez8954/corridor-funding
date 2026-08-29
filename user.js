import { auth, db } from './firebase-init.js';
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function getCurrentUserProfile() {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            unsubscribe();
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    resolve(docSnap.data());
                } else {
                    reject("No profile found");
                }
            } else {
                reject("Not authenticated");
            }
        });
    });
}

export async function updateUserProfile(data) {
    if (!auth.currentUser) return;
    const userRef = doc(db, "users", auth.currentUser.uid);
    return await updateDoc(userRef, {
        ...data,
        updatedAt: new Date()
    });
}