import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB0vBXNid_VNgQ67HVgXom-wCwlibBaicc",
  authDomain: "one-authx.firebaseapp.com",
  databaseURL: "https://one-authx-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "one-authx",
  storageBucket: "one-authx.firebasestorage.app",
  messagingSenderId: "118161223870",
  appId: "1:118161223870:web:6ed8ebfc43b262f7136eef"
};

const app = initializeApp(firebaseConfig);

export default app;