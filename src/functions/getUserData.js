import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import getUserFiles from "../API/DB/getUserFiles";

const getUserData = async (user) => {
  const usersCollectionRef = doc(db, "users", user.user.uid);
  const data = await getDoc(usersCollectionRef);
  let us = {};
  if (data.exists()) {
    us = data.data();

   // us.files = await getUserFiles(user.user.uid);
  }

  return us;
};

export default getUserData;
