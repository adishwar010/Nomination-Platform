import React, { useState, useEffect } from "react";
import logo1 from "../../images/logo.png";
import axios from "axios";
import { useHistory } from "react-router-dom";

const TestDetails = (props) => {
  let history = useHistory();
  const [testdetail, settestdetail] = useState([]);
  const [questionbank, setquestionbank] = useState([]);

  useEffect(async () => {
    if (localStorage.getItem("Admin")) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem("Admin")}`,
        },
      };
      try {
        const res = await axios.get(
          "/api/v1/admin/test/" + props.match.params.id,
          config
        );
        console.log(res.data.data.test);
        settestdetail(res.data.data.test);
        setquestionbank(res.data.data.test.questionBank);
      } catch (err) {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      }
    } else {
      history.push("/admin");
    }
  }, []);

  function questionHome() {
    history.push("/createbatch");
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
          onClick={questionHome}
        >
          Go Back
        </button>
      </div>

      <div className="container mt-5 pt-2 ">
        <h3>Test Details</h3>
        <div className="text-center border mt-4 py-3">
          <h5>
            Test Name :{" "}
            <span className="text-danger text-capitalize h6">
              {testdetail && testdetail.testName}
            </span>
          </h5>{" "}
          <br />
          <h5>
            Total Questions :{" "}
            <span className="text-danger text-capitalize h6">
              {testdetail && testdetail.numberOfQuestions}
            </span>{" "}
          </h5>
          <br />
          <h5>
            Marks Per Questions :{" "}
            <span className="text-danger text-capitalize h6">
              {testdetail && testdetail.marksPerQuestions}
            </span>
          </h5>
          <br />
          <h5>
            Negative Marks Per Questions :{" "}
            <span className="text-danger text-capitalize h6">
              {testdetail && testdetail.negativeMarksPerQuestion}
            </span>
          </h5>
        </div>
      </div>

      <div className="container mt-4 text-center">
        <button
          className="btn btn-danger"
          onClick={() => {
            history.push("/addquestionstest/" + props.match.params.id);
          }}
        >
          Add Questions
        </button>

        <button
          className="btn btn-danger ml-3"
          onClick={() => {
            history.push("/exceladdquestionstest/" + props.match.params.id);
          }}
        >
          Add From Excel
        </button>

        <button
          className="btn btn-success ml-3"
          onClick={() => {
            history.push("/testquestiondatabase/" + props.match.params.id);
          }}
        >
          See Questions Added
        </button>
      </div>
    </>
  );
};

export default TestDetails;
