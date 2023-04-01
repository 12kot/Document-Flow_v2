import React from "react";
import Form from "./Form/Form";
import styles from "./Form/Form.module.css";
import { NavLink, Navigate } from "react-router-dom";
import login from "../../API/login";
import { useDispatch, useSelector } from "react-redux";
import { changeEmail, changePass } from "../../store/slices/authSlice";
import { setUser } from "../../store/slices/userSlice";
import useAuth from "../../hooks/use-auth";
import getFiles from "../../API/getFiles";
import getDownloadURLFiles from "../../API/getDownloadUrlFiles";

const LoginPage = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const pass = useSelector((state) => state.auth.password);

  const setEmail = (text) => {
    dispatch(changeEmail({ text }));
  };

  const setPass = (text) => {
    dispatch(changePass({ text }));
  };


  //убрать повторяющийся код
  const handleLogin = () => {
    login(email, pass)
      .then(async (user) => {
        let userFiles = [];
        
        await getFiles(email).then(async (files) => {
          for (const file of files.items)
            await getDownloadURLFiles(file).then((path) =>
              userFiles.push({ name: file.name, path })
            );
        });

        dispatch(
          setUser({
            email: user.user.email,
            accessToken: user.user.accessToken,
            uid: user.user.uid,
            files: userFiles,
          })
        );
        alert("Вы успешно авторизовались");
        return <Navigate to="/disk" />;
      })
      .catch(alert);
  };

  if (useAuth().isAuth) return <Navigate to="/disk" />;

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.form}`}>
        <Form
          title="Log In"
          handleClick={handleLogin}
          email={email}
          setEmail={setEmail}
          pass={pass}
          setPass={setPass}
        />

        <div className={`${styles.register} ${styles.item}`}>
          <span>Ещё не зарегестрированы?</span>
          <br />
          <NavLink to="/register">Sign In</NavLink>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
