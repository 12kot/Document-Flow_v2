import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import getDownloadURLFiles from "./getDownloadUrlFiles";

const uploadFile = async (file, email) => {
  if (!file)
    return new Promise((resolve, reject) => reject(new Error("Выберите файл")));

  const fileRef = ref(
    storage,
    `${email}/${file.name}`
  );

  return uploadBytes(fileRef, file).then(async (file) => {
    return {
      name: file.metadata.name,
      fullPath: file.metadata.fullPath,
      path: await getDownloadURLFiles(file.metadata),
      isHiden: false,
      id: file.metadata.generation,
    };
  }).catch(alert);
};

export default uploadFile;
