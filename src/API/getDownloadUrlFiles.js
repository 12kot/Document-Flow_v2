import { getDownloadURL } from "firebase/storage";

const getDownloadURLFiles = (files) => {
  return getDownloadURL(files);
};

export default getDownloadURLFiles;
