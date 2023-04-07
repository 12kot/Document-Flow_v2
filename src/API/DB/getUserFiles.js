import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const getUserFiles = async (userUid) => {
    const usersFilesCollectionRef = collection(
        db,
        `users/${userUid}/files`
    );

    const filesCollection = await getDocs(usersFilesCollectionRef);
    let files = filesCollection.docs.map((file) => {
      return { ...file.data() };
    });

    return files;
}

export default getUserFiles;