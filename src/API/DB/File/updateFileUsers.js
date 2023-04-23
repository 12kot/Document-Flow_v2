import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const updateFileUsers = async (userEmail, fileId, users) => {
  const fileRef = doc(db, `users/${userEmail}/files`, fileId);

  await updateDoc(fileRef, {
    usersEmail: users,
  });
};

export default updateFileUsers;
