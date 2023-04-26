import { storage } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import getDownloadURLFiles from "./getDownloadUrlFiles";
import HandleMessage from "../../functions/HandleMessage";
import {UserFile } from "../../Types/Types";

const uploadFileStorage = async (file: File, email: string): Promise<UserFile | void> => {
  if (!file) { HandleMessage("Выберите файл", "error"); return; }

  const fileRef = ref(storage, `${email}/${file.name}`);

  return uploadBytes(fileRef, file)
    .then(async (file) => {
      return {
        ownerEmail: email,
        usersEmail: [],
        name: file.metadata.name,
        fullPath: file.metadata.fullPath,
        path: await getDownloadURLFiles(file.metadata.fullPath),
        isHiden: false,
        id: file.metadata.generation,
        folder: ""
      };
    })
    .catch(alert);
};

export default uploadFileStorage;
