import React from "react";
import SignUpImage from "../assets/register.avif";
import Logo from "../assets/logo.png";
import FormHandler from "../utils/FormHandler";
import { validateSignUp as validate } from "../utils/Validation";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const CallbackFunction = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        values,
        {
          headers: {
            "Content-Type": "application/json"
          },
          timeout: 5000
        }
      );
      navigate("/");
      toast.success(`Successfully Registered`);
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
        console.error("Status code:", error.response.status);
        toast.error(
          `Registration failed: ${error.response.data.error || "Unknown error"}`
        );
      } else if (error.request) {
        console.error("No response received from the server.");
        toast.error("No response from server. Please try again.");
      } else {
        console.error("Error:", error.message);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const { handleChange, handleSubmit, values, errors } = FormHandler(
    CallbackFunction,
    validate
  );

  return (
    <div
      className={
        "vh-100 d-flex align-items-center justify-content-center login"
      }
    >
      <div className="row m-0">
        <div
          className={
            "col-md-6 d-flex align-items-center justify-content-center"
          }
        >
          <div className={"container-widget"}>
            <div className="login-form-inner">
              <form onSubmit={handleSubmit}>
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
                      errors.email ? "border-red" : ""
                    }`}
                    type="email"
                    name={"email"}
                    onChange={(e) => handleChange(e)}
                    placeholder="User Email"
                  />
                </div>
                {errors.email && <p className={"text-red"}>{errors.email}</p>}
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
                <div className="login-btn d-grid pt-3">
                  <button
                    type="submit"
                    className={"btn btn-secondary tasks-dropdown-btn flex-end"}
                  >
                    Sign Up
                  </button>
                </div>
                <div className="py-3 text-center">
                  <Link
                    to="/"
                    className="login-forgot text-decoration-underline"
                  >
                    Already have an account
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className={"col-md-6 mx-auto"}>
          <div className="d-flex align-items-center justify-content-center">
            <img
              className={
                "login-image img-responsive d-block align-items-center"
              }
              src={SignUpImage}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
