import React, { useState, useEffect } from "react";
import "./AdminLogin.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "sweetalert/dist/sweetalert.css";
import swal from "sweetalert";

import logo1 from "../images/newLogo.png";
import logo2 from "../images/sail.png";
import logo3 from "../images/logo.png";
const AdminLogin = () => {
  let history = useHistory();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("Admin")) {
      
      history.push("/adminroutes");
    } else {
      // history.push("/admin");
    }
  });

  function Login() {
    let item = { username, password };
    console.warn(item);
    axios
      .post("/api/v1/admin/login", item)
      .then((res) => {
        console.log(res);
        localStorage.setItem("Admin", res.data.data.token);
        localStorage.setItem("Dept", res.data.dept);
        swal(
          {
            title: "SignIn Complete",
            text: "",
            type: "success",
            confirmButtonColor: "#0E3B7D",
            confirmButtonText: "Ok",
            closeOnConfirm: true,
            customClass: "Custom_Cancel",
          },
          function (isConfirm) {
            if (isConfirm) {
              history.push("/adminroutes");
            } else {
              history.push("/adminroutes");
            }
          }
        );
      })
      .catch((err) => {
        swal(
          {
            title: err.response.data.message,
            text: "",
            type: "warning",
            confirmButtonColor: "#0E3B7D",
            confirmButtonText: "Ok",
            closeOnConfirm: true,
            customClass: "Custom_Cancel",
          },
          function (isConfirm) {
            if (isConfirm) {
              window.location.reload();
            } else {
              window.location.reload();
            }
          }
        );
      });
  }
  return (
    <>
      <div class="sidenav">
        <div class="login-main-text">
          <h1>
            CGM
            <br /> Login Page <br /><br />
            
            <img src={logo2} className="mb-3" />
          </h1>
          <h5 className="pt-4">Login from here to access.</h5>
        </div>
      </div>
      <div class="main">
        <div class="col-md-6 col-sm-12 mb-5">
          <div class="login-form">
            <img src={logo1} className="mb-3" />
            <span> </span>
            <img src={logo3} className="mb-3" />
            <div class="form-group">
              <label>User Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="User Name"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                required
              />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              class="btn btn-black text-white"
              onClick={Login}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
