import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import logos from "../images/logos.png";
import "sweetalert/dist/sweetalert.css";
import swal from "sweetalert";

const ResetPassword = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");

  async function reset(event) {
    if (event) {
      event.preventDefault();
    }
    let item = { email };
    // console.warn(item);
    // console.log(item);
    try {
      const res = await axios.post("/api/v1/auth/reset/resetPassword", item);
      // console.log(res);
      swal(
        {
          title: "Mail Sent",
          text: "Check your mail for next steps",
          type: "success",
          confirmButtonColor: "#0E3B7D",
          confirmButtonText: "Ok",
          closeOnConfirm: true,
          customClass: "Custom_Cancel",
        },
        function (isConfirm) {
          if (isConfirm) {
            history.push("/signin");
          } else {
            history.push("/signin");
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

  return (
    <>
      <div className="text-center">
        <img src={logos} />
      </div>
      <h3 className="mt-2 ">A-DSAT Password Reset</h3>

      <div class="container padding-bottom-3x mb-2 mt-3 ">
        <div class="row justify-content-center ">
          <div class="col-lg-8 col-md-10 shadow p-4 rounded">
            <div class="forgot">
              <h4>Forgot your password?</h4>
              <p>
                Change your password in two easy steps. This will help you to
                secure your password!
              </p>
              <ol class="list-unstyled">
                <li>
                  <span class="text-primary text-medium">1. </span>Enter your
                  email address below.
                </li>
                <li>
                  <span class="text-primary text-medium">2. </span>Our system
                  will send you instructions to reset your password.
                </li>
              </ol>
            </div>
            <form class="card mt-4">
              <div class="card-body">
                <div class="form-group">
                  {" "}
                  <label for="email-for-pass">
                    Enter your email address
                  </label>{" "}
                  <input
                    class="form-control"
                    type="text"
                    id="email-for-pass"
                    required
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <small class="form-text text-muted">
                    Enter the email address you used during the registration of
                    A-DSAT. Then we'll email a link to this address.
                  </small>{" "}
                </div>
              </div>
              <div class="card-footer">
                {" "}
                <button class="btn btn-success" onClick={reset}>
                  Get New Password
                </button>{" "}
                <button
                  class="btn btn-danger"
                  onClick={() => {
                    history.push("/signin");
                  }}
                >
                  Back to Login
                </button>{" "}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
