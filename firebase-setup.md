# Corridor Funding - Firebase Setup Guide

1. **Create Project**: Go to [Firebase Console](https://console.firebase.google.com/).
2. **Auth**: Enable Email/Password and Google Sign-in.
3. **Firestore**: Create database in 'Production Mode'.
4. **Rules**: Copy content of `firestore.rules` into the Rules tab.
5. **Indexes**: Copy content of `firestore.indexes.json` into the Indexes tab.
6. **Initialization**: The first user registered will need their `role` field manually changed to `admin` in the Firestore console to access the admin panel.
7. **States**: Use the Admin Panel (admin-states.html) to activate specific product/state combinations.