import React, { useState, useEffect } from "react";
import logo1 from "../../../images/logo.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
import l2prog from "../../../images/l2prog.jpg";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import swal from "sweetalert";

let username;
let useremail;

const AllTestResults = () => {
  let history = useHistory();
  const [test, settest] = useState([]);

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
    // const ex = isExpired(expdatetime);
    // return expdatetime + time + ex || null;
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
        const res = await axios.get("/api/v1/test", config);
        console.log(res);
        settest(res.data.data.events.reverse());
      } catch (err) {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      }
    } else {
      history.push("/studentsignup");
    }
  }, []);

  function profile() {
    axios
      .get("/api/v1/auth", {
        headers: {
          Authorization: `studtoken ${localStorage.getItem("studtoken")}`,
        },
      })
      .then((res) => {
        username = res.data.data.user.name;
        useremail = res.data.data.user.email;
        // console.log(res.data.data.user);
      })
      .catch((err) => console.error(err));
  }

  const timedline = (lp) => {
    var utcDate = new Date(lp);

    console.log(utcDate.toString());
    return utcDate.toString().slice(4, 16);
  };

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
        {/* <div className="container text-center">
          <h4 className="pt-3">Student Dashboard</h4>
        </div> */}
      </div>

      <div className="d-none d-sm-block">
        <div className="row pt-2 container-fluid">
          <div className="col-4">
            <img src={logo1} />
          </div>
          <div className="col-4 text-center">
            {/* <h4 className="pt-3 pl-5">Student Dashboard</h4> */}
            {/* <Cameraweb /> */}
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
              <div className="col d-flex align-items-center">
                <h3>L-2 Program (Data Science & Artificial Intelligence)</h3>
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

      <div className="container mb-4 ">
        {test &&
          test.map((stp, index) => (
            <div>
              <br />
              <br />
              {timedline(stp.createdAt)}
              <div
                class="card mt-4 px-3 py-3"
                style={{ border: "2px solid black", borderRadius: "20px" }}
              >
                {badage(index)}
                <div class="card-body row">
                  <div className="col ">
                    <p class="card-text ">
                      <h5>Test Name : </h5>
                      <h5 className="text-danger">{stp.testId.testName}</h5>
                    </p>
                    {/* <h5>Test Name :</h5>
                        <h5 class="card-title  text-danger text-capitalize">
                          {stp.testId.testName}
                        </h5> */}
                  </div>
                  <div className="col d-flex justify-content-end">
                    <p class="card-text " style={{ color: "#180D5B" }}>
                      <h6>Max Marks : </h6>
                      <h6>Marks Obtained : </h6>
                    </p>
                  </div>
                </div>
                <div className="d-flex justify-content-end mb-3 px-3">
                  <button
                    className="btn btn-info mt-3"
                    onClick={() => {
                      history.push("/detailedresult");
                    }}
                  >
                    Check
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default AllTestResults;
