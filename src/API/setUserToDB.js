import { set, ref } from "firebase/database";
import { db } from "../firebase";

const setUserOnDB = async (user) => {
    await set(ref(db, `users/${user.uid}`), user).then(console.log).catch(console.log);
}

export default setUserOnDB;