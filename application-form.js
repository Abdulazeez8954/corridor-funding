import { auth, db } from './firebase-init.js';
import { collection, addDoc, serverTimestamp, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getCurrentUserProfile } from './user.js';
import { generateAppNumber } from './utils.js';
import { checkStateAvailability } from './states.js';

let currentStep = 1;
const totalSteps = 3;

document.addEventListener('DOMContentLoaded', async () => {
    const profile = await getCurrentUserProfile();
    
    // Step Navigation
    document.querySelectorAll('.next-step').forEach(btn => {
        btn.onclick = async () => {
            if (currentStep === 2) await prepareStep3(profile);
            changeStep(1);
        };
    });

    document.querySelectorAll('.prev-step').forEach(btn => {
        btn.onclick = () => changeStep(-1);
    });

    // Form Submission
    document.getElementById('loan-app-form').onsubmit = async (e) => {
        e.preventDefault();
        const btn = document.getElementById('submit-app-btn');
        btn.disabled = true;
        btn.innerText = "Submitting...";

        const appData = {
            userId: auth.currentUser.uid,
            applicationNumber: generateAppNumber(),
            productId: document.getElementById('productId').value,
            requestedAmount: document.getElementById('requestedAmount').value,
            employmentStatus: document.getElementById('employmentStatus').value,
            annualIncome: document.getElementById('annualIncome').value,
            stateId: profile.state,
            status: 'submitted',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };

        try {
            await addDoc(collection(db, "applications"), appData);
            window.location.href = 'applications.html';
        } catch (err) {
            alert("Error: " + err.message);
            btn.disabled = false;
        }
    };
});

function changeStep(delta) {
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    currentStep += delta;
    document.getElementById(`step-${currentStep}`).classList.add('active');
    document.getElementById('progress').style.width = `${(currentStep / totalSteps) * 100}%`;
}

async function prepareStep3(profile) {
    const product = document.getElementById('productId').value;
    const amount = document.getElementById('requestedAmount').value;
    const statusDiv = document.getElementById('availability-status');
    const reviewDiv = document.getElementById('review-details');
    const submitBtn = document.getElementById('submit-app-btn');

    reviewDiv.innerHTML = `
        <p><strong>Product:</strong> ${product.toUpperCase()}</p>
        <p><strong>Requested Amount:</strong> $${Number(amount).toLocaleString()}</p>
        <p><strong>Applying From:</strong> ${profile.state}</p>
    `;

    const availability = await checkStateAvailability(profile.state, product);
    
    if (availability.active) {
        statusDiv.style.backgroundColor = "rgba(16, 185, 129, 0.1)";
        statusDiv.innerHTML = `<span style="color: var(--success);">✔ This product is available in ${profile.state}.</span>`;
        submitBtn.disabled = false;
    } else {
        statusDiv.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
        statusDiv.innerHTML = `<span style="color: var(--error);">✖ We are not currently offering ${product} in ${profile.state}.</span>`;
        submitBtn.disabled = true;
    }
}