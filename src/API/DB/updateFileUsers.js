import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const updateFileUsers = async (userEmail, fileId, usersEmail) => {
  const fileRef = doc(db, `users/${userEmail}/files`, fileId);

  await updateDoc(fileRef, {
    usersEmail: usersEmail,
  });
};

export default updateFileUsers;
