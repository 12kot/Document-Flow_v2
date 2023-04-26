import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import HandleMessage from "../../../functions/HandleMessage";

const deleteFolderDB = async (userEmail: string, folders: string[], folder: string): Promise<boolean>=> {
  HandleMessage("Обрабатываем запрос", "info");

  if (!folders.includes(folder)) {
    HandleMessage("Такой папки не существует", "error");
    return false;
  }

  const newFolders = folders.filter((obj) => obj !== folder);
  const fileRef = doc(db, `users/`, userEmail);

  await updateDoc(fileRef, {
    folders: newFolders,
  });

  HandleMessage("Папка успешно удалена", "success");
  return true;
};

export default deleteFolderDB;
