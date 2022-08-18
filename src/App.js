import React from "react";
import {Routes, Route} from "react-router-dom"


import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import AccountPage from "./Components/AccountPage";
import ProtectedRoute from "./Components/ProtectedRoute";

import {AuthContextProvider} from "./Context/AuthContext"

function App() {
  return (
    <div>
      <header className="logo">
        <h1 className="t1">T</h1><h1 className="e">E</h1><h1 className="t2">T</h1><h1 className="r">R</h1><h1 className="i">I</h1><h1 className="s">S</h1>
      </header>

      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<SignIn/>}/>
          <Route path="SignUp" element={<SignUp/>}/>
          <Route path="Account" element={<ProtectedRoute><AccountPage/></ProtectedRoute>}/>
        </Routes>
      </AuthContextProvider>

    </div>
  );
}

export default App;
