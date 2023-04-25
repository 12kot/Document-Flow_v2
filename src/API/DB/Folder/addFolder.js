import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import HandleMessage from "../../../functions/HandleMessage";

const addFolder = async (userEmail, folders, currentFolder, folder) => {
  HandleMessage("Обрабатываем запрос", "info");
  const isValid = await _isValid(folders, currentFolder, folder);

  if (!isValid)
    return false;

  folder = folder.toLowerCase();
  folder = currentFolder ? `${currentFolder}+${folder}` : folder;
  folders = [...folders, folder];

  const fileRef = doc(db, `users/`, userEmail);

  await updateDoc(fileRef, {
    folders: folders,
  });

  HandleMessage("Папка успешно создана", "success");
  return folder;
};

const _isValid = async (folders, currentFolder, folder) => {
  if (!folder || !folder.trim()) {
    HandleMessage("Поле не может быть пустым", "error");
    return false;
  }

  folder = folder.toLowerCase();
  if (folder.length > 12) {
    HandleMessage("Название папки не может превышать 12 символов");
    return false;
  }

  if (
    folder.includes("@") ||
    folder.includes("+") ||
    folder.includes(")") ||
    folder.includes("(") ||
    folder.includes("*") ||
    folder.includes("&") ||
    folder.includes("^") ||
    folder.includes("$") ||
    folder.includes("#") ||
    folder.includes("!")
  ) {
    HandleMessage("Название папки не может содержать специальные символы", "error");
    return false;
  }

  folder = currentFolder ? `${currentFolder}+${folder}` : folder;
  if (folders.includes(folder)) {
    HandleMessage("Папка с таким названием уже существует", "error");
    return false;
  }

  return true;
};

export default addFolder;
