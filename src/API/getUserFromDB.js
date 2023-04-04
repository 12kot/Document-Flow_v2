import { onValue, ref } from "firebase/database";
import { db } from "../firebase";

const getUserFromDB = async (uid) => {
  const userRef = ref(db, `users/${uid}`);

  let user = await new Promise((resolve, reject) => {
    onValue(userRef, (snapshot) => { resolve(snapshot.val()); });
  }).then((response) => { return response; });

  let userFiles = [];
  for (let file of Object.entries(user.files))
    userFiles.push(file[1]);

  user.files = userFiles;

  debugger;
  return user;
};

export default getUserFromDB;
