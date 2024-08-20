// firebaseConfig.js
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/dynamic-links'; // Note: The JavaScript SDK does not support dynamic links natively

const firebaseConfig = {
    apiKey: "AIzaSyAIbH9L3wNaa6sIWgaczTptJmhlbu9IKvQ",
    authDomain: "chatapp-ce0ed.firebaseapp.com",
    projectId: "chatapp-ce0ed",
    storageBucket: "chatapp-ce0ed.appspot.com",
    messagingSenderId: "960085805856",
    appId: "1:960085805856:web:ebd7302b7efa6b81a0a545",
    measurementId: "G-SPH5YBJV7Z"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
