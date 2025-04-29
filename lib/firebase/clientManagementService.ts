import {db} from "./init";
import {
 collection,
 doc,
 getDoc,
 getDocs,
 updateDoc,
 deleteDoc,
 query,
 where,
 orderBy,
 limit,
} from "firebase/firestore";
import {Client} from "@/types/client";

const usersCollection = collection(db, "users");

export const ClientManagementService = {
 async getClients(): Promise<Client[]> {
  const q = query(usersCollection, where("role", "==", "member"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
   id: doc.id, // dijamin selalu ada
   name: doc.data().name || "",
   email: doc.data().email || "",
   phone: doc.data().phone || "",
   status: doc.data().status === "inactive" ? "inactive" : "active",
   createdAt: doc.data().createdAt || new Date().toISOString(),
  }));
 },

 async getClientById(id: string): Promise<Client | null> {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists() || docSnap.data().role !== "member") return null;

  const data = docSnap.data();
  return {
   id: docSnap.id,
   name: data.name || "",
   email: data.email || "",
   phone: data.phone || "",
   status: data.status === "inactive" ? "inactive" : "active",
   createdAt: data.createdAt || new Date().toISOString(),
  };
 },

 async updateClient(id: string, clientData: Partial<Client>): Promise<void> {
  const docRef = doc(db, "users", id);
  await updateDoc(docRef, clientData);
 },

 async deleteClient(id: string): Promise<void> {
  const docRef = doc(db, "users", id);
  await deleteDoc(docRef);
 },

 async searchClients(term: string): Promise<Client[]> {
  const q = query(
   usersCollection,
   where("role", "==", "member"),
   where("name", ">=", term),
   where("name", "<=", term + "\uf8ff"),
   orderBy("name"),
   limit(10)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
   const data = doc.data();
   return {
    id: doc.id,
    name: data.name || "",
    email: data.email || "",
    phone: data.phone || "",
    status: data.status || "active",
    createdAt: data.createdAt || new Date().toISOString(),
   } as Client;
  });
 },

 async getClientCount(): Promise<{
  total: number;
  active: number;
  inactive: number;
 }> {
  const q = query(usersCollection, where("role", "==", "member"));
  const snapshot = await getDocs(q);

  let active = 0;
  let inactive = 0;

  snapshot.forEach((doc) => {
   const data = doc.data();
   if (data.status === "inactive") {
    inactive++;
   } else {
    active++;
   }
  });

  return {
   total: snapshot.size,
   active,
   inactive,
  };
 },
};

