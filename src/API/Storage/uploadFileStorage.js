import { storage } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import getDownloadURLFiles from "./getDownloadUrlFiles";
import HandleMessage from "../../functions/HandleMessage";

const uploadFileStorage = async (file, email) => {
  if (!file) { HandleMessage("Выберите файл", "error"); return {}; }

  const fileRef = ref(storage, `${email}/${file.name}`);

  return uploadBytes(fileRef, file)
    .then(async (file) => {
      return {
        ownerEmail: email,
        usersEmail: [],
        name: file.metadata.name,
        fullPath: file.metadata.fullPath,
        path: await getDownloadURLFiles(file.metadata),
        isHiden: false,
        id: file.metadata.generation,
      };
    })
    .catch(alert);
};

export default uploadFileStorage;
