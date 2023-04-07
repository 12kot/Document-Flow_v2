import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const getUserFiles = async (userEmail) => {
    const usersFilesCollectionRef = collection(
        db,
        `users/${userEmail}/files`
    );

    const filesCollection = await getDocs(usersFilesCollectionRef);
    let files = filesCollection.docs.map((file) => {
      return { ...file.data() };
    });

    return files;
}

export default getUserFiles;