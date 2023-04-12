import { Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import Header from "./pages/Header/Header";
import Footer from "./pages/Footer/Footer";
import MainPage from "./pages/MainPage/MainPage";
import DiskPageContainer from "./pages/DiskPage/DiskPageContainer";
import LoginPageContainer from "./pages/AuthPage/LoginPage/LoginPageContainer";
import RegisterPageContainer from "./pages/AuthPage/RegisterPage/RegisterPageContainer";
import Protected from "./functions/Protected";
import { useSelector } from "react-redux";

const App = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <div className="App">
      <div className="header">
        <Header />
      </div>

      <div className="content">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/login"
            element={
              <Protected isLoggedIn={!isLoggedIn} path="/disk">
                <LoginPageContainer />
              </Protected>
            }
          />
          <Route
            path="/register"
            element={
              <Protected isLoggedIn={!isLoggedIn} path="/disk">
                <RegisterPageContainer />
              </Protected>
            }
          />
          <Route
            path="/disk"
            element={
              <Protected isLoggedIn={isLoggedIn} path="/login">
                <DiskPageContainer />
              </Protected>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
