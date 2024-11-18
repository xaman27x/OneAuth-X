import "https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts"
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js';
import { getFirestore, collection, doc, query, where, getDocs, getDoc } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-firestore.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-auth.js';
import { serverTimestamp } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: Deno.env.get("FIREBASE_API_KEY")!,
  authDomain: Deno.env.get("FIREBASE_AUTH_DOMAIN")!,
  databaseURL: Deno.env.get("FIREBASE_DATABASE_URL")!,
  projectId: Deno.env.get("FIREBASE_PROJECT_ID")!,
  storageBucket: Deno.env.get("FIREBASE_STORAGE_BUCKET")!,
  messagingSenderId: Deno.env.get("FIREBASE_MESSAGING_SENDER_ID")!,
  appId: Deno.env.get("FIREBASE_APP_ID")!
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const serviceRef = collection(db, "Services");


async function checkService(email: string, password: string, service: string): Promise<boolean> {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;
    const q = query(serviceRef, where("UserID", "==", uid));
    const querySnapshot = await getDocs(q);

    if(!querySnapshot.empty) {
      const docRef = doc(db, "Services", querySnapshot.docs[0].id);
      const docSnapshot = await getDoc(docRef);
      const isPresent = docSnapshot.data().Services.includes(service);
      return isPresent;
    }
  } catch(e) {
    console.error("Error Adding Service:", e);
    return false;
  }
  return false;
}

Deno.serve(async (req) => {

  try {
  const { email, password, service } = await req.json()
  const isPresent = await checkService(email, password, service);

  if (!email || !password || !service) {
    return new Response(JSON.stringify({ success: false }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  return new Response(JSON.stringify({ success: isPresent}), {
    status: isPresent ? 200 : 400,
    headers: { "Content-Type": "application/json" }
  });
} catch (error) {
  console.error('Error handling request:', error);
  return new Response(JSON.stringify({ success: false, timestamp: serverTimestamp }), {
    status: 500,
    headers: { "Content-Type": "application/json" }
  });
}});

