import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const registration = (email: string, password: string, repeatPassword: string): Promise<any> => {
  if (!email || !password || !repeatPassword)
    return new Promise((resolve, reject) =>
      reject(new Error("Все поля должны быть заполнены"))
    );

  if (password !== repeatPassword)
    return new Promise((resolve, reject) =>
      reject(new Error("Введены различные пароли"))
    );

  if (password.length < 6)
    return new Promise((resolve, reject) =>
      reject(new Error("Длина пароля должна быть более 6 символов"))
    );

  const auth = getAuth();

  return createUserWithEmailAndPassword(auth, email, password);
};

export default registration;
