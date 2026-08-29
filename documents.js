import { auth, db } from './firebase-init.js';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.getElementById('upload-btn').onclick = async () => {
    const fileInput = document.getElementById('doc-file');
    const type = document.getElementById('doc-type').value;
    const file = fileInput.files[0];

    if (!file) return alert("Select a file");
    if (file.size > 1024 * 1024) return alert("File too large (Max 1MB)");

    const reader = new FileReader();
    reader.onload = async (e) => {
        const base64String = e.target.result;
        try {
            await addDoc(collection(db, "documents"), {
                userId: auth.currentUser.uid,
                type: type,
                fileName: file.name,
                content: base64String, // Optimized Base64
                status: 'pending_review',
                createdAt: serverTimestamp()
            });
            alert("Document uploaded successfully");
            location.reload();
        } catch (err) { console.error(err); }
    };
    reader.readAsDataURL(file);
};

// Fetch list logic omitted for brevity, mirrors applications.js logic