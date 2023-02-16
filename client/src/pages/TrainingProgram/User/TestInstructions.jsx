import React, { useState, useEffect } from "react";
import logos from "../../../images/logo.png";
import axios from "axios";
import { useHistory } from "react-router-dom";

const TestInstructions = (props) => {
  let history = useHistory();
  const [testdetail, settestdetail] = useState("");
  const [password,setPassword] = useState("");

  const styles = {
    'display' : 'flex',
    'justify-content' : 'center',
  }

  useEffect(async () => {
    if (localStorage.getItem("studtoken")) {
      const config = {
        headers: {
          Authorization: `studtoken ${localStorage.getItem("studtoken")}`,
        },
      };
      try {
        const res = await axios.get(
          "/api/v1/test/info/" + props.match.params.id,
          config
        );

        console.log("res: ",res);
        settestdetail(res.data.data.test);
      } catch (err) {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      }
    } else {
      history.push("/");
    }
  }, []);

  function check() {
    console.log("Password : " ,password);
    if(testdetail.password === password){
      if (localStorage.getItem("studtoken")) {
        history.push("/test/" + props.match.params.id);
      } else {
        //   history.push("/signin");
      }
    }else{
      alert("Enter Valid password");
    }
  }

  return (
    <>
      <div className="container-fluid jass text-white text-center">
        <h2 className="pt-5 text-capitalize">
          Online Test - {testdetail && testdetail.testName}
        </h2>
        <button
          type="button"
          class="btn btn-dark mt-5 text-dark "
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

      <div className="password" style={styles}>
      <input type="password" placeholder="Password" 
      value={password}
      onChange={(e)=>setPassword(e.target.value)}/>
      </div>

      <div className="container text-center">
        <h5
          className="text-center pt-3 text-uppercase"
          style={{
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "33px",
          }}
        >
          GENERAL INSTRUCTION FOR : {testdetail && testdetail.testName}
        </h5>
        <p className="pt-3" style={{ fontSize: "18px" }}>
          <b>Number of Question : </b>{" "}
          {testdetail && testdetail.numberOfQuestions}
        </p>
        <p style={{ fontSize: "18px" }}>
          <b>Positive Marks :</b> {testdetail && testdetail.marksPerQuestions}{" "}
          Marks
        </p>
        <p style={{ fontSize: "18px" }}>
          <b>Negative Marks :</b>{" "}
          {testdetail && testdetail.negativeMarksPerQuestion} Marks
        </p>
        <p style={{ fontSize: "18px" }}>
          <b>Time Limit :</b> {testdetail && testdetail.durationOfTest} Minutes
        </p>
      </div>
    </>
  );
};

export default TestInstructions;
