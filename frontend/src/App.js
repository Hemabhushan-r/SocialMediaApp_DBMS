import logo from "./logo.svg";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import "./styles.css";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import UserPrivilege from "./components/UserPrivilege";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/query" element={<UserPrivilege />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
