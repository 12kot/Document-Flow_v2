import { User } from "../../../Types/Types";
import { db } from "../../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";

const createUser = async (user: User): Promise<void> => {
    const usersCollectionRef = collection(db, "users");
    await setDoc(doc(usersCollectionRef, user.email), user);
}

export default createUser;