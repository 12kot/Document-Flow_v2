import { ref, deleteObject } from "firebase/storage";
import { storage } from "../firebase";

const deleteFile = (path) => {
  const desertRef = ref(storage, path);

  return deleteObject(desertRef);
};

export default deleteFile;
