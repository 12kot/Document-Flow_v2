import React from "react";
import Form from "./Form/Form";
import styles from "./Form/Form.module.css";
import { NavLink, Navigate } from "react-router-dom";
import registration from "../../API/registration";
import {
  changeEmail,
  changePass,
  changeRepeatPass,
} from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import useAuth from "../../hooks/use-auth";

import getFiles from "../../API/getFiles";
import getDownloadURLFiles from "../../API/getDownloadUrlFiles";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const pass = useSelector((state) => state.auth.password);
  const repeatPass = useSelector((state) => state.auth.repeatPassword);

  const setEmail = (text) => {
    dispatch(changeEmail({ text }));
  };

  const setPass = (text) => {
    dispatch(changePass({ text }));
  };

  const setRepeatPass = (text) => {
    dispatch(changeRepeatPass({ text }));
  };

  //убрать повторяющийся код
  const handleRegister = () => {
    registration(email, pass, repeatPass)
      .then(async (user) => {
        let userFiles = [];
        
        await getFiles(email).then(async (files) => {
          // for (const file of files.items)
          //   await getDownloadURLFiles(file).then((path) =>
          //     userFiles.push({ name: file.name, path })
          //   );
        });

        dispatch(
          setUser({
            email: user.user.email,
            accessToken: user.user.accessToken,
            uid: user.user.uid,
            files: userFiles,
          })
        );

        alert("Вы успешно зарегестрировались");
        return <Navigate to="/disk" />
      })
      .catch(alert);
  };

  if (useAuth().isAuth) return <Navigate to="/disk" />;
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.form}`}>
        <Form
          title="Register"
          handleClick={handleRegister}
          email={email}
          setEmail={setEmail}
          pass={pass}
          setPass={setPass}
          repeatPass={repeatPass}
          setRepeatPass={setRepeatPass}
        />

        <div className={`${styles.register} ${styles.item}`}>
          <span>Уже зарегестриваны?</span>
          <br />
          <NavLink to="/login">Log In</NavLink>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
