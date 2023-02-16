import React, { useEffect, useState } from "react";
import "./ReportCard.css";
import logo1 from "../images/logo.png";
import { Bar } from "react-chartjs-2";
import { useHistory } from "react-router-dom";
import axios from "axios";

const ReportCard = () => {
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
  const { correct, incorrect, notAttempted } = result;
  const logout = () => {
    localStorage.removeItem("token");
    history.push("/");
    window.location.reload(false);
  };
  const goback = () => {
    history.push("/finish");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // history.push("/Instdsat");
      const config = {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      };
      try {
        axios
          .all([
            axios.get("/api/v1/admin/result/dsat/generateResult", config),
            axios.get("/auth", config),
          ])
          .then(
            axios.spread((obj1, obj2) => {
              // Both requests are now complete
              console.log(obj1.data);
              // setcorrect(obj1.data.data.report.correct);
              // setincorrect(obj1.data.data.report.incorrect);
              // setnotattempted(obj1.data.data.report.notAttempted);
              settotal(obj1.data.data.report.totalQuestion);
              console.log(obj2.data);
              setuniversity(obj2.data.data.user.university);
              setusername(obj2.data.data.user.name);
              setuseremail(obj2.data.data.user.email);
              setphone(obj2.data.data.user.phone);
              setResult(obj1.data.data.report);
            })
          );
        // console.log(res.data);
        // console.log(res.data.data.report.correct);
        // console.log(res.data.data.report.incorrect);
        // console.log(res.data.data.report.notAttempted);
        // console.log(res.data.data.report.totalQuestion);
      } catch (err) {
        console.log(err);
      }
    } else {
      history.push("/");
    }
  }, []);

  return (
    <>
      <div className="border container border-dark mt-3 mb-3 rounded">
        <div className="container-fluid ">
          <div className="row  mt-3">
            <div className="col-4">
              <img src={logo1} />
            </div>
            <div className="col-8">
              <h3 className="pl-4 pt-3 text-left ">DSAT - The Online Test</h3>
            </div>
          </div>
        </div>

        <div className="container-fluid status mt-3">
          <h5 className="text-center pt-2 pb-2">
            Result Status of DSAT Online Test
          </h5>
        </div>

        <div className="container-fluid text-center mt-4">
          <h5>
            Name : {""}
            <span className="text-danger" style={{ fontSize: "22px" }}>
              {username}
            </span>
          </h5>
          <h5>
            Institution : {""}
            <span className="text-danger" style={{ fontSize: "22px" }}>
              {university}
            </span>
          </h5>
          <h5>
            Email : {""}
            <span className="text-danger" style={{ fontSize: "22px" }}>
              {useremail}
            </span>
          </h5>
          <h5>
            Contact No. : {""}
            <span className="text-danger" style={{ fontSize: "22px" }}>
              {phone}
            </span>
          </h5>
          <h5>Result :</h5>
        </div>

        <div className="container mt-5">
          <div className="row text-center">
            <div className="col">
              <div className="box1 pt-3">
                <div className="smallbox1 p-1">{correct}</div>
                <br />
                Correct
              </div>
            </div>
            <div className="col">
              <div className="box2 pt-3">
                <div className="smallbox2 p-1">{incorrect}</div>
                <br />
                Incorrect
              </div>
            </div>
            <div className="col">
              <div className="box3 pt-3">
                <div className="smallbox3 p-1">{notAttempted}</div>
                <br />
                Not Attempted
              </div>
            </div>
            <div className="col">
              <div className="box4 pt-3">
                <div className="smallbox4 p-1">{result.totalQuestion}</div>
                <br />
                Total
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div className="container">
            <Bar
              data={{
                labels: [
                  "Data Interpretation ",
                  "Statistics and Probability",
                  "Integrated Reasoning",
                  "Business Understanding",
                  "Quantitative Aptitude",
                ],

                datasets: [
                  {
                    // label: "",
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              width={100}
              height={300}
              options={{
                maintainAspectRatio: false,
                indexAxis: "y",
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}

              // options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>

        <div className="container text-center mt-5  pb-5">
          <button className="btn resdwn text-white mr-3" onClick={goback}>
            Go Back
          </button>
          <button className="btn resdwn text-white mr-3">Download</button>
          <button className="btn resdwn text-white" onClick={logout}>
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default ReportCard;
