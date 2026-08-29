import { auth, db } from './firebase-init.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendEmailVerification,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Handle Registration
export const registerUser = async (userData) => {
    const { email, password, firstName, lastName, phone, state } = userData;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create Firestore Profile
    await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        firstName,
        lastName,
        email,
        phone,
        state,
        role: 'customer',
        accountStatus: 'active',
        emailVerified: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    });

    await sendEmailVerification(user);
    return user;
};

// Handle Login
export const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

// Google Sign In
export const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
        const nameParts = user.displayName ? user.displayName.split(' ') : ['User', ''];
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            firstName: nameParts[0],
            lastName: nameParts[1] || '',
            email: user.email,
            role: 'customer',
            accountStatus: 'active',
            emailVerified: true,
            createdAt: serverTimestamp()
        });
    }
};

export const logoutUser = () => signOut(auth);