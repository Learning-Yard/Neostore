// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
  apiKey: "AIzaSyDFp-ysSQ7qOvVtXPZ--XSaYqvQvgMh9PU",
  authDomain: "neostore-1db2d.firebaseapp.com",
  projectId: "neostore-1db2d",
  storageBucket: "neostore-1db2d.appspot.com",
  messagingSenderId: "629987120665",
  appId: "1:629987120665:web:99b3542041635a5cd17c88",
  measurementId: "G-NVH8HMYSRB"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();


