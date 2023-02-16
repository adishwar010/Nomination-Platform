import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import swal from "sweetalert";

const L2NewModule = ({ id }) => {
  let history = useHistory();
  const [events, setevents] = useState([]);
  const [subtopicname, setsubtopicname] = useState([]);

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

  useEffect(async () => {
    // console.log(id);
    if (localStorage.getItem("Admin")) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem("Admin")}`,
        },
      };
      try {
        const res = await axios.get(
          "/api/v1/admin/course/subtopic/" + id,
          config
        );
        console.log(res);
        setevents(res.data.data.subtopic.events);
        setsubtopicname(res.data.data.subtopic);
      } catch (err) {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      }
    } else {
      history.push("/admin");
    }
  }, []);

  return (
    <>
      <div className="row mb-5">
        <div className="col-12 order-12 order-lg-0 d-none d-sm-block ">
          {events &&
            events.map((stp, index) => (
              <div>
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
                    <div className="col d-flex justify-content-center">
                      <p class="card-text " style={{ color: "#180D5B" }}>
                        <h6>
                          <i class="fas fa-clock"></i> : {timed(stp.startTime)}
                        </h6>
                        {/* <h6>End Date : {timed(stp.endTime)}</h6> */}
                      </p>
                    </div>
                    <div className="col d-flex align-items-center justify-content-end">
                      <button
                        className="btn btn-info mt-3"
                        onClick={() => {
                          if (!stp.testId) {
                          } else {
                            history.push(
                              "/resulttable/" +
                                stp.testId._id +
                                "/" +
                                (subtopicname && subtopicname.name)
                            );
                          }
                        }}
                      >
                        View Result
                      </button>
                      <button
                        className="btn btn-danger mt-3 ml-3"
                        onClick={() => {
                          if (!stp.testId) {
                          } else {
                            history.push(
                              "/studentnotgiventest/" +
                                stp.testId._id +
                                "/" +
                                (subtopicname && subtopicname.name)
                            );
                          }
                        }}
                      >
                        Test Not Given
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* ----------- For mobile ----------- */}

        <div className="col-12 d-block d-sm-none">
          {events &&
            events.map((stp, index) => (
              <div>
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
                        {/* <h6>End Date : {timed(stp.endTime)}</h6> */}
                      </p>
                    </div>
                  </div>
                  <div className="row mb-3 px-3">
                    <div className="col">
                      <button
                        className="btn btn-danger mt-3 ml-3"
                        onClick={() => {
                          if (!stp.testId) {
                          } else {
                            history.push(
                              "/studentnotgiventest/" +
                                stp.testId._id +
                                "/" +
                                (subtopicname && subtopicname.name)
                            );
                          }
                        }}
                      >
                        Test Not Given
                      </button>
                    </div>
                    <div className="col d-flex justify-content-end">
                      <button
                        className="btn btn-info mt-3"
                        onClick={() => {
                          if (!stp.testId) {
                          } else {
                            history.push(
                              "/resulttable/" +
                                stp.testId._id +
                                "/" +
                                (subtopicname && subtopicname.name)
                            );
                          }
                        }}
                      >
                        View Result
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default L2NewModule;
