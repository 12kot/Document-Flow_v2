import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import HandleMessage from "../../functions/HandleMessage";
import getUserByName from "./getUserByName";

const updateUserName = async (userEmail, name) => {
  HandleMessage("Обновляем имя", "info");
  
  if (!await _isValid(name)) {
    return false;
  }

  name = name.toLowerCase();
  const userRef = doc(db, `users/`, userEmail);

  await updateDoc(userRef, {
    name: name,
  });
  HandleMessage("Имя успешно обновленно", "success");
  return true;
};

const _isValid = async (name) => {
  if (!name) {
    HandleMessage("Поле не может быть пустым", "error");
    return false;
  }

  name = name.toLowerCase();
  if (name.length < 3) {
    HandleMessage("Имя должно быть длинее 3 символов");
    return false;
  }

  if (name.length > 12) {
    HandleMessage("Имя не должно быть длинее 12 символов");
    return false;
  }

  if (
    name.includes("@") ||
    name.includes("_") ||
    name.includes("+") ||
    name.includes("-") ||
    name.includes(")") ||
    name.includes("(") ||
    name.includes("*") ||
    name.includes("&") ||
    name.includes("^") ||
    name.includes("$") ||
    name.includes("#") ||
    name.includes("!")
  ) {
    HandleMessage("Имя не может содержать специальные символы", "error");
    return false;
  }

  if (await getUserByName(name)) {
    HandleMessage("Данное имя уже занято. Выберите другое", "error");
    return false;
  }

  return true;
};

export default updateUserName;
