import React, { useState, useEffect } from "react";
import logos from "../../../images/logo.png";
import { useHistory } from "react-router-dom";
import axios from "axios";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import swal from "sweetalert";

const UserSignup = () => {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [university, setUniversity] = useState("");
  const [emails, setEmails] = useState("");
  const [passwords, setPasswords] = useState("");
  const [branch, setBranch] = useState("");

  async function signUp(event) {
    if (event) {
      event.preventDefault();
    }
    let item = { name, email, phone, category, university, password, branch };
    console.warn(item);
    console.log(item);

    try {
      const res = await axios.post(`/api/v1/auth/signup`, item);
      localStorage.setItem("studtoken", res.data.data.token);
      console.log(res);
      swal(
        {
          title: "Successfully Registered",
          type: "success",
          confirmButtonColor: "#0E3B7D",
          confirmButtonText: "Ok",
          closeOnConfirm: true,
          customClass: "Custom_Cancel",
        },
        function (isConfirm) {
          if (isConfirm) {
            history.push("/alltest");
          } else {
            history.push("/alltest");
          }
        }
      );
    } catch (err) {
      console.log(err.response.data);
      if (err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      }
    }
  }

  function signIn(event) {
    if (event) {
      event.preventDefault();
    }
    let email = emails;
    let password = passwords;
    let items = { email, password };
    console.warn(items);
    axios
      .post("/api/v1/auth/login", items)
      .then((res) => {
        console.log(res);
        // console.log(res.data.data.token);
        localStorage.setItem("token", res.data.data.token);
      })
      .catch((err) => console.error(err));
    history.push("/Instdsat");
  }

  return (
    <>
      <div className="text-center">
        <img src={logos} />
      </div>
      <h3 className="mt-4 d-block d-sm-none ">Student Signup</h3>
      <h6 className="text-center bg-light pt-3 pb-3 d-block d-sm-none">
        Already have an account... <br />
        <button
          className="but mt-2"
          onClick={() => {
            history.push("/studentsignin");
          }}
        >
          Sign In
        </button>
      </h6>

      <div>
        <form className="form d-block d-sm-none" onSubmit={signUp}>
          <h2>Create Account</h2>
          <input
            type="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="mt-3 inp"
            required
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className=" inp"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className=" inp"
            required
          />
          <input
            type="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone No."
            className=" inp"
            required
          />
          <input
            type="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category:(Student/Professional)"
            className=" inp"
            required
          />
          <input
            type="university"
            name="university"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            placeholder="College/University Name"
            className=" inp"
            required
          />
          <input
            type="branch"
            name="branch"
            onChange={(e) => setBranch(e.target.value)}
            value={branch}
            placeholder="Branch"
            className=" inp"
            // required
          />
          <button className="but mt-2">SignUp</button>
        </form>
      </div>
      <div className="body1">
        <h3 className="mt-5 d-none d-sm-block">Student Signup Portal</h3>
        <div class="containers mt-2 d-none d-sm-block" id="containers">
          <div class="form-container sign-up-container">
            <form className="form" onSubmit={signUp}>
              <h2>Create Account</h2>
              <input
                type="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="mt-3 inp"
                required
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className=" inp"
                required
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className=" inp"
                required
              />
              <input
                type="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone No."
                className=" inp"
                required
              />
              <input
                type="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category:(Student/Professional)"
                className=" inp"
                required
              />
              <input
                type="university"
                name="university"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                placeholder="College/University Name"
                className=" inp"
                required
              />
              <input
                type="university"
                name="branch"
                onChange={(e) => setBranch(e.target.value)}
                value={branch}
                placeholder="Branch"
                className=" inp"
                required
              />
              <button
                className="but mt-2"
                // data-toggle="modal"
                // data-target="#exampleModalCenter"
              >
                SignUp
              </button>
            </form>
          </div>
          <div class="form-container sign-in-container">
            <form
              className="form"
              // onSubmit={signIn}
            >
              <h2>Sign In</h2>
              <p>Enter Your Details</p>
              {/* <div class="social-container">
                <a href="#" class="social">
                  <i class="fa fa-facebook"></i>
                </a>
                <a href="#" class="social">
                  <i class="fa fa-google"></i>
                </a>
                <a href="#" class="social">
                  <i class="fa fa-linkedin"></i>
                </a>
              </div>
              <span>or use your account</span> */}
              <input
                type="email"
                name="email"
                value={emails}
                placeholder="Email"
                onChange={(e) => setEmails(e.target.value)}
                className=" inp"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={passwords}
                onChange={(e) => setPasswords(e.target.value)}
                className=" inp"
                required
              />
              <a href="#">Forgot Your Password</a>

              <button className="but">Sign In</button>
            </form>
          </div>
          <div class="overlay-container d-none d-sm-block">
            <div class="overlay ">
              <div class="overlay-panel overlay-left ">
                <h2>Hello Students!</h2>
                <p>Create an account to connected with us</p>
                <button class="ghost but" id="signIn">
                  Sign Up
                </button>
              </div>
              <div class="overlay-panel overlay-right">
                <h2>Hello, Students!</h2>
                <p>Welcome to Student Portal Signup</p>
                <button
                  class="ghost but"
                  id="signUp"
                  onClick={() => {
                    history.push("/studentsignin");
                  }}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSignup;
