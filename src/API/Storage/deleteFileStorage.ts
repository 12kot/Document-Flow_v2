import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../firebase";

const deleteFileStorage = (path: string): Promise<void> => {
  const desertRef = ref(storage, path);

  return deleteObject(desertRef);
};

export default deleteFileStorage;
