import React, { useState, useEffect } from "react";
import logo1 from "../../images/logo.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
import DatalistInput from 'react-datalist-input';
import 'react-datalist-input/dist/styles.css';
import Creatable from 'react-select/creatable';

const Loader = () => <div className="loader"></div>;

const AddQuestion = (props) => {
  const [loading, setloading] = useState(false);
  function questionHome() {
    history.push("/testdetails/" + props.match.params.id);
  }

  const hideLoader = () => {
    setloading(false);
  };

  const showLoader = () => {
    setloading(true);
  };

  let history = useHistory();
  const [count, setcount] = useState(0);
  const [questionText, setquestionText] = useState("");
  const [quesImage, setquesImage] = useState("");
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
  const [questionBank, setquestionBank] = useState([]);
  // const [topics,settopics] = useState([]);
  // const [subtopics,setsubtopics] = useState([]);

  // Topic and Subtoic addition
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [topicsoptions, settopicoptions] = useState([]);
  const [subtopicsoptions, setsubtopicoptions] = useState([]);




  async function Onsubmit(event) {
    showLoader();
    if (event) {
      event.preventDefault();
    }
    const config = {
      headers: {
        Authorization: `Admin ${localStorage.getItem("Admin")}`,
      },
    };


    let img1url = "",
      img2url = "",
      img3url = "",
      img4url = "",
      questionImg = "";

    if (quesImage != "") {
      const formDataq = new FormData();
      formDataq.append("file", quesImage);
      console.log(formDataq);
      try {
        const resq = await axios.post(
          "/api/v1/admin/questions/image/add",
          formDataq,
          config
        );
        questionImg = resq.data.data.imageUrl;
      } catch (err) {
        console.log(err.response.data);
        if (err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        }
      }
    }

    if (option1Img != "") {
      const formData1 = new FormData();
      formData1.append("file", option1Img);
      console.log(formData1);
      try {
        const res1 = await axios.post(
          "/api/v1/admin/questions/image/add",
          formData1,
          config
        );
        img1url = res1.data.data.imageUrl;
      } catch (err) {
        console.log(err.response.data);
        if (err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        }
      }
    }

    if (option2Img != "") {
      const formData2 = new FormData();
      formData2.append("file", option2Img);
      console.log(formData2);
      try {
        const res2 = await axios.post(
          "/api/v1/admin/questions/image/add",
          formData2,
          config
        );
        img2url = res2.data.data.imageUrl;
      } catch (err) {
        console.log(err.response.data);
        if (err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        }
      }
    }

    if (option3Img != "") {
      const formData3 = new FormData();
      formData3.append("file", option3Img);
      console.log(formData3);
      try {
        const res3 = await axios.post(
          "/api/v1/admin/questions/image/add",
          formData3,
          config
        );
        img3url = res3.data.data.imageUrl;
      } catch (err) {
        console.log(err.response.data);
        if (err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        }
      }
    }

    if (option4Img != "") {
      const formData4 = new FormData();
      formData4.append("file", option4Img);
      console.log(formData4);
      try {
        const res4 = await axios.post(
          "/api/v1/admin/questions/image/add",
          formData4,
          config
        );
        img4url = res4.data.data.imageUrl;
      } catch (err) {
        console.log(err.response.data);
        if (err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        }
      }
    }

    console.log(img1url, img2url, img3url, img4url);

    let options = [
      { text: option1, imageUrl: img1url },
      { text: option2, imageUrl: img2url },
      { text: option3, imageUrl: img3url },
      { text: option4, imageUrl: img4url },
    ];
    let item = {
      questionText,
      questionImage: questionImg,
      options,
      answer,
      category,
      difficulty: difficultyLevel,
      topic,
      subtopic
    };
    console.log(item);
    try {
      const res = await axios.post(
        "/api/v1/admin/questions/add/" + props.match.params.id,
        item,
        config
      );
      console.log(res);
      alert("Question added");
      setcount(count + 1);
    } catch (err) {
      console.log(err.response.data);
      if (err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      }
      hideLoader();
    }
    hideLoader();
    setquestionText("");
    setquesImage("");
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
    event.target.reset();
  }

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
        // console.log(res.data.data.test.questionBank);
        setquestionBank(res.data.data.test.questionBank);
        const topi = [];
        const subtopi = [];
        res.data.data.test.questionBank.forEach((data) => {
          // topi.push(data.topic);
          topi.push({ label: data.topic, value: data.topic });
          subtopi.push({ label: data.subtopic, value: data.subtopic });
        });
        const topics = [...new Set(topi.map(JSON.stringify))].map(JSON.parse);
        // console.log(typeof (topics));

        const subtopics = [...new Set(subtopi.map(JSON.stringify))].map(JSON.parse);

        settopicoptions(topics);
        setsubtopicoptions(subtopics);

      } catch (err) {
        console.log(err);
        if (err.response && err.response.data) alert(err.response.data.message);
      }
    } else {
      history.push("/admin");
    }
  }, []);

  console.log("t", questionBank);
  // const topi = [];
  // const subtopi = [];
  // questionBank.forEach((data)=>{
  //   // topi.push(data.topic);
  //   topi.push({label: data.topic, value: data.topic });
  //   subtopi.push({label: data.subtopic, value: data.subtopic });
  // });

  // const topics = [...new Set(topi)]
  // const topics = [...new Set(topi.map(JSON.stringify))].map(JSON.parse);
  // console.log(typeof (topics))

  // const subtopics = [...new Set(subtopi.map(JSON.stringify))].map(JSON.parse);


  // settopicoptions(topi);
  // setsubtopicoptions(subtopics);
  console.log("topics", topicsoptions);
  console.log("subtopics", subtopicsoptions);


  function AppendSetdata(Value) {
    var present = false;
    for (let i = 0; i < topicsoptions.length; i++) {
      if (topicsoptions[i].value == Value) {
        present = true;
      }
    }
    if (!present) {
      var tempdata = topicsoptions;
      tempdata.push({ label: Value, value: Value });
      settopicoptions(tempdata);
    }
    setTopic(Value);
    // alert(topic);
  }

  function AppendSetSubTopics(Value) {
    var present = false;
    for (let i = 0; i < topicsoptions.length; i++) {
      if (topicsoptions[i].value == Value) {
        present = true;
      }
    }
    if (!present) {
      var tempdata = topicsoptions;
      tempdata.push({ label: Value, value: Value });
      setsubtopicoptions(tempdata);
    }
    setSubtopic(Value);
    // alert(topic);
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

      <div className="container-fluid pt-5 text-center">
        <h4>You have added : {count} Questions</h4>
      </div>

      <div className="container-fluid mt-4 mb-4">
        <div className="row">
          <div className="col border border-dark rounded ml-2 mr-2 pt-3 mb-3">
            <form onSubmit={Onsubmit}>
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
                <label for="Filequestion">
                  If Question have Image then put here........
                </label>
                <input
                  type="file"
                  class="form-control-file"
                  id="Filequestion"
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    setquesImage(e.target.files[0]);
                  }}
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
                      setoption1Img(e.target.files[0]);
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
                      setoption2Img(e.target.files[0]);
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
                      setoption3Img(e.target.files[0]);
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
                      setoption4Img(e.target.files[0]);
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
                    <option value="">Choose...</option>
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
                    required
                  >
                    <option>Choose...</option>
                    <option>Evaluation</option>
                    <option>Synthesis</option>
                    <option>Application</option>
                    <option>Analysis</option>
                    <option>Comprehension</option>
                    <option>Knowledge</option>
                  </select>
                </div>
                {/* <p>Topic</p>
                <select >
      {topics.map((o) => {
        const  name = o;
        return <option>{name}</option>;
      })}
    </select> */}

                {/* <Creatable
                  options={topicsoptions}
                onChange={(opt, meta) =>AppendSetdata(opt.value)}
                /> */}


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
                    <option value="">Choose...</option>
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
              {/* <label>
    Choose a browser from this list:
    <input list="browsers" name="myBrowser" />  
</label>   
<datalist id="browsers">
    {topics.map((o) => {
        const  name = o;
        return <option>{name}</option>;
      })}   
</datalist> */}



              <div className="row mt-5">
                <div className="col">
                  <label for="topic">
                    <h6>Topic:</h6>
                  </label>

                  {/* <input id="topic" className="form-control" type="text" value={topic} onChange={(e) => setTopic(e.target.value)} /> */}
                  <Creatable
                    options={topicsoptions}
                    onChange={(opt, meta) => AppendSetdata(opt.value)}
                  />
                </div>

                <div className="col">
                  <label for="subtopic">
                    <h6>Subtopic:</h6>
                  </label>
                  {/* <input id="subtopic" className="form-control" type="text" value={subtopic} onChange={(e) => setSubtopic(e.target.value)} /> */}
                  <Creatable
                    options={subtopicsoptions}
                    onChange={(opt, meta) => AppendSetSubTopics(opt.value)}
                  />
                </div>
              </div>

              <div className="text-danger">
                <label >
                  <h9>*If Topic/Subtopic not present in dropdown, please select it again after creating in dropdown*</h9>
                </label>
              </div>

              <div className="text-center mt-5 mb-5">
                <button
                  type="submit"
                  class="btn text-white"
                  style={{ backgroundColor: "#0E3B7D" }}
                //   onClick={Onsubmit}
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

      {loading ? <Loader /> : null}
    </>
  );
};

export default AddQuestion;
