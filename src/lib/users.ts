// lib/users.ts
import { db } from "./firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export async function createUserProfile(uid: string, name: string, email: string, role: "admin" | "manager" | "employee") {
  await setDoc(doc(db, "users", uid), {
    uid,
    name,
    email,
    role,
    createdAt: serverTimestamp(),
  });
}
