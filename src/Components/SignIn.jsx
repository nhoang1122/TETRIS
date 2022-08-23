import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";

import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/Account");
    } catch (e) {
      setError(e.message);
      console.log("ERROR FROM SIGN-IN : ", e.massage);
    }
  };

  return (
    <div className="total">
      <div className="main">
        <div>
          <h1>SIGN IN</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>EMAIL</label>
            <br />
            <input onChange={(e) => setEmail(e.target.value)} type="email" />
          </div>
          <br />
          <div>
            <label>PASSWORD</label>
            <br />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
          <br />
          <button>SIGN IN</button>

          <p>
            Don't Have An Account? <Link to="/SignUp">SIGN UP</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
