import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const uploadFileDB = async (user, file) => {
  const userDoc = doc(db, `users/${user.uid}/files`, file.id);
  await setDoc(userDoc, file);
};

export default uploadFileDB;
