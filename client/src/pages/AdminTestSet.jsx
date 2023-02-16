import React, { useState, useEffect } from "react";
import logo1 from "../images/logo.png";
import QuestionAdd from "./QuestionAdd";
import { useHistory } from "react-router-dom";
import axios from "axios";

const AdminTestSet = () => {
  let history = useHistory();

  const [testName, settestName] = useState("");
  const [numberOfQuestions, setnumberOfQuestions] = useState("");
  const [marksPerQuestion, setmarksPerQuestion] = useState("");
  const [negativeMarksPerQuestion, setnegativeMarksPerQuestion] = useState("");

  useEffect(() => {
    if (localStorage.getItem("Admin")) {
      // history.push("/Instdsat");
    } else {
      history.push("/admin");
    }
  }, []);

  ////
  // "testName":"DSAT",
  // "numberOfQuestions":25,
  // "marksPerQuestion":1.0,
  // "negativeMarksPerQuestion":0.25,
  // "questionBank":[]
  ///

  const setQuestionHandle = () => {
    let questionBank = [];
    let item = {
      testName,
      numberOfQuestions,
      marksPerQuestion,
      negativeMarksPerQuestion,
      questionBank,
    };
    // console.log(item);
    const config = {
      headers: {
        Authorization: `Admin ${localStorage.getItem("Admin")}`,
      },
    };
    axios
      .post("/api/v1/admin/test/create", item, config)
      .then((res) => {
        // console.log(res);
        <QuestionAdd
          testname={testName}
          questno={numberOfQuestions}
          marksques={marksPerQuestion}
          negmarks={negativeMarksPerQuestion}
        />;
        history.push("/addingquestions");
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="container-fluid admn">
        <div className="row  pt-2 ml-3 pb-2">
          <img src={logo1} />
        </div>
      </div>

      <div className="container mt-5 border pt-4 pb-5 shadow-sm">
        <h2>SET TEST</h2>
        <div class="form-row mt-4">
          <div class="form-group col-md-6">
            <label for="testname">
              <h5>Test Name :</h5>
            </label>
            <input
              type="text"
              class="form-control"
              id="testname"
              placeholder="Enter Test Name"
              value={testName}
              onChange={(e) => settestName(e.target.value)}
              required
            />
          </div>
          <div class="form-group col-md-6">
            <label for="questno">
              <h5>Number Of Questions Test contain :</h5>
            </label>
            <input
              type="text"
              class="form-control"
              id="questno"
              placeholder="Enter no. of questions"
              value={numberOfQuestions}
              onChange={(e) => setnumberOfQuestions(e.target.value)}
              required
            />
          </div>
        </div>

        <div class="form-row mt-3">
          <div class="form-group col-md-6">
            <label for="markspques">
              <h5>Marks Per Question :</h5>
            </label>
            <input
              type="text"
              class="form-control"
              id="markspques"
              placeholder="Enter Marks Per Questions"
              value={marksPerQuestion}
              onChange={(e) => setmarksPerQuestion(e.target.value)}
              required
            />
          </div>
          <div class="form-group col-md-6">
            <label for="negmarks">
              <h5>Negative Marks Per Question :</h5>
            </label>
            <input
              type="text"
              class="form-control"
              id="negmarks"
              placeholder="Enter Negative Marking"
              value={negativeMarksPerQuestion}
              onChange={(e) => setnegativeMarksPerQuestion(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="text-center mt-4">
          <button class="btn btn-danger" onClick={setQuestionHandle}>
            Set Questions
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminTestSet;
