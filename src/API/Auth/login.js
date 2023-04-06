import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const login = (email, password) => {
  if (!email || !password)
    return new Promise((resolve, reject) =>
      reject(new Error("Все поля должны быть заполнены"))
    );

  const auth = getAuth();

  return signInWithEmailAndPassword(auth, email, password);
};

export default login;
