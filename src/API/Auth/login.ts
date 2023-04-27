import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import getUserData from "../DB/User/getUserData";
import HandleMessage from "../../functions/HandleMessage";
import { User } from "../../Types/Types";

const login = (email: string, password: string): Promise<User> | void => {
  if (!email || !password) {
    HandleMessage("Все поля должны быть заполнены", "error");
    return;
  }

  const auth = getAuth();

  return signInWithEmailAndPassword(auth, email, password)
    .then(async (user) => {

      let userData = await getUserData(user.user.email ? user.user.email : "");
      HandleMessage("Вы успешно авторизовались", "success");
      
      return userData;
    })
    .catch((error) => {
      HandleMessage(error, "error");
    });
};

export default login;
