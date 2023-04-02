//сразу менять имя файла

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import login from "../../../API/login";
import { changeEmail, changePass } from "../../../store/slices/authSlice";
import { setUser } from "../../../store/slices/userSlice";
import getFiles from "../../../API/getFiles";
import getDownloadURLFiles from "../../../API/getDownloadUrlFiles";

const LoginPageContainer = () => {
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state.auth);
 
  const setEmail = (text) => {
    dispatch(changeEmail({ text }));
  };

  const setPass = (text) => {
    dispatch(changePass({ text }));
  };

  //убрать повторяющийся код
  const handleLogin = () => {
    login(email, password)
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
        alert("Вы успешно авторизовались");
        return <Navigate to="/disk" />;
      })
      .catch(alert);
  };

  return (
    <LoginPage
      handleLogin={handleLogin}
      email={email}
      setEmail={setEmail}
      pass={password}
      setPass={setPass}
    />
  );
};

export default LoginPageContainer;
