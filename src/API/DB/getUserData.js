import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const getUserData = async (user) => {
  const usersCollectionRef = doc(db, "users", user.user.email);
  const data = await getDoc(usersCollectionRef);
  
  let us = {};
  if (data.exists()) {
    us = data.data();
  }

  return us;
};

export default getUserData;
