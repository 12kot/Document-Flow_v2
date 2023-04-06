import { db } from "../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";

const createUser = async (user) => {
    const usersCollectionRef = collection(db, "users");
    await setDoc(doc(usersCollectionRef, user.uid), user);
}

export default createUser;