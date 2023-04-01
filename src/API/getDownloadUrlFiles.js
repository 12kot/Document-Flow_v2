import { getDownloadURL } from "firebase/storage";

const getDownloadURLFiles = (file) => {
  return getDownloadURL(file);
};

export default getDownloadURLFiles;
