import React, { useEffect } from "react";
import "./Endtest.css";
import logo1 from "../images/logo.png";

const Endtest = ({ history }) => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      // history.push("/Instdsat");
    } else {
      history.push("/");
    }
  });

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/");
    window.location.reload(false);
  };

  return (
    <>
      <div className="container-fluid admn">
        <div className="row  pt-2 ml-3 pb-2">
          <img src={logo1} />
        </div>
      </div>

      <div className="container-fluid">
        <div class="jumbotron text-center bg-white mt-2">
          <h1 class="">Congratulations ! </h1>
          <i class="fas fa-check-circle fa-7x icon-cog mt-4"></i>
          <h5 className="mt-5">Your test is Submitted</h5>
          <p class="lead">
            You will get your result on your registered email-id shortly.....
          </p>
          <button onClick={logout} class="btn logp text-white">
            Home
          </button>
        </div>
      </div>
    </>
  );
};

export default Endtest;
