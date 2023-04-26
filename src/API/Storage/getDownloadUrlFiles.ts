import { getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { ref } from "firebase/storage";

const getDownloadURLFiles = async (fullPath: string): Promise<string> => {
  const fileRef = ref(storage, fullPath);

  return getDownloadURL(fileRef).then((path) => {
    return path;
  });
};

export default getDownloadURLFiles;
