import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import HandleMessage from "../../../functions/HandleMessage";
import { UserFile } from "../../../Types/Types";

const updateFileFolder = async (userEmail: string, file: UserFile, newFolderPath: string): Promise<boolean> => {
  if (!file.id) {
    HandleMessage("Для добавления файлов воспользуйтесь окошком выше", "error");
    return false;
  }

  if (userEmail !== file.ownerEmail) {
      HandleMessage("Вы не можете перемещать файлы чужих пользователей", "error");
      return false;
  }

  const fileRef = doc(db, `users/${userEmail}/files`, file.id);

  await updateDoc(fileRef, {
    folder: newFolderPath,
  });

  //HandleMessage("Файл успешно перемещён", "success");
  return true;
};

export default updateFileFolder;
