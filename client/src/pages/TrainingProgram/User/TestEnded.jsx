import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import logo1 from "../../../images/logo.png";

const TestEnded = () => {
  let history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("studtoken")) {
    } else {
      history.push("/");
    }
  });

  const logout = () => {
    history.push("/alltest");
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
          <p class="lead">Your test result will be declared soon.....</p>
          <button onClick={logout} class="btn logp text-white ">
            Home
          </button>
        </div>
      </div>
    </>
  );
};

export default TestEnded;
