import React, { useEffect, useState } from "react";
import logo1 from "../../../images/logo.png";
import { useHistory } from "react-router-dom";
import axios from "axios";

const DetailResult = () => {
  let history = useHistory();
  // const [correct, setcorrect] = useState("");
  // const [incorrect, setincorrect] = useState("");
  // const [notattempted, setnotattempted] = useState("");
  const [total, settotal] = useState("");

  const [username, setusername] = useState("");
  const [useremail, setuseremail] = useState("");
  const [phone, setphone] = useState("");
  const [university, setuniversity] = useState("");
  const [result, setResult] = useState({
    correct: 0,
    incorrect: 0,
    notAttempted: 0,
    total: 0,
  });
  const logout = () => {
    localStorage.removeItem("studtoken");
    history.push("/studentsignin");
  };
  const goback = () => {
    history.push("/alltest");
  };

  return (
    <>
      <div className="border container border-dark mt-3 mb-3 rounded">
        <div className="container-fluid ">
          <div className="row  mt-3">
            <div className="col-4">
              <img src={logo1} />
            </div>
            <div className="col-8">
              <h3 className="pl-4 pt-3 text-left ">Online Test : Test Name</h3>
            </div>
          </div>
        </div>

        <div className="container-fluid status mt-3">
          <h5 className="text-center pt-2 pb-2">Online Test</h5>
        </div>

        <div className="container-fluid text-center mt-4">
          <h5>
            Total Marks : {""}
            <span className="text-danger" style={{ fontSize: "22px" }}>
              {}
            </span>
          </h5>
          <h5>Marks Obtained :</h5>
        </div>

        <div className="container mt-5">
          <div className="row text-center">
            <div className="col">
              <div className="box1 pt-3">
                <div className="smallbox1 p-1">{}</div>
                <br />
                Correct
              </div>
            </div>
            <div className="col">
              <div className="box2 pt-3">
                <div className="smallbox2 p-1">{}</div>
                <br />
                Incorrect
              </div>
            </div>
            <div className="col">
              <div className="box3 pt-3">
                <div className="smallbox3 p-1">{}</div>
                <br />
                Not Attempted
              </div>
            </div>
            <div className="col">
              <div className="box4 pt-3">
                <div className="smallbox4 p-1">{}</div>
                <br />
                Total
              </div>
            </div>
          </div>
        </div>

        <div className="container text-center mt-5  pb-5">
          <button className="btn resdwn text-white mr-3" onClick={goback}>
            Go Back
          </button>
          <button className="btn resdwn text-white" onClick={logout}>
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default DetailResult;
