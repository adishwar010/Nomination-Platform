import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import logo1 from "../../../images/logo.png";
import hardcode from "../../../images/hardcoded.png";
import axios from "axios";
import ReportStudent from './ReportStudent.jsx';
import "./resultWithQuestions.css";

const ResultWithQuestions = (props) => {
  let history = useHistory();
  const [questionResponses, setquestionResponses] = useState([]);
  const [test, settest] = useState([]);
  const [report, setReport] = useState({});
  const [flag, setFlag] = useState([]);

  const img = {
    'display': 'flex',
    'justify-content': 'center',
  }
  const styles = {
    
  }

  useEffect(() => {
    async function getData() {
      if (localStorage.getItem("studtoken")) {
        const config = {
          headers: {
            Authorization: `studtoken ${localStorage.getItem("studtoken")}`,
          },
        };
        try {
          const res = await axios.get(
            "/api/v1/test/result/" + props.match.params.id,
            config
          );
          // console.log("id",props.match.params.id);
          // console.log(`/api/v1/report/${props.match.params.id}`)
          const reportData = await axios.get(
            `/api/v1/report/${props.match.params.id}` ,
            config
          );

          

          setReport(reportData.data.data);
          console.log("report",reportData);
          // console.log("res = ", res.data);
          console.log(res);

          console.log(res.data.data.questionResponses);
          setquestionResponses(res.data.data.questionResponses);
          settest(res.data.data.test);
        } catch (err) {
          console.log(err);
          // alert("Test Is Not attempted");
        }
      } else {
        history.push("/");
      }
    }
    getData();
  }, []);

  return (
    <>
      <div className="container-fluid">
        {/* For Mobile */}
        <div className="d-block d-sm-none">
          <div className="row pt-2">
            <div className="col">
              <img src={logo1} />
            </div>
            <div className="col text-right">
              <div className=" pt-2">
                <i class="fas fa-arrow-circle-left fa-2x"></i>
                <div className=" text-right pt-2"> { }</div>
                <div
                  onClick={() => {
                    localStorage.removeItem('SubTopicName');
                    history.push("/alltest");
                  }}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  Back
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-none d-sm-block">
          <div className="row pt-2 container-fluid">
            <div className="col-4">
              <img src={logo1} />
            </div>
            <div className="col-4 text-center">
              <h3 className="text-capitalize pt-3 pl-5 ">
                Module : {localStorage.getItem('SubTopicName')}  <br />
              </h3>
              <h3 className="text-capitalize pt-3 pl-5 ">
                {test && test.testName} Result <br />
              </h3>
            </div>


            <div className="col float-right">
              <div className="row pt-2">
                <div className="col text-right pt-2"> { }</div>
                <div className="col-2 text-right">
                  <i class="fas fa-arrow-circle-left fa-2x"></i>
                  {/* <i class="fas fa-home fa-2x"></i> */}
                  <div
                    onClick={() => {
                      localStorage.removeItem('SubTopicName')
                      history.push("/alltest");
                    }}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    Back
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div class="img">
          <img src={hardcode} alt='img' style={styles} />
        </div> */}
        <br />
        <div class="styles">
        
          <h2>----Assessment Report----</h2>
          <h4>Congratulations</h4>
          <p>You've cleared {test && test.testName} from {localStorage.getItem('SubTopicName')}</p>
          
        </div>
        <ReportStudent reportData={report} />

        <div className="container ">

          <h3 className="text-capitalize pt-3 pl-5 ">
            {/* Module : {localStorage.getItem('SubTopicName')}  <br /> */}
          </h3>
          <h3 className="text-capitalize d-block d-sm-none">
            {test && test.testName} Result <br />
          </h3>
          {/* <h5 className="pt-3">
            Questions with correct answer and the answer you marked............
          </h5> */}
        </div>
        {/* <div className="container mb-5">
          {questionResponses &&
            questionResponses.map((stp, index) => (
              <div>
                <div
                  class="card mt-4  px-3 py-4 "
                  style={{ border: "2px solid black", borderRadius: "20px" }}
                >
                  <b className="h5">
                    Q{index + 1}: <pre>{stp.text}</pre>
                  </b>
                  <div className="p-2">
                    A : {stp.A.text} <br />B : {stp.B.text} <br />C :{" "}
                    {stp.C.text} <br />D : {stp.D.text} <br />
                    <h6 className="text-success mt-3">
                      Correct Answer : {stp.answer}
                    </h6>
                    <h6 className="text-danger">
                      Your Marked Answer : {stp.answeredByUser}
                    </h6>
                  </div>
                </div>
              </div>
            ))}
        </div> */}
        <div class="card">
          <div class="card-header">
            <h4>Sampling</h4>
          </div>
          <div class="card-body">
            <h4 class="card-title">You are able to understand and apply sampling techniques</h4>
            <h4 class="card-text">Evaluated On</h4>
            <ol>
            <li><h4 class="card-text">Apply : 1/1</h4></li>
            <li><h4 class="card-text">Knowledge : 0/0</h4></li>
            <li><h4 class="card-text">Synthesis: 0/0</h4></li>
            <li><h4 class="card-text">Evaluation : 0/0</h4></li>
            </ol>
          </div>
        </div>
        <br />
        <div class="card">
          <div class="card-header">
            <h4>Numerical Data</h4>
          </div>
          <div class="card-body">
            <h4 class="card-title">You are able to understand and apply numerical techniques</h4>
            <h4 class="card-text">Evaluated On</h4>
            <ol>
            <li><h4 class="card-text">Apply : 0/0</h4></li>
            <li><h4 class="card-text">Knowledge : 4/4</h4></li>
            <li><h4 class="card-text">Synthesis: 0/0</h4></li>
            <li><h4 class="card-text">Evaluation : 0/0</h4></li>
            </ol>
          </div>
        </div>
        <br />
        
      </div>
    </>
  );
};

export default ResultWithQuestions;
