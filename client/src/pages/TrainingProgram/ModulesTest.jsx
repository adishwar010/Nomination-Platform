import React, { useState, useEffect } from "react";
import logo1 from "../../images/logo.png";
import l2prog from "../../images/module.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import swal from "sweetalert";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import TestDetails from "./TestDetails";

const ModulesTest = (props) => {
  let history = useHistory();
  const [events, setevents] = useState([]);
  const [batch, setbatch] = useState([]);
  const [eventid, seteventid] = useState("");
  const [testName, settestName] = useState("");
  const [marksPerQuestion, setmarksPerQuestion] = useState("");
  const [numberOfQuestions, setnumberOfQuestions] = useState("");
  const [negativeMarksPerQuestion, setnegativeMarksPerQuestion] = useState("");
  const [testduration, settestduration] = useState("");
  const [password,setpassword] = useState("");

  const [subtopicname, setsubtopicname] = useState([]);

  const eventtestcheck = (stp) => {
    console.log(stp);
    if (!stp.testId) {
      return eventtest(stp.eventType, stp._id);
    } else {
      return eventtest(stp.eventType, stp._id, stp.testId._id);
    }
  };

  const eventtest = (event, id, testid) => {
    if (event == "test") {
      if (testid != null) {
        return (
          <button
            className="btn btn-success"
            onClick={() => {
              // alert(testid);
              history.push("/testdetails/" + testid);
            }}
          >
            Show Details
          </button>
        );
      } else {
        return (
          <>
            <button
              className="btn btn-danger"
              data-toggle="modal"
              data-target="#ModalCenter"
              onClick={() => {
                console.log(id);
                seteventid(id);
                console.log("event id set", eventid);
              }}
              style={{ backgroundColor: "#180D5B" }}
            >
              Add Test Details
            </button>
          </>
        );
      }
    } else if (event == "readingMaterial") {
      return (
        <button
          className="btn btn-primary text-white"
          // onClick={() => {
          //   history.push("/testdetails/" + testid);
          // }}
        >
          Upload
        </button>
      );
    } else if (event == "assignment") {
      return (
        <button
          className="btn btn-dark text-white"
          // onClick={() => {
          //   history.push("/testdetails/" + testid);
          // }}
        >
          Upload
        </button>
      );
    }
  };

  // const testadd = (id) => {
  //   alert(id);
  //   console.log(id);
  // };

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), 6)
  );
  const [endDate, setEndDate] = useState(
    setHours(setMinutes(new Date(), 30), 6)
  );
  const [eventType, seteventType] = useState("");

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

  const getalltestdetails = async () => {
    if (localStorage.getItem("Admin")) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem("Admin")}`,
        },
      };
      try {
        const res = await axios.get("/api/v1/admin/test/", config);
        console.log(res.data.data.test);
      } catch (err) {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      }
    } else {
      history.push("/admin");
    }
  };

  const AddTestDetails = async (event) => {
    if (event) {
      event.preventDefault();
    }
    let data = {
      testName,
      numberOfQuestions,
      marksPerQuestion,
      negativeMarksPerQuestion,
      durationOfTest: testduration,
      password
    };
    console.log(data);

    if (localStorage.getItem("Admin")) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem("Admin")}`,
        },
      };
      try {
        const res = await axios.post(
          "/api/v1/admin/test/create/" + eventid,
          data,
          config
        );
        console.log(res);
        console.log(eventid);
        swal(
          {
            title: "Test Details Added",
            text: "Successfully Added all test details",
            type: "success",
            confirmButtonColor: "#0E3B7D",
            confirmButtonText: "Ok",
            closeOnConfirm: false,
            customClass: "Custom_Cancel",
          },
          function (isConfirm) {
            if (isConfirm) {
              window.location.reload();
            } else {
              window.location.reload();
            }
          }
        );
      } catch (err) {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      }
    } else {
      history.push("/admin");
    }
  };

  async function onDelete(id) {
    swal(
      {
        title: "Are you Sure",
        text: "You want to delete the test",
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
                Authorization: `Admin ${localStorage.getItem("Admin")}`,
              },
            };
            await axios.delete(`/api/v1/admin/test/delete/${id}`, config);
            swal(
              {
                title: "Test Deleted",
                text: "Successfully deleted the Test",
                type: "success",
                confirmButtonColor: "#0E3B7D",
                confirmButtonText: "Ok",
                closeOnConfirm: false,
                customClass: "Custom_Cancel",
              },
              function (isConfirm) {
                if (isConfirm) {
                  window.location.reload();
                } else {
                  window.location.reload();
                }
              }
            );
          } catch (err) {
            console.log(err.response.data);
            if (err.response.data && err.response.data.message) {
              alert(err.response.data.message);
            }
          }
        } else {
        }
      }
    );

    // const config = {
    //   headers: {
    //     Authorization: `Admin ${localStorage.getItem("Admin")}`,
    //   },
    // };

    // try {
    //   const res = await axios.delete(`/api/v1/admin/test/delete/${id}`, config);
    //   console.log(res);
    //   swal(
    //     {
    //       title: "Test Deleted",
    //       text: "Successfully deleted the Test",
    //       type: "success",
    //       confirmButtonColor: "#0E3B7D",
    //       confirmButtonText: "Ok",
    //       closeOnConfirm: false,
    //       customClass: "Custom_Cancel",
    //     },
    //     function (isConfirm) {
    //       if (isConfirm) {
    //         window.location.reload();
    //       } else {
    //         window.location.reload();
    //       }
    //     }
    //   );
    // } catch (err) {
    //   console.log(err.response.data);
    //   if (err.response.data && err.response.data.message) {
    //     alert(err.response.data.message);
    //   }
    // }
  }

  const AddEvent = async (event) => {
    if (event) {
      event.preventDefault();
    }

    // console.log(startDate.getTime());
    // console.log(endDate.getTime());

    // var eventStart = new Date(startDate);
    // let Sdate = JSON.stringify(eventStart);
    // Sdate = Sdate.slice(1, 11);

    // var eventEnd = new Date(endDate);
    // let Edate = JSON.stringify(eventEnd);
    // Edate = Edate.slice(1, 11);

    let data = {
      type: eventType,
      startTime: startDate.getTime(),
      endTime: endDate.getTime(),
    };
    console.log(data);

    if (localStorage.getItem("Admin")) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem("Admin")}`,
        },
      };
      try {
        const res = await axios.post(
          "/api/v1/admin/course/event/" + props.match.params.id,
          data,
          config
        );
        console.log(res);
        swal(
          {
            title: "Event Added",
            text: "Successfully Added An Event",
            type: "success",
            confirmButtonColor: "#0E3B7D",
            confirmButtonText: "Ok",
            closeOnConfirm: false,
            customClass: "Custom_Cancel",
          },
          function (isConfirm) {
            if (isConfirm) {
              window.location.reload();
            } else {
              window.location.reload();
            }
          }
        );
      } catch (err) {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      }
    } else {
      history.push("/admin");
    }
  };

  useEffect(async () => {
    if (localStorage.getItem("Admin")) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem("Admin")}`,
        },
      };
      try {
        const res = await axios.get(
          "/api/v1/admin/course/subtopic/" + props.match.params.id,
          config
        );
        // setbatch(res.data.data.batch);
        setsubtopicname(res.data.data.subtopic.name);
        setevents(res.data.data.subtopic.events);
        console.log(res);
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
      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Add Event
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={AddEvent}>
                <div class="form-group">
                  <label for="eventType">Event Type :</label>
                  <select
                    class="form-control"
                    id="quescat"
                    value={eventType}
                    onChange={(e) => seteventType(e.target.value)}
                    required
                  >
                    <option selected>Choose...</option>
                    <option value="test">Test</option>
                    {/* <option value="assignment">assignment</option>
                    <option value="liveClass">liveClass</option>
                    <option value="readingMaterial">readingMaterial</option> */}
                  </select>
                </div>
                <div class="form-group">
                  Start Date :{" "}
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                </div>
                <div class="form-group">
                  End Date :{" "}
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary ml-3">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="ModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Test Details
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={AddTestDetails}>
                <div class="form-group">
                  <label for="testName">Test Name :</label>
                  <input
                    class="form-control"
                    id="testName"
                    value={testName}
                    onChange={(e) => settestName(e.target.value)}
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="marksPerQuestion">Marks Per Question :</label>
                  <input
                    class="form-control"
                    id="marksPerQuestion"
                    value={marksPerQuestion}
                    onChange={(e) => setmarksPerQuestion(e.target.value)}
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="numberOfQuestions">Number of Question :</label>
                  <input
                    class="form-control"
                    id="numberOfQuestions"
                    value={numberOfQuestions}
                    onChange={(e) => setnumberOfQuestions(e.target.value)}
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="negativeMarksPerQuestion">
                    Negative Marks Per Question :
                  </label>
                  <input
                    class="form-control"
                    id="negativeMarksPerQuestion"
                    value={negativeMarksPerQuestion}
                    onChange={(e) =>
                      setnegativeMarksPerQuestion(e.target.value)
                    }
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="testduration">
                    Enter Test Duration (in minutes) :
                  </label>
                  <input
                    class="form-control"
                    id="testduration"
                    value={testduration}
                    onChange={(e) => settestduration(e.target.value)}
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="pass">Password :</label>
                  <input
                    type = 'password'
                    class="form-control"
                    id="pass"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary ml-3">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* For Mobile */}
      <div className="d-block d-sm-none">
        <div className="row pt-2">
          <div className="col">
            <img src={logo1} />
          </div>
          <div className="col text-right">
            <div className=" pt-2">
              <i class="fas fa-arrow-circle-left fa-2x"></i>
              <div className=" text-right pt-2"> {}</div>
              <div
                onClick={() => {
                  history.push("/createbatch");
                }}
                style={{ cursor: "pointer", color: "blue" }}
              >
                Back
              </div>
            </div>
          </div>
        </div>
        <div className="container text-center">
          <h4 className="pt-3">Admin</h4>
        </div>
      </div>

      <div className="d-none d-sm-block">
        <div className="row pt-2 container-fluid">
          <div className="col-4">
            <img src={logo1} />
          </div>
          <div className="col-4 text-center">
            <h4 className="pt-3 pl-5">Admin Dashboard</h4>
          </div>
          <div className="col float-right">
            <div className="row pt-2">
              <div className="col text-right pt-2"> {}</div>
              <div className="col-2 text-right">
                <i class="fas fa-arrow-circle-left fa-2x"></i>
                {/* <i class="fas fa-home fa-2x"></i> */}
                <div
                  onClick={() => {
                    history.push("/createbatch");
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

      <div className="mt-4 container">
        <div className="row">
          <div className="col-lg-2 col-12 d-flex align-items-center ">
            <h4 className="text-white bg-dark rounded px-3 py-3">
              Create Test
            </h4>
          </div>
          <div className="col-lg-10 col-12">
            <div class="card  shadow rounded-lg border-0 ">
              <div class="row card-body">
                <div className="col d-flex align-items-center">
                  <h5> Add New Test</h5>
                </div>
                <div className="col d-flex justify-content-end">
                  <button
                    type="button"
                    class="btn btn-danger mt-2 "
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    Add Test
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 mb-5 container">
        <div className="row">
          <div className="col-lg-2 col-12 ">
            <h4 className="mt-4 text-white bg-dark rounded px-3 py-3">
              All Tests
            </h4>
          </div>
          <div className="col-lg-10 col-12">
            {events &&
              events.map((stp, index) => (
                <div>
                  <br />
                  <br />
                  {timedline(stp.createdAt)}
                  <div className="row ">
                    <div className="col-11">
                      <div class="card mt-4 shadow rounded-lg border-0">
                        <div class="card-body row">
                          <div className="col">
                            <h5 class="card-title ">Quiz : {index + 1}</h5>
                            <h5 class="card-subtitle mb-2 text-danger text-capitalize">
                              {stp.eventType}
                            </h5>
                            {/* {stp.testId} */}
                            <h6 class="card-subtitle mb-2 text-muted">
                              L2 - Program
                            </h6>
                          </div>
                          <div className="col d-flex justify-content-end">
                            <p class="card-text text-info">
                              <h6>Start Date : {timed(stp.startTime)}</h6>
                              <h6>End Date : {timed(stp.endTime)}</h6>
                            </p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-end mb-3 px-3">
                          {/* {eventtest(stp.eventType, stp._id)} */}
                          {eventtestcheck(stp)}
                        </div>
                      </div>
                    </div>
                    <div className="col-1 d-flex justify-content-end align-items-center">
                      <div
                        onClick={() => {
                          onDelete(stp._id);
                        }}
                      >
                        <i
                          class="fas fa-trash-alt"
                          style={{ color: "red", cursor: "pointer" }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* <div className="mt-4 text-center">
        <button className="btn btn-danger" onClick={getalltestdetails}>
          All Test
        </button>
      </div> */}
    </>
  );
};

export default ModulesTest;
