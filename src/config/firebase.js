import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";



/*const firebaseConfig = {
  apiKey: "AIzaSyDXYDyDFyCGZm1ukPFjGcgltftOBDeqqPM",
  authDomain: "coworkpay.firebaseapp.com",
  projectId: "coworkpay",
  storageBucket: "coworkpay.appspot.com",
  messagingSenderId: "1087411400971",
  appId: "1:1087411400971:web:b34d3ebc1da344c6e1b20e",
  measurementId: "G-2TF1H866QZ"
};*/

const firebaseConfig = {
  apiKey: "AIzaSyDMQZxIP6pyns6dalp6VHNrRD57NthnuU4",
  authDomain: "cmc-network-f3f2a.firebaseapp.com",
  projectId: "cmc-network-f3f2a",
  storageBucket: "cmc-network-f3f2a.appspot.com",
  messagingSenderId: "304153652474",
  appId: "1:304153652474:web:006b4ddfac6c7f4945ed43",
  measurementId: "G-0J9662VDDS"
};

// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = firebase.firestore();

export const storage = firebase.storage();

export const auth = firebase.auth();

export const static_img = 'https://firebasestorage.googleapis.com/v0/b/bridgetech-advance-project.appspot.com/o/profile_images%2Fprofile.jpg?alt=media&token=b3c94ada-1b08-4834-bbd1-647882c7195a';






