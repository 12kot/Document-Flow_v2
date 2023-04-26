import { UserFile } from "../../../Types/Types";
import { db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";

const uploadFileDB = async (userEmail: string, file: UserFile): Promise<void> => {
  const userDoc = doc(db, `users/${userEmail}/files`, file.id);
  await setDoc(userDoc, file);
};

export default uploadFileDB;
