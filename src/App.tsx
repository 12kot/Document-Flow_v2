import React, { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAppSelector } from "./hooks/hooks";

import "./App.css";
import Header from "./pages/Header/Header";
import MainPage from "./pages/MainPage/MainPage";
import DiskPageContainer from "./pages/DiskPage/DiskPageContainer";
import LoginPageContainer from "./pages/AuthPage/LoginPage/LoginPageContainer";
import RegisterPageContainer from "./pages/AuthPage/RegisterPage/RegisterPageContainer";
import Protected from "./functions/Protected";
import Files from "./pages/DiskPage/Outlet/Files.jsx";
import Folders from "./pages/DiskPage/Outlet/Folders";

const App = (): ReactElement  => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  return (
    <div className="App">
      <div className="header">
        <Header />
      </div>

      <div className="content">
        <Routes>
          <Route path="/*" element={<MainPage />} />
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
          >
            <Route index element={<Files />} />
            <Route path="folders/:id" element={<Folders />} />
          </Route>
        </Routes>
      </div>

      <ToastContainer
        position="bottom-right"
        theme="dark"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </div>
  );
};

export default App;
