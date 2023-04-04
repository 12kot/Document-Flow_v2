import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const getUserData = async (user) => {
  const usersCollectionRef = doc(db, "users", user.user.uid);

  const usersFilesCollectionRef = collection(
    db,
    `users/${user.user.uid}/files`
  );

  const data = await getDoc(usersCollectionRef);
  let us = {};
  if (data.exists()) {
    us = data.data();

    const filesCollection = await getDocs(usersFilesCollectionRef);
    us.files = filesCollection.docs.map((file) => {
      return { ...file.data() };
    });
  }

  return us;
};

export default getUserData;
