import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js';
import { getFirestore, collection, updateDoc, doc, query, where, getDocs, arrayUnion } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-firestore.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-auth.js';
import { serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js';

// Firebase configuration
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

// Function to register service
async function registerService(email: string, password: string, service: string): Promise<boolean> {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;
    const q = query(serviceRef, where("UserID", "==", uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = doc(db, "Services", querySnapshot.docs[0].id);
      // Use arrayUnion to add the new service to the Services array
      await updateDoc(docRef, {
        Services: arrayUnion(service)
      });
      console.log("Service added successfully!");
      return true;  // Success
    } else {
      console.log("No document found for this user.");
      return false; // Failure - User's document not found
    }
  } catch (e) {
    console.error("Error adding service:", e);
    return false; // Failure - Error occurred
  }
}

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === 'POST') {
    try {
      const { email, password, service } = await req.json();

      if (!email || !password || !service) {
        return new Response(JSON.stringify({ success: false }), { status: 400, headers: { "Content-Type": "application/json" } });
      }

      const result = await registerService(email, password, service);

      return new Response(JSON.stringify({ success: result, timestamp: serverTimestamp}), {
        status: result ? 200 : 400,
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      console.error('Error handling request:', error);
      return new Response(JSON.stringify({ success: false }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  } else {
    return new Response(JSON.stringify({ success: false }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }
});
