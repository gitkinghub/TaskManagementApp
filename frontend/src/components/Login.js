// src/components/Login.js
import React, { useState } from "react";
import LoginImage from "../assets/login.svg";
import Logo from "../assets/logo.png";
import { validateLogin } from "../utils/Validation";
import FormHandler from "../utils/FormHandler";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export const Login = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  const CallbackFunction = () => {
    console.log("Form submitted successfully!");
  };

  const { handleChange, handleSubmit, setValue, initForm, values, errors } =
    FormHandler(CallbackFunction, validateLogin);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        {
          username: values.username,
          password: values.password
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
          timeout: 5000
        }
      );

      const authToken = response.data.token;
      Cookies.set("tokenCookie", authToken, { expires: 7 });
      navigate("/home");
      toast.success(`Login Successful`);
    } catch (error) {
      console.error("Login failed", error);
      if (error.response) {
        const errorMessage = error.response.data.detail || "Login failed";
        setValue("error", errorMessage);
      } else if (error.request) {
        setValue("error", "Network error. Please try again.");
      } else {
        setValue("error", "An unexpected error occurred. Please try again.");
      }
      toast.error(`Invalid Username or Password`);
    }
  };

  return (
    <div
      className={
        "vh-100 d-flex align-items-center justify-content-center login"
      }
    >
      <div className="row m-0">
        <div className={"col-md-6 mx-auto"}>
          <div className="d-flex align-items-center justify-content-center">
            <img
              className={
                "login-image img-responsive d-block align-items-center"
              }
              src={LoginImage}
              alt=""
            />
          </div>
        </div>
        <div
          className={
            "col-md-6 d-flex align-items-center justify-content-center"
          }
        >
          <div className={"container-widget"}>
            <div className="login-form-inner">
              <form action="#">
                <div className="d-flex align-items-center">
                  <img
                    className={"login-logo d-block mx-auto img-fluid"}
                    src={Logo}
                    alt=""
                  />
                </div>
                <h1 className="brand-text text-center">Task Manager</h1>
                <div className="login-field">
                  <input
                    className={`form-control ${
                      errors.username ? "border-red" : ""
                    }`}
                    type="text"
                    name={"username"}
                    onChange={(e) => handleChange(e)}
                    placeholder="Username"
                  />
                </div>
                {errors.username && (
                  <p className={"text-red"}>{errors.username}</p>
                )}
                <div className="login-field">
                  <input
                    className={`form-control ${
                      errors.password ? "border-red" : ""
                    }`}
                    type="password"
                    name={"password"}
                    onChange={(e) => handleChange(e)}
                    placeholder="Password"
                  />
                </div>
                {errors.password && (
                  <p className={"text-red"}>{errors.password}</p>
                )}
                <div className="login-btn d-grid">
                  <button
                    type="button"
                    className={"btn btn-secondary tasks-dropdown-btn flex-end"}
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
                {values.error && <p className={"text-red"}>{values.error}</p>}
                <div className="py-3 text-start">
                  <Link
                    to="/register"
                    className="login-forgot text-decoration-underline"
                  >
                    Create an account
                  </Link>
                </div>
                {values.error && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {values.error}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
