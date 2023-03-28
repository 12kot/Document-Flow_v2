import { Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import Header from "./pages/Header/Header";
import Footer from "./pages/Footer/Footer";
import MainPage from "./pages/MainPage/MainPage";

class App extends React.Component {
  render = () => {
    return (
      <div className="App">
        <div className="content">
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
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
