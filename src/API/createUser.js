import { db } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";

const createUser = async (user, initializeFile) => {
    const usersCollectionRef = collection(db, "users");
    await setDoc(doc(usersCollectionRef, user.uid), user);
    
    const usersFilesCollectionRef = collection(db, `users/${user.uid}/files`);
    await setDoc(doc(usersFilesCollectionRef, "initializeFile"), initializeFile);
}

export default createUser;