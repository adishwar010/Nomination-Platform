import React, { useState, useEffect } from "react";
import "./Instdsat.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import logo1 from "../images/logo.png";
import VideoRecorder from "react-video-recorder";

const Instdsat = () => {
  let history = useHistory();
  useEffect(async () => {
    if (localStorage.getItem("token")) {
      const config = {
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      };
      try {
        const resp = await axios.get("/api/v1/dsat/checkslot", config);
        if (resp.data.data.isSlotTime == true) {
          
        } else {
          history.push("/signin");
        }
      } catch (err) {
        console.log(err.response.data.msg);
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      }
    } else {
      history.push("/");
    }
  });
  function check() {
    if (localStorage.getItem("token")) {
      history.push("/sidepanel");
    } else {
      history.push("/signin");
    }
  }

  function enter() {
    if (navigator.mozGetUserMedia) {
      navigator.myGetMedia = navigator.mozGetUserMedia;
      navigator.myGetMedia({ video: true }, connect, error);
    } else {
      alert("NO");
    }

    function connect(stream) {
      var video = document.getElementById("my_video");
      video.src = window.URL ? window.URL.createObjectURL(stream) : stream;
      video.play();

      var canvas = document.getElementById("c");
    }

    function error(e) {
      console.log(e);
    }
  }

  return (
    <div>
      {/* <VideoRecorder /> */}
      {/* <div className="container-fluid admn text-center">
        <div className="row  pt-2 ml-3 pb-2 ">
          <img src={logo1} />
          <span>Online Test</span>
        </div>
      </div> */}

      <div className="container-fluid"></div>

      <div className="container-fluid jass text-white text-center">
        <h2 className="pt-5">Online Test - A-DSAT</h2>
        <h5 className="pt-3">
          The A-DSAT Online Prerequisite Test for L2 & L3 Program
        </h5>
        <button
          type="button"
          class="btn btn-dark mt-3 text-dark "
          style={{
            background: "#FFFFFF",
            boxShadow: "0px 20px 35px rgba(14, 59, 125, 0.2)",
            borderRadius: "10px",
          }}
          onClick={check}
        >
          GET STARTED
        </button>
      </div>

      <div className="container-fluid">
        <h3
          className="text-center pt-3"
          style={{
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "35px",
          }}
        >
          ABOUT A-DSAT ONLINE TEST
        </h3>
        <div className="container">
          {/* <h6 style={{ fontSize: "18px" }}> */}
          <h6 className="text-center pt-3" style={{ fontSize: "18px" }}>
            Advanced Data Science Aptitude Test (A-DSAT) is the standard
            evaluation process to select the right candidate for learning Data
            Science. The A-DSAT is based on Sternberg Theory of intelligence and
            aims to evaluate "Analytical Intelligence of the candidate".
            Analytical Intelligence is the kind of intelligence which helps one
            to decipher complex scenarios and draw patterns out of it.
          </h6>
        </div>
      </div>

      <div className="container text-center">
        <h3
          className="text-center pt-3"
          style={{
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "40px",
          }}
        >
          GENERAL INSTRUCTION FOR A-DSAT
        </h3>
        <p className="pt-3" style={{ fontSize: "18px" }}>
          <b>Number of Question : </b> 25
        </p>
        <p style={{ fontSize: "18px" }}>
          <b>Positive Marks :</b> +4 Marks
        </p>
        <p style={{ fontSize: "18px" }}>
          <b>Negative Marks :</b> -1 Marks
        </p>
        <p style={{ fontSize: "18px" }}>
          <b>Time Limit :</b> 30 Minutes
        </p>
        <p style={{ fontSize: "18px" }}>
          <b>Total Marks :</b> 100
        </p>
      </div>

      <div className="container text-center">
        <h3
          className=" pt-4"
          style={{
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "35px",
          }}
        >
          A-DSAT ONLINE TEST INCLUDES
        </h3>
        <p className="pt-3" style={{ fontSize: "18px" }}>
          <b>Data Interpretation</b>
        </p>

        <p style={{ fontSize: "18px" }}>
          <b>Statistics and Probability</b>
        </p>

        <p style={{ fontSize: "18px" }}>
          <b>Integrated Reasoning</b>
        </p>

        <p style={{ fontSize: "18px" }}>
          <b>Business Understanding</b>
        </p>

        <p style={{ fontSize: "18px" }}>
          <b>Quantitative Aptitude</b>
        </p>
      </div>
    </div>
  );
};

export default Instdsat;
