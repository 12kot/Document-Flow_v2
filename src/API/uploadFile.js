import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const uploadFile = (file, email) => {
    if (!file)
    return new Promise((resolve, reject) => reject(new Error("Выберите файл")));
    
    const fileRef = ref(
    storage,
    `${email}/${v4() + "_[FILE_NAME]_" + file.name}`
  );
  return uploadBytes(fileRef, file);
};

export default uploadFile;
