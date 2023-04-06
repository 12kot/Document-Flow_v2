import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import login from "../../../API/Auth/login";
import { setUser } from "../../../store/slices/userSlice";
import getUserData from "../../../functions/getUserData";

const LoginPageContainer = () => {
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    alert("Загружаем данные с сервера");
    setIsLoading(true);

    await login(email, password)
      .then(async (user) => {

        let userData = await getUserData(user);
        dispatch(setUser({ ...userData }));
        
        alert("Вы успешно авторизовались");
        setIsLoading(false);
        return <Navigate to="/disk" />;
      })
      .catch((error) => {
        alert(error);
        setIsLoading(false);
      });
  };

  return (
    <div>
      {isLoading ? <p>Loading</p> :
        <LoginPage handleLogin={handleLogin} />}
    </div>
  );
};

export default LoginPageContainer;
