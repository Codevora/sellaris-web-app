import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {
 getStorage,
 ref,
 uploadBytes,
 getDownloadURL,
 deleteObject,
} from "firebase/storage";
import {db} from "./init";

const storage = getStorage();

export type SettingsData = {
 userId: string;
 profile?: {
  name: string;
  photoURL?: string;
 };
 system?: {
  currency: string;
  timezone: string;
  businessHours: {
   start: string;
   end: string;
  };
 };
 appearance?: {
  theme: "light" | "dark" | "system";
  accentColor: string;
 };
 language?: string;
};

export const SettingsService = {
 async getSettings(userId: string): Promise<SettingsData | null> {
  try {
   const docRef = doc(db, "settings", userId);
   const docSnap = await getDoc(docRef);

   if (!docSnap.exists()) {
    // Buat dokumen default jika tidak ada
    const defaultSettings: SettingsData = {
     userId,
     profile: {name: ""},
     system: {
      currency: "USD",
      timezone: "UTC",
      businessHours: {start: "09:00", end: "17:00"},
     },
     appearance: {
      theme: "system", // Pastikan nilai sesuai dengan tipe yang didefinisikan
      accentColor: "blue",
     },
    };
    await setDoc(docRef, defaultSettings);
    return defaultSettings;
   }

   return docSnap.data() as SettingsData;
  } catch (error) {
   console.error("Error getting settings:", error);
   return null;
  }
 },

 async updateSettings(
  userId: string,
  data: Partial<SettingsData>
 ): Promise<boolean> {
  try {
   const docRef = doc(db, "settings", userId);
   await setDoc(docRef, data, {merge: true});
   return true;
  } catch (error) {
   console.error("Error updating settings:", error);
   throw new Error("Failed to update settings");
  }
 },

 async uploadFile(userId: string, file: File): Promise<string> {
  try {
   const storageRef = ref(storage, `profilePictures/${userId}/${file.name}`);
   const snapshot = await uploadBytes(storageRef, file);
   return await getDownloadURL(snapshot.ref);
  } catch (error) {
   console.error("Error uploading file:", error);
   throw new Error("Failed to upload file");
  }
 },

 async deleteFile(fileUrl: string): Promise<boolean> {
  try {
   const fileRef = ref(storage, fileUrl);
   await deleteObject(fileRef);
   return true;
  } catch (error) {
   console.error("Error deleting file:", error);
   throw new Error("Failed to delete file");
  }
 },
};
