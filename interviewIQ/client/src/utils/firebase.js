
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
 authDomain: "ai-interview-agent-ce814.firebaseapp.com",
  projectId: "ai-interview-agent-ce814",
  storageBucket: "ai-interview-agent-ce814.firebasestorage.app",
  messagingSenderId: "743430148202",
  appId: "1:743430148202:web:b2759617c347d8e5377a13",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}