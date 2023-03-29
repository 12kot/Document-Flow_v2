import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const login = (email, password) => {
  const auth = getAuth();

  return signInWithEmailAndPassword(auth, email, password);
};

export default login;
