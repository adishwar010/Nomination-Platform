import React, { useState, useEffect } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";
import user from "../images/icons/user.png";
import group from "../images/icons/group.png";
import university from "../images/icons/university.png";

const AdminBoxes = () => {
  const setIntervalId = React.useRef(null);
  let history = useHistory();
  const [activeusers, setactiveusers] = useState(0);
  const [testsubmittedcount, settestsubmittedcount] = useState(0);

  const hello = async () => {
    const config = {
      headers: {
        Authorization: `Admin ${localStorage.getItem("Admin")}`,
      },
    };
    const res1 = await axios.get(
      "/api/v1/admin/registrationStats/active",
      config
    );
    // console.log(res1);
    // console.log(res1.data.data.activeUser);
    setactiveusers(res1.data.data.activeUser);
    settestsubmittedcount(res1.data.data.testSubmitted);
  };

  useEffect(() => {
    if (localStorage.getItem("Admin")) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem("Admin")}`,
        },
      };
      try {
        hello();
        setIntervalId.current = setInterval(async () => {
          const res1 = await axios.get(
            "/api/v1/admin/registrationStats/active",
            config
          );
          // console.log(res1);
          // console.log(res1.data.data.activeUser);
          setactiveusers(res1.data.data.activeUser);
          settestsubmittedcount(res1.data.data.testSubmitted);
        }, 30000);
        // const res = await axios.get("/api/v1/admin/registrationStats", config);
        // setno(res.data.data.numberOfUserRegistered);
      } catch (err) {
        console.log(err.response.data);
        if (err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        }
      }
    } else {
      history.push("/admin");
    }
    return function clearUp() {
      clearInterval(setIntervalId.current);
    };
  }, []);

  return (
    <>
      <div className="container pt-3">
        <div className="row ">
          <div className="col-12 col-lg-4">
            <div className="adbox1 pt-2 pb-2">
              <div className="row">
                <div className="col">
                  <div className="text-center">
                    <img src={university} />
                  </div>
                </div>
                <div className="col-8">
                  Candidates Giving Test
                  <h5>{activeusers}</h5>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-12 col-lg-4">
            <div className="adbox2  pt-2 pb-2">
              <div className="row">
                <div className="col">
                  <div className="text-center">
                    <img src={group} />
                  </div>
                </div>
                <div className="col-8">
                  Total Students Phase_1
                  <h5>2500</h5>
                </div>
              </div>
            </div>
          </div> */}
          <div className="col-12 col-lg-4 ">
            <div className="adbox3  pt-2 pb-2">
              <div className="row">
                <div className="col">
                  <div className="text-center">
                    <img src={user} />
                  </div>
                </div>
                <div className="col-8">
                  Students Submitted Test
                  <h5>{testsubmittedcount}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminBoxes;
