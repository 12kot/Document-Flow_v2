import { storage } from "../firebase";
import { ref, listAll } from "firebase/storage";

const getFiles = (email) => {
  const fileRef = ref(storage, `${email}/`);

  return listAll(fileRef);
};

export default getFiles;
