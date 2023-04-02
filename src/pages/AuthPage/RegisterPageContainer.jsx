import React from "react";
import { Navigate } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import registration from "../../API/registration";
import {
  changeEmail,
  changePass,
  changeRepeatPass,
} from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import getFiles from "../../API/getFiles";
import getDownloadURLFiles from "../../API/getDownloadUrlFiles";

const RegisterPageContainer = () => {
  const dispatch = useDispatch();
  const { email, password, repeatPassword } = useSelector((state) => state.auth);

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
    registration(email, password, repeatPassword)
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
        return <Navigate to="/disk" />;
      })
      .catch(alert);
  };

  return (
    <RegisterPage
      handleRegister={handleRegister}
      email={email}
      setEmail={setEmail}
      pass={password}
      setPass={setPass}
      repeatPass={repeatPassword}
      setRepeatPass={setRepeatPass}
    />
  );
};

export default RegisterPageContainer;
