import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { MdMailOutline, MdLockOutline } from "react-icons/md";
// import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import TextField from "../UIComponents/TextField";
import "./signin.scss";

const SignIn = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState({
    username: false,
    password: false,
  });

  const clearError = () => {
    setError({
      username: false,
      password: false,
    });
  };

  const markError = (field) => {
    if (!error[field]) {
      setError((prev) => {
        return {
          ...prev,
          [field]: true,
        };
      });
    }
  };

  const validation = () => {
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let msg;
    const errUsername = "Please enter the Email";
    const errInvalidUser = "Please enter a valid Email";
    const errPassword = "Please enter a password";
    if (!username) {
      msg = msg ? msg : errUsername;
      markError("username");
    }
  };

  const handleSubmit = () => {
    
  };

  return (
    <div className="signin-container">
      <div className="logo">
        <img
          src={require("../../assets/img/logo.png")}
          alt="VIRUJH"
          className="logo-img"
        />
      </div>
      <Card className="signin-box-wrap">
        <Card.Body className="signin-box">
          <h1 className="signin-head">Login into your virujh account</h1>
          <form className="fields">
            <div className="username-field-wrap field-wrap">
              <TextField
                size="sm"
                label={<MdMailOutline />}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={error.username}
              />
            </div>
            <div className="password-field-wrap field-wrap">
              <TextField
                size="sm"
                type="password"
                label={<MdLockOutline />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={error.password}
              />
              <a className="forgot-password">Forgot Password?</a>
            </div>
            <div className="submit-btn-wrap">
              <Button
                variant="primary"
                type="submit"
                className="submit-btn"
                onClick={handleSubmit}
              >
                Login
              </Button>
              <p className="sign-up-wrap">
                I am new? <a className="sign-up">Signup</a>
              </p>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignIn;
