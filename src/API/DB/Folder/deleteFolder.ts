import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import HandleMessage from "../../../functions/HandleMessage";

const deleteFolderDB = async (userEmail: string, folders: string[], folder: string): Promise<string[]>=> {
  HandleMessage("Удаляем папку", "info");

  if (!folders.includes(folder)) {
    HandleMessage("Такой папки не существует", "error");
    return [];
  }

  const newFolders = folders.filter((obj) => !obj.startsWith(folder));
  const fileRef = doc(db, `users/`, userEmail);

  await updateDoc(fileRef, {
    folders: newFolders,
  });

  return newFolders;
};

export default deleteFolderDB;
