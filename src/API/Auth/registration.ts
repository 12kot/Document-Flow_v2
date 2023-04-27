import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { User } from "../../Types/Types";
import createUser from "../DB/User/createUserOnDB";
import HandleMessage from "../../functions/HandleMessage";

const registration = (
  email: string,
  password: string,
  repeatPassword: string
): Promise<User | void> | null => {
  if (!email || !password || !repeatPassword) {
    HandleMessage("Все поля должны быть заполнены", "error");
    return null;
  }

  if (password !== repeatPassword) {
    HandleMessage("Введены различные пароли", "error");
    return null;
  }

  if (password.length < 6) {
    HandleMessage("Длина пароля должна быть более 6 символов", "error");
    return null;
  }

  const auth = getAuth();

  return createUserWithEmailAndPassword(auth, email, password)
    .then(async (user) => {
      let userData: User = {
        email: user.user.email ? user.user.email : "",
        uid: user.user.uid,
        token: (await user.user.getIdToken()).toString(),
        folders: [],
        files: [],
        isLoggedIn: true,
      };

      await createUser(userData);
      userData.name = undefined;

      HandleMessage("Вы успешно зарегистрировались", "success");
      return userData;
    })
    .catch((error) => {
      HandleMessage(error, "error");
    });
};

export default registration;
