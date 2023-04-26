import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const getUserData = async (userEmail: string): Promise<any>  => {
  const usersCollectionRef = doc(db, "users", userEmail);
  const data = await getDoc(usersCollectionRef);
  
  let us;
  if (data.exists()) {
    us = data.data();
  }

  return us;
};

export default getUserData;
