import firebase from 'firebase'
const firebaseConfig = {
   apiKey: "AIzaSyBnJyl4cVojv1PNh7ULC5l2_VWAcjItRDU",
   authDomain: "whatsappclone-683d0.firebaseapp.com",
   databaseURL: "https://whatsappclone-683d0.firebaseio.com",
   projectId: "whatsappclone-683d0",
   storageBucket: "whatsappclone-683d0.appspot.com",
   messagingSenderId: "788306183496",
   appId: "1:788306183496:web:557396b512926102e11f7d",
   measurementId: "G-F6L0LEYB7P"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
