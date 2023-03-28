import React from "react";
import Form from "./Form/Form";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const RegisterPage = () => {
  const dispatch = useDispatch();

  const handleRegister = (email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).then(console.log).catch(console.error);
  };

  return (
    <div>
      <Form title="Register" handleClick={handleRegister}/>
    </div>
  );
};

export default RegisterPage;
