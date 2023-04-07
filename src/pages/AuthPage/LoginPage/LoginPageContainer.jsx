import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import login from "../../../API/Auth/login";
import { setUser } from "../../../store/slices/userSlice";
import getUserData from "../../../API/DB/getUserData";

const LoginPageContainer = () => {
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);

    await login(email, password)
      .then(async (user) => {

        let userData = await getUserData(user);
        dispatch(setUser({ ...userData }));
        
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
        <LoginPage handleLogin={handleLogin} isLoading={isLoading} />
    </div>
  );
};

export default LoginPageContainer;
