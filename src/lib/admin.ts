// lib/admin.ts
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // or use cert
  });
}

const auth = admin.auth();
export { auth };
