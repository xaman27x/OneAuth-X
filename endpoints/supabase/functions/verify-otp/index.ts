import "https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-auth.js';
import { getDatabase, ref, get, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js';

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
const database = getDatabase(app, firebaseConfig.databaseURL);

async function verifyOTP(email: string, password: string, service: string, otp: number): Promise<boolean> {
  try {
 
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;

    const serviceRef = ref(database, `Users/${uid}/${service}`);
    
    // Fetch the data from the specified path
    const snapshot = await get(serviceRef);

    if (snapshot.exists()) {
      const storedOTP = snapshot.val().otp;
      if (storedOTP === otp) {
        console.log("OTP verification successful!");
        return true;
      } else {
        console.log("OTP verification failed!");
        return false;
      }
    } else {
      console.error("Service data does not exist for the user.");
      return false;
    }
  } catch (e) {
    console.error("Error Verifying OTP:", e);
    return false;
  }
}

// Function to handle HTTP requests
Deno.serve(async (req) => {
  try {
    const { email, password, service, otp } = await req.json();

    const isVerified = await verifyOTP(email, password, service, otp);

    return new Response(
      JSON.stringify({ verified: isVerified, timestamp: serverTimestamp }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Invalid request", details: e.message }),
      { headers: { "Content-Type": "application/json" }, status: 400 }
    );
  }
});
