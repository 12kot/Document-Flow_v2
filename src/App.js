import { Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import Header from "./pages/Header/Header";
import Footer from "./pages/Footer/Footer";
import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/AuthPage/LoginPage";
import RegisterPage from "./pages/AuthPage/RegisterPage";
import DiskPageContainer from "./pages/DiskPage/DiskPageContainer";
import LoginPageContainer from "./pages/AuthPage/LoginPageContainer";

class App extends React.Component {
  render = () => {
    return (
      <div className="App">
        <div className="header">
          <Header />
        </div>

        <div className="content">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPageContainer />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/disk" element={<DiskPageContainer />} />
          </Routes>
        </div>
        
        <div className="footer">
          <Footer />
        </div>
      </div>
    );
  };
}

export default App;
