import React, { useState, useEffect } from "react";
import logo1 from "../../../images/logo.png";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import l2prog from "../../../images/module.png";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import swal from "sweetalert";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ModuleTest = (props) => {
  let history = useHistory();
  const [test, settest] = useState([]);
  const [username, setusername] = useState("");
  const [subtopicname, setsubtopicname] = useState([]);
  const [events, setevents] = useState([]);

  function userHome() {
    history.push("/userdashboard");
  }

  const badage = (index) => {
    if (index == 0) {
      return <div class="position-absolute badge badge-danger m-2">New</div>;
    }
  };

  const getExpirationDate = (jwtToken) => {
    if (!jwtToken) {
      return null;
    }

    const jwt = JSON.parse(atob(jwtToken.split(".")[1]));

    // multiply by 1000 to convert seconds into milliseconds
    const expdatetime = new Date(jwt && jwt.exp && jwt.exp * 1000);
    const time = new Date(expdatetime).toLocaleTimeString("en", {
      timeStyle: "short",
      hour12: true,
      timeZone: "IST",
    });

    return expdatetime || null;
  };

  const isExpired = (exp) => {
    if (!exp) {
      return false;
    }

    return Date.now() > exp;
  };

  const logout = () => {
    localStorage.removeItem("studtoken");
    history.push("/studentsignin");
  };

  useEffect(async () => {
    if (localStorage.getItem("studtoken")) {
      const exp = isExpired(
        getExpirationDate(localStorage.getItem("studtoken"))
      );
      console.log(exp);
      if (exp == true) {
        swal(
          {
            title: "Session Expired",
            text: "Please Login again !!",
            type: "warning",
            confirmButtonColor: "#0E3B7D",
            confirmButtonText: "Ok",
            closeOnConfirm: true,
            customClass: "Custom_Cancel",
          },
          function (isConfirm) {
            if (isConfirm) {
              logout();
            } else {
            }
          }
        );
      }
      profile();
      const config = {
        headers: {
          Authorization: `studtoken ${localStorage.getItem("studtoken")}`,
        },
      };
      try {
        const res = await axios.get(
          "/api/v1/test/subtopics/" + props.match.params.id,
          config
        );
        console.log(res);
        setsubtopicname(res.data.data.subtopic.name);
        setevents(res.data.data.subtopic.events);
      } catch (err) {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      }
    } else {
      history.push("/studentsignup");
    }
  }, []);

  function timed(lp) {
    var date = new Date(lp);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return date.toString().slice(4, 16) + strTime;
  }

  const timedline = (lp) => {
    var utcDate = new Date(lp);

    console.log(utcDate.toString());
    return utcDate.toString().slice(4, 16);
  };

  function profile() {
    axios
      .get("/api/v1/auth", {
        headers: {
          Authorization: `studtoken ${localStorage.getItem("studtoken")}`,
        },
      })
      .then((res) => {
        setusername(res.data.data.user.name);
        // console.log(res.data.data.user);
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <div className="d-block d-sm-none">
        <div className="row pt-2">
          <div className="col">
            <img src={logo1} />
          </div>
          <div className="col text-right">
            <div className=" pt-2">
              <i class="text-right fas fa-user-circle fa-3x"></i>
              <div className=" text-right pt-2"> {username}</div>
              <div
                onClick={logout}
                style={{ cursor: "pointer", color: "blue" }}
              >
                Logout
              </div>
            </div>
          </div>
        </div>
        <div className="container text-center">
          <h4 className="pt-3">Student Dashboard</h4>
        </div>
      </div>

      <div className="d-none d-sm-block container">
        <div className="row pt-2 ">
          <div className="col-4">
            <img src={logo1} />
          </div>
          <div className="col-4 text-center">
            <h5 className="pt-3 ">Student Dashboard</h5>
          </div>
          <div className="col float-right">
            <div className="row pt-2">
              <div className="col text-right pt-2"> {username}</div>
              <div className="col-2 text-right">
                <i class="fas fa-user-circle fa-3x"></i>
                <div
                  onClick={logout}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  Logout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container ">
        <h6 className="pt-3 pb-2">
          <Link to="/alltest" className="h6">
            All Modules
          </Link>{" "}
          {">>"} <b>{subtopicname}</b>
        </h6>
      </div>

      <div className="container mt-3">
        <div
          class="card w-100"
          style={{
            backgroundColor: "#180D5B",
            color: "white",
            border: "2px solid #180D5B",
            borderRadius: "10px",
          }}
        >
          <div class="card-body">
            <div className="row">
              <div className="col d-flex align-items-center justify-content-center">
                <h3>{subtopicname}</h3>
              </div>
              <div className="col d-flex justify-content-end">
                <img
                  src={l2prog}
                  alt="program Image"
                  height="190px"
                  width="290px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 mb-4 container">
        <div className="row">
          <div className="col-lg-9 col-12 order-12 order-lg-0">
            {events &&
              events.map((stp, index) => (
                <div>
                  {/* <br />
                  <br />
                  {timedline(stp.createdAt)} */}
                  <div
                    class="card mt-4   "
                    style={{ border: "2px solid black", borderRadius: "20px" }}
                  >
                    <div class="card-body row">
                      <div className="col ">
                        <p class="card-text ">
                          <h5>Quiz No : {index + 1}</h5>
                        </p>
                      </div>
                      <div className="col d-flex justify-content-end">
                        <p class="card-text " style={{ color: "#180D5B" }}>
                          <h6>Start Date : {timed(stp.startTime)}</h6>
                          <h6>End Date : {timed(stp.endTime)}</h6>
                        </p>
                      </div>
                    </div>
                    <div className="row mb-3 px-3">
                      <div className="col" style={{ color: "green" }}>
                        <i
                          class="fa fa-check-circle fa-2x"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div className="col d-flex justify-content-end">
                        <button
                          className="btn btn-info mt-3"
                          onClick={() => {
                            if (
                              new Date(stp.startTime) <= Date.now() &&
                              new Date(stp.endTime) >= Date.now()
                            ) {
                              console.log(new Date(stp.startTime));
                              console.log(Date.now());
                              if (!stp.testId) {
                              } else {
                                history.push(
                                  "/testinstructions/" + stp.testId._id
                                );
                              }
                            } else {
                              console.log("not available");
                              console.log(new Date(stp.startTime).getTime());
                              console.log(
                                new Date(stp.startTime) <= Date.now()
                              );
                              console.log(new Date(stp.endTime) >= Date.now());
                              swal(
                                {
                                  title: "Test is not available",
                                  text: "Give test on mentioned date & time only",
                                  type: "error",
                                  confirmButtonColor: "#0E3B7D",
                                  confirmButtonText: "Ok",
                                  closeOnConfirm: TextTrackCue,
                                  customClass: "Custom_Cancel",
                                },
                                function (isConfirm) {
                                  if (isConfirm) {
                                  } else {
                                  }
                                }
                              );
                            }
                          }}
                        >
                          Start Test
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="col-lg-3 col-12 order-1 order-lg-0">
            <div
              class="card  mt-lg-4 "
              style={{ border: "2px solid black", borderRadius: "15px" }}
            >
              <div class="card-body">
                <div className="row">
                  <div className="col">
                    <div style={{ width: 100, height: 100 }}>
                      <CircularProgressbar
                        value={66}
                        text="66%"
                        styles={buildStyles({
                          // Rotation of path and trail, in number of turns (0-1)
                          rotation: 0.25,

                          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                          strokeLinecap: "butt",

                          // Text size
                          textSize: "26px",

                          // How long animation takes to go from one percentage to another, in seconds
                          pathTransitionDuration: 0.5,
                        })}
                      />
                    </div>
                  </div>
                  <div className="col d-flex align-items-center">Completed</div>
                </div>
              </div>
            </div>
            <div
              class="card sticky-top mt-4 "
              style={{ border: "2px solid black", borderRadius: "15px" }}
            >
              <div class="card-body">
                <h5 class="card-title">All Tests Result</h5>
                Check all tests marks from here.
                <div className="text-right">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      history.push("/alltestresults");
                    }}
                  >
                    View all
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModuleTest;
