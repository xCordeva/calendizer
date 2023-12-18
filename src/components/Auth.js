"use client"
// components/AuthComponent.js
import { useEffect } from 'react';
import firebase from 'firebase/app'; // Import only the necessary module
import 'firebase/auth'; // Import additional modules as needed
import firebaseConfig from '../../firebaseConfig';
import * as firebaseui from 'firebaseui';
import Head from 'next/head';

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
if (typeof window !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
// Initialize FirebaseUI
const ui = new firebaseui.auth.AuthUI(firebase.auth());

const AuthComponent = () => {
  useEffect(() => {
    // Check if running on the client side
    const isClient = typeof window !== 'undefined';
    if (isClient) {
      // Initialize FirebaseUI with your UI configuration
      const uiConfig = {
        signInSuccessUrl: '/dashboard', // Redirect URL after sign-in
        signInOptions: [
          // Add the sign-in providers you want to support
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
        // Other configuration options...
      };

      // Start FirebaseUI
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  }, []);

  return (
    <div>
      {/* Include FirebaseUI scripts in the head */}
      <Head>
        <script src="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.js" defer></script>
        <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.css" />
      </Head>

      {/* FirebaseUI container */}
      <div id="firebaseui-auth-container"></div>

      {/* Rest of your component code */}
    </div>
  );
};

export default AuthComponen
