import { storage } from "../firebase";
import { ref, listAll } from "firebase/storage";
import getDownloadURLFiles from "./getDownloadUrlFiles";
import getFileName from "../functions/getFileName";

const getFiles = async (email) => {
  let userFiles = [];
  const fileRef = ref(storage, `${email}/`);

  await listAll(fileRef).then(async (files) => {
    for (let file of files.items) {
      let path = await getDownloadURLFiles(file);
      
      userFiles.push({
        name: getFileName(file.name),
        path,
        fullPath: file.fullPath,
        isHiden: false,
      });
    }
  });

  return userFiles;
};

export default getFiles;
