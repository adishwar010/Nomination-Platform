import React, { useState, useEffect } from "react";
import AdminSidePanel from "../Components/AdminSidePanel";
import logo1 from "../images/logo.png";
import { useHistory } from "react-router-dom";
import axios from "axios";

const QuestionAdd = ({ testname, questno, marksques, negmarks }) => {
  let history = useHistory();
  const [count, setcount] = useState(0);
  const [questionText, setquestionText] = useState("");
  const [option1, setoption1] = useState("");
  const [option1Img, setoption1Img] = useState("");
  const [option2, setoption2] = useState("");
  const [option2Img, setoption2Img] = useState("");
  const [option3, setoption3] = useState("");
  const [option3Img, setoption3Img] = useState("");
  const [option4, setoption4] = useState("");
  const [option4Img, setoption4Img] = useState("");
  const [answer, setanswer] = useState("");
  const [category, setcategory] = useState("");
  
  const [difficultyLevel, setDifficultyLevel] = useState("");

  function Onsubmit(event) {
    // var imagefile = document.querySelector("#imag");
    // console.log(imagefile);
    if (event) {
      event.preventDefault();
    }
    let options = [
      { text: option1, imageUrl: option1Img },
      { text: option2, imageUrl: option2Img },
      { text: option3, imageUrl: option3Img },
      { text: option4, imageUrl: option4Img },
    ];
    let item = {
      questionText,
      options,
      answer,
      category,
      difficulty: difficultyLevel,
    };
    console.log(item);
    const config = {
      headers: {
        Authorization: `Admin ${localStorage.getItem("Admin")}`,
      },
    };
    axios
      .post("/api/v1/admin/questions/add", item, config)
      .then((res) => {
        // console.log(res);
        alert("Question added");
        setcount(count + 1);
        setquestionText("");
        setoption1("");
        setoption1Img("");
        setoption2("");
        setoption2Img("");
        setoption3("");
        setoption3Img("");
        setoption4("");
        setoption4Img("");
        setanswer("");
        setcategory("");
      })
      .catch((err) => {
        console.log(err.response.data);
        console.error(err);
      });

    // alert("Signin Complete");
    // history.push("/addingquestions");
  }

  useEffect(() => {
    if (localStorage.getItem("Admin")) {
      // history.push("/Instdsat");
    } else {
      history.push("/admin");
    }
  });
  function adminHome() {
    history.push("/adminroutes");
  }

  return (
    <>
      <div className="container-fluid admn">
        <div className="row  pt-2 ml-3 pb-2">
          <img src={logo1} />
        </div>
      </div>

      <div className="container-fluid pt-3 text-center">
        <h4>You have added : {count} Questions</h4>
      </div>

      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col border border-dark rounded ml-2 mr-2 pt-3 mb-3">
            <form>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">
                  <h5>Enter Your Question :</h5>
                </label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={questionText}
                  onChange={(e) => setquestionText(e.target.value)}
                  required
                ></textarea>
              </div>

              <div class="form-group">
                <label for="exampleFormControlFile1">
                  If Question have Image then put here........
                </label>
                <input
                  type="file"
                  class="form-control-file"
                  id="exampleFormControlFile1"
                />
              </div>

              {/* <h3>Enter Your Options :</h3> */}

              <div class="row mt-5 pl-2">
                <label for="op1">A :</label>
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    id="op1"
                    placeholder=""
                    value={option1}
                    onChange={(e) => setoption1(e.target.value)}
                    required
                  />
                </div>
                <div class="col">
                  <label for="imag">
                    If Option have Image then put here........
                  </label>
                  <input
                    type="file"
                    class="form-control-file"
                    id="imag"
                    name="file"
                    // onChange={(e) => console.log(e.target.files[0])}
                    onChange={(e) => {
                      console.log(e.target.files[0]);
                      const formData = new FormData();
                      formData.append("file", e.target.files[0]);
                      console.log(formData);
                      axios
                        .post("/api/v1/admin/questions/image/add", formData, {
                          headers: {
                            Authorization: `Admin ${localStorage.getItem(
                              "Admin"
                            )}`,
                            "Content-Type": "multipart/form-data",
                          },
                        })
                        .then((res) => {
                          console.log(res);
                          console.log(res.data.data.imageUrl);
                          setoption1Img(res.data.data.imageUrl);
                        })
                        .catch((err) => {
                          console.log(err);

                          if (err.response && err.response.data)
                            alert(err.response.data.message);
                        });
                    }}
                  />
                </div>
              </div>

              <div class="row mt-5 pl-2">
                <label for="op2">B :</label>
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    id="op2"
                    placeholder=""
                    value={option2}
                    onChange={(e) => setoption2(e.target.value)}
                    required
                  />
                </div>
                <div class="col">
                  <label for="File2">
                    If Option have Image then put here........
                  </label>
                  <input
                    type="file"
                    class="form-control-file"
                    id="File2"
                    onChange={(e) => {
                      console.log(e.target.files[0]);
                      const formData = new FormData();
                      formData.append("file", e.target.files[0]);
                      console.log(formData);
                      axios
                        .post("/api/v1/admin/questions/image/add", formData, {
                          headers: {
                            Authorization: `Admin ${localStorage.getItem(
                              "Admin"
                            )}`,
                            "Content-Type": "multipart/form-data",
                          },
                        })
                        .then((res) => {
                          console.log(res);
                          console.log(res.data.data.imageUrl);
                          setoption2Img(res.data.data.imageUrl);
                        })
                        .catch((err) => console.error(err));
                    }}
                  />
                </div>
              </div>

              <div class="row mt-5 pl-2">
                <label for="op3">C :</label>
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    id="op3"
                    placeholder=""
                    value={option3}
                    onChange={(e) => setoption3(e.target.value)}
                    required
                  />
                </div>
                <div class="col">
                  <label for="File3">
                    If Option have Image then put here........
                  </label>
                  <input
                    type="file"
                    class="form-control-file"
                    id="File3"
                    onChange={(e) => {
                      console.log(e.target.files[0]);
                      const formData = new FormData();
                      formData.append("file", e.target.files[0]);
                      console.log(formData);
                      axios
                        .post("/api/v1/admin/questions/image/add", formData, {
                          headers: {
                            Authorization: `Admin ${localStorage.getItem(
                              "Admin"
                            )}`,
                            "Content-Type": "multipart/form-data",
                          },
                        })
                        .then((res) => {
                          console.log(res);
                          console.log(res.data.data.imageUrl);
                          setoption3Img(res.data.data.imageUrl);
                        })
                        .catch((err) => console.error(err));
                    }}
                  />
                </div>
              </div>

              <div class="row mt-5 pl-2">
                <label for="op4">D :</label>
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    id="op4"
                    placeholder=""
                    value={option4}
                    onChange={(e) => setoption4(e.target.value)}
                    required
                  />
                </div>
                <div class="col">
                  <label for="File4">
                    If Option have Image then put here........
                  </label>
                  <input
                    type="file"
                    class="form-control-file"
                    id="File4"
                    onChange={(e) => {
                      console.log(e.target.files[0]);
                      const formData = new FormData();
                      formData.append("file", e.target.files[0]);
                      console.log(formData);
                      axios
                        .post("/api/v1/admin/questions/image/add", formData, {
                          headers: {
                            Authorization: `Admin ${localStorage.getItem(
                              "Admin"
                            )}`,
                            "Content-Type": "multipart/form-data",
                          },
                        })
                        .then((res) => {
                          console.log(res);
                          console.log(res.data.data.imageUrl);
                          setoption4Img(res.data.data.imageUrl);
                        })
                        .catch((err) => console.error(err));
                    }}
                  />
                </div>
              </div>

              <div class="row mt-5 pl-2">
                <div class="col">
                  <label for="ans">
                    <h6>Answer :</h6>
                  </label>
                  <select
                    class="form-control"
                    id="quescat"
                    value={answer}
                    onChange={(e) => setanswer(e.target.value)}
                    required
                  >
                    <option selected>Choose...</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
                <div class="col">
                  {/* <label for="exampleFormControlFile1">
                    If Answer have Image then put here........
                  </label>
                  <input
                    type="file"
                    class="form-control-file"
                    id="exampleFormControlFile1"
                  /> */}
                </div>
              </div>

              <div className="row mt-5">
                <div className="col">
                  <label for="difflvl">
                    <h6>Taxonomy :</h6>
                  </label>
                  <select
                    value={difficultyLevel}
                    onChange={(e) => setDifficultyLevel(e.target.value)}
                    class="form-control"
                    id="difflvl"
                  >
                    <option selected>Choose...</option>
                    <option>Evaluation</option>
                    <option>Synthesis</option>
                    <option>Application</option>
                    <option>Analysis</option>
                    <option>Comprehension</option>
                    <option>Knowledge</option>
                  </select>
                </div>
                <div className="col">
                  <label for="quescat">
                    <h6>Question Category :</h6>
                  </label>
                  <select
                    class="form-control"
                    id="quescat"
                    value={category}
                    onChange={(e) => setcategory(e.target.value)}
                    required
                  >
                    <option selected>Choose...</option>
                    <option value="Data Interpretation">
                      Data Interpretation
                    </option>
                    <option value="Statistics and Probability">
                      Statistics and Probability
                    </option>
                    <option value="Integrated Reasoning">
                      Integrated Reasoning
                    </option>
                    <option value="Business Understanding">
                      Business Understanding
                    </option>
                    <option value="Quantitative Aptitude">
                      Quantitative Aptitude
                    </option>
                  </select>
                </div>
              </div>

              <div className="row mt-5">
                <div className="col">
                  <label for="topic">
                    <h6>Topic:</h6>
                  </label>
                  <input id="topic" className="" type="text" />
                </div>
              </div>

              <div className="text-center mt-5 mb-5">
                <button
                  type="submit"
                  class="btn text-white"
                  style={{ backgroundColor: "#0E3B7D" }}
                  onClick={Onsubmit}
                >
                  Submit Question
                </button>
              </div>
            </form>
          </div>
          {/* <div className="col">
            <AdminSidePanel cnt={count} />
          </div> */}
        </div>
      </div>
      <div className="container text-center mt-5 mb-5">
        <button className="btn btn-danger" onClick={adminHome}>
          Go Back
        </button>
      </div>
    </>
  );
};

export default QuestionAdd;
