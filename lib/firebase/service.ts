import {
 addDoc,
 collection,
 deleteDoc,
 doc,
 getDoc,
 getDocs,
 getFirestore,
 query,
 updateDoc,
 where,
} from "firebase/firestore";
import {app} from "./init";
import bcrypt from "bcrypt";
import {sendVerificationEmail} from "./email";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
 const snapshot = await getDocs(collection(firestore, collectionName));
 return snapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
 }));
}

export async function retrieveDataById(collectionName: string, id: string) {
 const snapshot = await getDoc(doc(firestore, collectionName, id));
 return snapshot.data();
}

export async function register(data: {
 fullname: string;
 email: string;
 phone: string;
 password: string;
 role?: string;
 created_at?: Date;
 updated_at?: Date;
 verified?: boolean;
 otp?: string;
 otp_expiry?: Date;
}) {
 const q = query(
  collection(firestore, "users"),
  where("email", "==", data.email)
 );
 const snapshot = await getDocs(q);

 if (!snapshot.empty) {
  return {
   status: false,
   statusCode: 400,
   message: "Email already exists",
  };
 }

 data.role = "member";
 data.password = await bcrypt.hash(data.password, 10);
 data.created_at = new Date();
 data.updated_at = new Date();
 data.verified = false;

 const otp = Math.floor(100000 + Math.random() * 900000).toString();
 data.otp = otp;
 data.otp_expiry = new Date(Date.now() + 15 * 60 * 1000);

 try {
  const userRef = await addDoc(collection(firestore, "temp_users"), data);
  await sendVerificationEmail(data.email, otp, data.fullname);
  return {
   status: true,
   statusCode: 200,
   message: "Verification email sent",
   tempUserId: userRef.id,
  };
 } catch (error) {
  console.error("Registration error:", error);
  return {
   status: false,
   statusCode: 400,
   message: "Registration failed",
  };
 }
}

export async function verifyOTP(email: string, otp: string) {
 try {
  const q = query(
   collection(firestore, "temp_users"),
   where("email", "==", email)
  );
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
   return {status: false, message: "User not found or OTP expired"};
  }

  const userDoc = snapshot.docs[0];
  const userData = userDoc.data();

  if (userData.otp !== otp) {
   return {status: false, message: "Invalid OTP"};
  }

  if (new Date(userData.otp_expiry.toDate()) < new Date()) {
   return {status: false, message: "OTP expired"};
  }

  // Destructure with unused variables prefixed with _
  const {otp: _otp, otp_expiry: _otpExpiry, ...userDataWithoutOtp} = userData;
  userDataWithoutOtp.verified = true;

  const newUserRef = await addDoc(
   collection(firestore, "users"),
   userDataWithoutOtp
  );
  await deleteDoc(userDoc.ref);

  return {
   status: true,
   message: "Verification successful",
   user: {
    id: newUserRef.id,
    email: userData.email,
    fullname: userData.fullname,
    role: userData.role,
   },
  };
 } catch (error) {
  console.error("Verification error:", error);
  return {status: false, message: "Verification failed"};
 }
}

export async function login({email}: {email: string}) {
 const q = query(collection(firestore, "users"), where("email", "==", email));
 const snapshot = await getDocs(q);

 if (snapshot.empty) return null;

 const doc = snapshot.docs[0];
 const data = doc.data();

 return {
  id: doc.id,
  email: data.email,
  fullname: data.fullname,
  role: data.role,
  password: data.password,
  verified: data.verified,
 };
}

export async function addAppProduct(data: {
 name: string;
 description: string;
 duration: number; // in months
 pricePercentage: number; // percentage of sales
 features: string[];
 isActive: boolean;
 created_at?: Date;
 updated_at?: Date;
}) {
 try {
  data.created_at = new Date();
  data.updated_at = new Date();
  const docRef = await addDoc(collection(firestore, "appProducts"), data);
  return {
   status: true,
   statusCode: 200,
   message: "Package added successfully",
   id: docRef.id,
  };
 } catch (error) {
  return {status: false, statusCode: 500, message: "Failed to add package"};
 }
}

export async function retrieveAppProducts() {
 const snapshot = await getDocs(collection(firestore, "appProducts"));
 const data = snapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
 }));
 return data;
}

export async function retrieveAppProductById(id: string) {
 const snapshot = await getDoc(doc(firestore, "appProducts", id));
 const data = snapshot.data();
 return data;
}

export async function updateAppProduct(
 id: string,
 data: Partial<{
  name: string;
  description: string;
  duration: number;
  pricePercentage: number;
  features: string[];
  isActive: boolean;
  updated_at?: Date;
 }>
) {
 try {
  data.updated_at = new Date();
  await updateDoc(doc(firestore, "appProducts", id), data);
  return {
   status: true,
   statusCode: 200,
   message: "Package updated successfully",
  };
 } catch (error) {
  return {status: false, statusCode: 500, message: "Failed to update package"};
 }
}
