'use client';

import "./Login.css";
import logoimg from "./logo (3).png";
import warning from "./logo (3).png";
import { useState } from "react";
import { StaticImageData } from "next/image";

interface LoginProps {
  // Add any props you want to pass to the Login component
}

const Login: React.FC<LoginProps> = () => {
  const [NewUser, setNewUser] = useState(true);
  const [Username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [error, seterror] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState(false);

  let logoImg: StaticImageData = logoimg;
  let warningImg: StaticImageData = warning;

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    seterror(false);

    if (NewUser) {
      // create user
    } else {
      // sign in user
    }
  };

  return (
    <div className="login-page">
      <header>
        <span>
          from <i>GuardIQ</i>
        </span>
      </header>

      <img className="logo" src={logoImg.src} alt="" />

      <h2 className="title">
        Admin <br />
        Dashboard
      </h2>

      <form onSubmit={submit}>
        {NewUser && (
          <div className="username">
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="username"
              id="username"
              required
            />
            <label htmlFor="username" >username</label>
          </div>
        )}

        <div className="email">
          <input
            onChange={(e) => setemail(e.target.value)}
            type="email"
            id="email"
            required
          />
          <label htmlFor="email" style={{ marginTop: 60 }}>email</label>
        </div>

        <div className="password">
          <input
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            id="password"
            required
          />
          <label htmlFor="password" style={{ marginTop: 120 }}>password</label>
        </div>

        {error && <img src={warningImg.src} alt="" className="status" />}

        {error && <span className="error">Process Failed</span>}

        <button type="submit">{NewUser ? "Sign Up" : "Log In"}</button>

        {NewUser ? (
          <span className="user-stat">
            Already have an account?{" "}
            <b
              onClick={() => {
                setNewUser(false);
                seterror(false);
              }}
            >
              Log In
            </b>
          </span>
        ) : (
          <span className="user-stat">
            Don't have an account?{" "}
            <b
              onClick={() => {
                setNewUser(true);
                seterror(false);
              }}
            >
              Sign Up
            </b>
          </span>
        )}
      </form>
    </div>
  );
};

export default Login;