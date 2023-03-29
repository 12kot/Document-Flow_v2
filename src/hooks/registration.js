import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const registration = (email, password) => {
  const auth = getAuth();
  
  return createUserWithEmailAndPassword(auth, email, password);
};

export default registration;
