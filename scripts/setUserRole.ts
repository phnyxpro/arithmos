// scripts/setUserRole.ts
import * as admin from "firebase-admin";
import * as dotenv from "dotenv";

// Optional: load .env if you use it
dotenv.config();

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(require("../serviceAccountKey.json")),
});

// Set the custom claim
async function assignRole(uid: string, role: "admin" | "manager" | "employee") {
  try {
    await admin.auth().setCustomUserClaims(uid, { role });
    console.log(`✅ Success: User ${uid} assigned role "${role}".`);
  } catch (error) {
    console.error("❌ Error assigning role:", error);
  }
}

// Replace this with your user’s UID and desired role
const targetUID = "PUT_USER_UID_HERE";
const roleToAssign = "admin"; // or "manager", "employee"

assignRole(targetUID, roleToAssign);
