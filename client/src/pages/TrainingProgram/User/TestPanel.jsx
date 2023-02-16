import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import logo1 from "../../../images/logo.png";

import SidePane from "../../../Components/SidePaneQuestions";
import axios from "axios";
import Question from "../../../Components/Question";
import Cameraweb from "../../../Components/Cameraweb";
import screenfull from "screenfull";
// const screenfull = require("screenfull");
// import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Screenfull from "screenfull-react";

import "sweetalert/dist/sweetalert.css";
import swal from "sweetalert";
import TestQuestions from "./TestQuestions";
import SidePaneTestQuestion from "./SidePaneTestQuestion";
// import Cameraweb from "../../../Components/Cameraweb";

const TestPanel = (props) => {
  let history = useHistory();

  // new added
  const [statusans, setstatusans] = useState([]);
  //

  const [questions, setQuestions] = useState([]);
  const [paper, setPaper] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [testduration, settestduration] = useState();
  const [responses, setresponses] = useState([]);

  const toggleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.request();
    }
  };

  useEffect(async () => {
    
    swal(
      {
        title: "Enter Fullscreen",
        text: "Don't try to exit fullscreen during test",
        type: "warning",
        confirmButtonColor: "#0E3B7D",
        confirmButtonText: "Ok",
        closeOnConfirm: true,
        allowEscapeKey: false,
        customClass: "Custom_Cancel",
      },
      function (isConfirm) {
        if (isConfirm) {
          toggleFullScreen();
        } else {
          window.location.reload();
        }
      }
    );
    // Cameraweb
    if (screenfull.isEnabled) {
      screenfull.on("change", () => {
        console.log(
          "Am I fullscreen?",
          screenfull.isFullscreen
            ? "Yes"
            : swal(
                {
                  title: "Do not exit fullscreen",
                  text: "Next time if you try to exit fullscreeen your test is automatically submitted!",
                  type: "warning",
                  confirmButtonColor: "#0E3B7D",
                  confirmButtonText: "Ok",
                  closeOnConfirm: true,
                  allowEscapeKey: false,
                  customClass: "Custom_Cancel",
                },
                function (isConfirm) {
                  if (isConfirm) {
                    toggleFullScreen();
                  } else {
                    window.location.reload();
                  }
                }
              )
        );
      });
    }
    if (localStorage.getItem("studtoken")) {
      // history.push("/instdsat");
      const config = {
        headers: {
          Authorization: `studtoken ${localStorage.getItem("studtoken")}`,
        },
      };
      try {
        const res = await axios.get(
          "/api/v1/test/" + props.match.params.id,
          config
        );
        console.log(res.data);
        console.log(res);

        console.log(res.data.data.paper.test.questionBank);

        console.log(res.data.data.paper.responses);
        setresponses(res.data.data.paper.responses);

        settestduration(res.data.data.paper.test.durationOfTest);

        const startedAt = new Date(res.data.data.paper.startedAt).getTime();
        console.log(startedAt);

        if (
          startedAt + res.data.data.paper.test.durationOfTest * 60 * 1000 <
          Date.now()
        ) {
          alert("Your time limit for the test has already exceeded");
          history.push("/testended");
        }

        setQuestions(res.data.data.paper.test.questionBank);
        //// new addition
        setstatusans(res.data.data.paper.responses);
        /////

        setPaper(res.data.data.paper);
      } catch (err) {
        console.log(err);
        // console.log(err.response.data.msg);
        // if (err.response && err.response.data) alert(err.response.data.message);
      }
    } else {
      history.push("/");
    }
  }, []);

  const onAnswer = (answer) => {
    let newData = [];
    for (let i = 0; i < questions.length; i++) {
      if (i == currentQuestion - 1) {
        newData.push({
          ...questions[i],
          answer,
        });
      } else {
        newData.push(questions[i]);
      }
    }
    setQuestions(newData);
  };

  const onSubmit = async () => {
    swal(
      {
        title: "Are you Sure",
        text: "You want to submit the test",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0E3B7D",
        confirmButtonText: "Yes",
        closeOnConfirm: true,
        allowEscapeKey: false,
        customClass: "Custom_Cancel",
      },
      async function (isConfirm) {
        if (isConfirm) {
          try {
            const config = {
              headers: {
                Authorization: `studtoken ${localStorage.getItem("studtoken")}`,
              },
            };
            await axios.get("/api/v1/test/submit/" + paper._id, config);
            swal({
              title: "Test Submitted Succesfully",
              text: "",
              type: "success",
              confirmButtonColor: "#0E3B7D",
              confirmButtonText: "Ok",
              closeOnConfirm: true,
              allowEscapeKey: false,
              customClass: "Custom_Cancel",
            });

            history.push("/testended");
          } catch (err) {
            console.log(err);
            if (err.response && err.response.data)
              alert(err.response.data.message);
          }
        } else {
        }
      }
    );
  };

  const nextButton = () => {
    if (currentQuestion == questions.length) {
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
    if (localStorage.getItem("studtoken")) {
      const config = {
        headers: {
          Authorization: `studtoken ${localStorage.getItem("studtoken")}`,
        },
      };
      axios
        .get("/api/v1/test/" + props.match.params.id, config)
        .then(function (res) {
          // console.log(res.data);
          // setQuestionsop(res.data.data.paper.questions);
          setstatusans(res.data.data.paper.responses);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  };

  const previousButton = () => {
    if (currentQuestion == 1) {
    } else {
      setCurrentQuestion(currentQuestion - 1);
    }
    if (localStorage.getItem("studtoken")) {
      const config = {
        headers: {
          Authorization: `studtoken ${localStorage.getItem("studtoken")}`,
        },
      };
      axios
        .get("/api/v1/test/" + props.match.params.id, config)
        .then(function (res) {
          // console.log(res.data);
          // setQuestionsop(res.data.data.paper.questions);
          setstatusans(res.data.data.paper.responses);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className="d-none">
        <button onClick={toggleFullScreen} id="buttonclk">
          Enter fullscreen
        </button>
      </div>

      {/* for mobile */}
      <div className="d-block d-sm-none">
        <div className="container-fluid   fix bg-white">
          <div className="row pt-2">
            <div className="col">
              <img src={logo1} />
            </div>
            <div className="col text-right">
              <div className=" pt-2">
                <i class="text-right fas fa-user-circle fa-3x"></i>
                <div className=" text-right pt-2"> </div>
              </div>
            </div>
          </div>
          <div className="container text-center">
            <h4 className="pt-3">Online Test
            
            </h4>
            <Cameraweb />
          </div>
          <div className="mt-3">
            <SidePaneTestQuestion
              setCurrentQuestion={setCurrentQuestion}
              startedAt={paper.startedAt}
              statusans={statusans}
              setstatusans={setstatusans}
              questions={questions}
              id={props.match.params.id}
              testduration={testduration}
            />
          </div>
          <div className="container-fluid mt-4">
            <div className="container  sem" id="ques1">
              <b>Q {currentQuestion}:</b>
              <TestQuestions
                onAnswer={onAnswer}
                question={questions[currentQuestion - 1]}
                paperId={paper._id}
                statusans={statusans}
                setstatusans={setstatusans}
                id={props.match.params.id}
                questionlength={questions}
              />
              {/* <Question
                onAnswer={onAnswer}
                question={questions[currentQuestion - 1]}
              /> */}
            </div>
          </div>

          <div className=" mb-3 mt-4">
            <div className="text-center">
              <button
                type="button"
                class="btn pre  text-white"
                onClick={previousButton}
              >
                Previous
              </button>
              <button
                type="button"
                class="btn pre  text-white ml-3 pl-4 pr-4"
                onClick={nextButton}
              >
                Next
              </button>
            </div>
            <div className="text-center mt-4">
              <button
                type="button"
                class="btn sub  text-white "
                onClick={onSubmit}
              >
                Submit Test
              </button>
            </div>
            <hr />
            <br />
            <div className="row text-center ">
              <div className="col">
                <i class="fas fa-circle circle3"></i> Answered
              </div>
              <div className="col">
                <i class="fas fa-circle circle4"></i> Not Answered
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-none d-sm-block">
        <div className="container-fluid fix bg-white fullscrn ">
          <div className="row pt-2">
            <div className="col-4">
              <img src={logo1} />
            </div>
            <div className="col-4 text-center">
              <h4 className="pt-3">Online Test</h4>
              <Cameraweb />
            </div>
            <div className="col float-right">
              <div className="row pt-2">
                <div className="col text-right pt-2">
                  {/* {" "}
                  {username}({useremail}) */}
                </div>
                <div className="col-2 text-right">
                  <i class="fas fa-user-circle fa-3x"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-8 ">
              <div class="row ">
                <div className="container-fluid ">
                  <div className="container-fluid scroll " id="ques">
                    <b>Q {currentQuestion}:</b>
                    <TestQuestions
                      onAnswer={onAnswer}
                      question={questions[currentQuestion - 1]}
                      paperId={paper._id}
                      statusans={statusans}
                      setstatusans={setstatusans}
                      id={props.match.params.id}
                      questionlength={questions}
                    />
                    {/* <Question
                      onAnswer={onAnswer}
                      question={questions[currentQuestion - 1]}
                    /> */}
                  </div>
                  <div className="jem d-flex justify-content-center fixed-bottom mb-3 ml-3 mr-3">
                    {/* <button type="button" class="btn rev  text-white">
                    Mark as Review
                  </button> */}
                    <button
                      type="button"
                      class="btn pre ml-5 text-white"
                      onClick={previousButton}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      class="btn pre  text-white ml-3 pl-4 pr-4"
                      onClick={nextButton}
                    >
                      Next
                    </button>

                    <button
                      type="button"
                      class="btn sub  text-white ml-5"
                      onClick={onSubmit}
                    >
                      Submit Test
                    </button>

                    <hr />
                    <br />
                    <div className="row text-center ">
                      {/* <div className="col ">
                      <i class="fas fa-circle circle1"></i> Current
                    </div>
                    <div className="col">
                      <i class="fas fa-circle circle2"></i> Not Attempted
                    </div> */}
                      <div className="col">
                        <i class="fas fa-circle circle3"></i> Answered
                      </div>
                      <div className="col">
                        <i class="fas fa-circle circle4"></i> Not Answered
                      </div>
                      {/* <div className="col">
                      <i class="fas fa-circle circle5"></i> Review
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4 ">
              {/* <SidePane
                setCurrentQuestion={setCurrentQuestion}
                startedAt={paper.startedAt}
                statusans={statusans}
                setstatusans={setstatusans}
              /> */}
              <SidePaneTestQuestion
                setCurrentQuestion={setCurrentQuestion}
                startedAt={paper.startedAt}
                statusans={statusans}
                setstatusans={setstatusans}
                questions={questions}
                id={props.match.params.id}
                testduration={testduration}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestPanel;
