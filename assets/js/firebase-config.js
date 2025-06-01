// Firebase configuration
const firebaseConfig = {
    // Your web app's Firebase configuration will go here
    // You'll need to replace these values with your own Firebase project config
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Function to save contact form data
async function saveContactForm(formData) {
    try {
        await db.collection('contacts').add({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error("Error saving contact form: ", error);
        return false;
    }
}

// Function to get portfolio items
async function getPortfolioItems() {
    try {
        const snapshot = await db.collection('portfolio').get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error getting portfolio items: ", error);
        return [];
    }
}

// Function to get services
async function getServices() {
    try {
        const snapshot = await db.collection('services').get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error getting services: ", error);
        return [];
    }
} 