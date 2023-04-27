import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import getUserData from "../DB/User/getUserData";
import HandleMessage from "../../functions/HandleMessage";
import { User } from "../../Types/Types";

const login = (email: string, password: string): Promise<User> => {
  if (!email || !password)
    return new Promise((resolve, reject) =>
      reject(new Error("Все поля должны быть заполнены"))
    );

  const auth = getAuth();

  return signInWithEmailAndPassword(auth, email, password)
    .then(async (user) => await getUserData(user.user.email ? user.user.email : ""))
    .catch((error) => {
      HandleMessage(error, "error");
    });
};

export default login;
