import React, { useState } from "react";
import "./Loginout.css";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { useAlert } from "react-alert";
// import PSDM_log from "../images/PSDM_logo.jpg";
import logos from "../images/logos.png";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import swal from "sweetalert";

const SignIn = () => {
  const [popup, setpopup] = useState({ show: false });
  const alerts = useAlert();
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

  function signUp(event) {
    if (event) {
      event.preventDefault();
    }
    let item = { name, email, phone, category, university, password, branch };
    console.warn(item);
    console.log(item);
    axios
      .post("/api/v1/auth/signup", item)
      .then((res) => {
        console.log(res);
        // localStorage.setItem("token", res.data.data.token);
        swal(
          {
            title: "Successfully Registered",
            text: "Best Of Luck!",
            type: "success",
            confirmButtonColor: "#0E3B7D",
            confirmButtonText: "Ok",
            closeOnConfirm: false,
            customClass: "Custom_Cancel",
          },
          function (isConfirm) {
            if (isConfirm) {
              window.location.replace("https://www.iitrpr.ac.in/aiupskilling");
            } else {
              window.location.replace("https://www.iitrpr.ac.in/aiupskilling");
            }
          }
        );
      })
      .catch((err) => console.error(err));
  }

  async function signIn(event) {
    if (event) {
      event.preventDefault();
    }
    let email = emails;
    let password = passwords;
    let items = { email, password };
    // console.warn(items);

    try {
      const res = await axios.post("/api/v1/auth/login", items);
      // console.log(res);
      localStorage.setItem("token", res.data.data.token);
      const config = {
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      };
      const resp = await axios.get("/api/v1/dsat/checkslot", config);
      // console.log(resp);
      const slot = resp.data.data.slotAlloted;
      // console.log(resp.data.data.slotAlloted);
      if (slot == false) {
        console.log("hey");
        swal(
          {
            title: "Slot Not Alloted",
            text: "You will be given a slot in the next phase",
            type: "warning",
            confirmButtonColor: "#0E3B7D",
            confirmButtonText: "Ok",
            closeOnConfirm: true,
            customClass: "Custom_Cancel",
          },
          function (isConfirm) {
            if (isConfirm) {
              setEmails("");
              setPasswords("");
            } else {
            }
          }
        );
      } else {
        if (resp.data.data.isSlotTime == true) {
          // console.log("in if");
          // console.log(resp.data.data.isSlotTime);
          history.push("/instdsat");
        } else {
          const slotstarttime = resp.data.data.slot.startTime;
          const slotendtime = resp.data.data.slot.endTime;
          var date = new Date(slotstarttime);

          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var dt = date.getDate();

          if (dt < 10) {
            dt = "0" + dt;
          }
          if (month < 10) {
            month = "0" + month;
          }

          var date1 = new Date(slotendtime);

          const time = new Date(date).toLocaleTimeString("en", {
            timeStyle: "short",
            hour12: true,
            timeZone: "IST",
          });
          const time2 = new Date(date1).toLocaleTimeString("en", {
            timeStyle: "short",
            hour12: true,
            timeZone: "IST",
          });

          // console.log(date);
          // console.log(resp.data.data.isSlotTime);
          swal(
            {
              title: "Please login in following date and time",
              text:
                dt +
                "-" +
                month +
                "-" +
                year +
                " " +
                "&" +
                " " +
                time +
                "-" +
                time2,
              type: "warning",
              confirmButtonColor: "#0E3B7D",
              confirmButtonText: "Ok",
              closeOnConfirm: true,
              customClass: "Custom_Cancel",
            },
            function (isConfirm) {
              if (isConfirm) {
                setEmails("");
                setPasswords("");
              } else {
              }
            }
          );
        }
      }
    } catch (err) {
      console.log(err.response.data);

      console.log(err.response.data.data.message);
      if (err.response.data && err.response.data.data.message) {
        alert(err.response.data.data.message);
      }
    }

    // axios
    //   .post("/api/v1/auth/login", items)
    //   .then((res) => {
    //     console.log(res);
    //     // console.log(res.data.data.token);
    //     localStorage.setItem("token", res.data.data.token);
    //     history.push("/instdsat");
    //   })
    //   .catch((err) => console.error(err));
  }

  return (
    <>
      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Modal title
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <img src={logos} />
      </div>
      <h3 className="mt-4 d-block d-sm-none ">A-DSAT Examination</h3>
      <h6 className="text-center bg-light pt-3 pb-3 d-block d-sm-none">
        Don't have an account... <br />
        <button
          className="but mt-2"
          onClick={() => {
            history.push("/");
          }}
        >
          Sign Up
        </button>
      </h6>
      <div>
        {/* //// */}
        <form className="form d-block d-sm-none" onSubmit={signIn}>
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
          <Link to="/resetpassword" className="text-primary ">
            <p className="pt-1">Forgot Your Password</p>
          </Link>
          <button className="but ">Sign In</button>
        </form>
        {/* //////// */}
      </div>
      <div className="body1">
        <h3 className="mt-5 d-none d-sm-block">A-DSAT Examination</h3>
        <div class="containers mt-2 d-none d-sm-block" id="containers">
          <div class="form-container sign-in-container">
            <form className="form" onSubmit={signUp}>
              <h2>Create Account</h2>
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
              <span>or use your email for registration</span> */}
              {/* <input type="text" name="name" placeholder="Name" /> */}
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
                Register for A-DSAT
              </button>
            </form>
          </div>
          <div class="form-container sign-up-container">
            <form className="form" onSubmit={signIn}>
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
              <Link to="/resetpassword" className="text-primary">
                Forgot Your Password
              </Link>

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
                <h2>Hello Students!</h2>
                <p>Create an account to give test</p>
                <button
                  class="ghost but"
                  id="signIn"
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
