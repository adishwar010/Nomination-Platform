import React, { useState, useEffect } from "react";
import logo1 from "../images/logo.png";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddingQuestionRoute = () => {
  let history = useHistory();

  const logout = () => {
    localStorage.removeItem("questionAdd");
    history.push("/questionaddlogin");
  };

  useEffect(() => {
    if (localStorage.getItem("questionAdd")) {
    } else {
      history.push("/questionaddlogin");
    }
  });

  function questionDatabase() {
    history.push("/questiontable");
  }

  function addQuestion() {
    history.push("/addingquestions");
  }

  return (
    <>
      <div className="container-fluid admn">
        <div className="row  pt-2 ml-3 pb-2">
          <img src={logo1} />
        </div>
      </div>

      <div className="container mt-3 text-white">
        <button
          className="btn float-right"
          style={{ backgroundColor: "#0E3B7D", color: "white" }}
          onClick={logout}
        >
          Log Out
        </button>
      </div>

      <div className="text-center pt-5">
        <h1> Welcome to Question Adding Panel</h1>
        {/* <h5>Choose the option</h5> */}
      </div>

      <div className="container text-center mt-5">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div class="card text-center">
              <div class="card-header">Database</div>
              <div class="card-body">
                <h5 class="card-title">Questions Database</h5>
                <p class="card-text" style={{ fontSize: "17px" }}>
                  Check all the questions in the database
                </p>
                <button className="btn btn-danger " onClick={questionDatabase}>
                  Check Questions
                </button>
              </div>
              <div class="card-footer text-muted">Question</div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mt-4 mt-lg-0 mb-5 mb-lg-0">
            <div class="card text-center">
              <div class="card-header">Questions Adding</div>
              <div class="card-body">
                <h5 class="card-title">Add Question To The Database</h5>
                <p class="card-text" style={{ fontSize: "17px" }}>
                  Enter the question and its options etc. in detail....
                  <br />
                </p>
                <button className="btn btn-danger " onClick={addQuestion}>
                  Add Questions
                </button>
              </div>
              <div class="card-footer text-muted">Question</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddingQuestionRoute;
