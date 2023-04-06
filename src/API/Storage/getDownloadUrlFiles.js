import { getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { ref } from "firebase/storage";

const getDownloadURLFiles = async (file) => {
  const fileRef = ref(storage, file.fullPath);

  return getDownloadURL(fileRef).then((path) => {
    return path;
  });
};

export default getDownloadURLFiles;
