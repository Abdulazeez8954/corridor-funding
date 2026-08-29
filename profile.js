import { getCurrentUserProfile, updateUserProfile } from './user.js';
import { checkAuth } from './auth-guard.js';

document.addEventListener('DOMContentLoaded', async () => {
    checkAuth();
    
    try {
        const profile = await getCurrentUserProfile();
        document.getElementById('p-firstName').value = profile.firstName || '';
        document.getElementById('p-lastName').value = profile.lastName || '';
        document.getElementById('p-phone').value = profile.phone || '';
        document.getElementById('p-address').value = profile.address || '';
        document.getElementById('p-city').value = profile.city || '';
        document.getElementById('p-state').value = profile.state || '';
        document.getElementById('p-zip').value = profile.zip || '';
    } catch (err) { console.error(err); }

    document.getElementById('profile-form').onsubmit = async (e) => {
        e.preventDefault();
        const data = {
            firstName: document.getElementById('p-firstName').value,
            lastName: document.getElementById('p-lastName').value,
            phone: document.getElementById('p-phone').value,
            address: document.getElementById('p-address').value,
            city: document.getElementById('p-city').value,
            zip: document.getElementById('p-zip').value
        };
        try {
            await updateUserProfile(data);
            alert("Profile updated successfully!");
        } catch (err) { alert(err.message); }
    };
});