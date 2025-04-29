import {db} from "./init";
import {
 collection,
 addDoc,
 getDocs,
 doc,
 updateDoc,
 deleteDoc,
 query,
 orderBy,
} from "firebase/firestore";
import {Package} from "@/types/package";

const packageCollection = collection(db, "packages");

export const getPackages = async (): Promise<Package[]> => {
 try {
  const q = query(packageCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
   id: doc.id,
   ...doc.data(),
   createdAt: doc.data().createdAt?.toDate(),
   updatedAt: doc.data().updatedAt?.toDate(),
  })) as Package[];
 } catch (error) {
  console.error("Error fetching packages:", error);
  throw error;
 }
};

export const addPackage = async (
 packageData: Omit<Package, "id">
): Promise<string> => {
 try {
  const docRef = await addDoc(packageCollection, {
   ...packageData,
   createdAt: new Date(),
   updatedAt: new Date(),
  });
  return docRef.id;
 } catch (error) {
  console.error("Error adding package:", error);
  throw error;
 }
};

export const updatePackage = async (
 id: string,
 packageData: Partial<Package>
): Promise<void> => {
 try {
  const packageRef = doc(packageCollection, id);
  await updateDoc(packageRef, {
   ...packageData,
   updatedAt: new Date(),
  });
 } catch (error) {
  console.error("Error updating package:", error);
  throw error;
 }
};

export const deletePackage = async (id: string): Promise<void> => {
 try {
  const packageRef = doc(packageCollection, id);
  await deleteDoc(packageRef);
 } catch (error) {
  console.error("Error deleting package:", error);
  throw error;
 }
};
