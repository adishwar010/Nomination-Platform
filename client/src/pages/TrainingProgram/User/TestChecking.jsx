import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import swal from "sweetalert";

const TestChecking = (props) => {
  let history = useHistory();

  const [testgiven, settestgiven] = useState(0);
  const [marks, setmarks] = useState();
  console.log("testid");
  console.log(props.result);

  useEffect(() => {
    console.log("In useffect of checking", props.result);
    {
      props.result &&
        props.result.map((reslt, index) => (
          <div>{pos(reslt.test._id, reslt)}</div>
        ));
    }
    function pos(res, resl) {
      if (!props.stp.testId) {
      } else {
        console.log(res);
        console.log(resl);
        if (props.stp.testId._id === res) {
          if (resl.marks) {
            setmarks(resl.marks);
          }
          settestgiven(1);
        } else {
        }
      }
    }
  });

  function los(stp) {
    if (!stp.testId) {
      return <>Test Not Available</>;
    } else {
      console.log(stp.testId);

      if (testgiven == 1) {
        return (
          <>
            {/* <i
              class="fas fa-check-circle fa-2x ml-3"
              style={{ color: "green", marginTop: "3px" }}
            ></i> */}
            <button
              className="btn btn-danger mt-3"
              onClick={() => {
                if (!stp.testId) {
                } else {
                  history.push("/testresult/" + stp.testId._id);
                }
              }}
            >
              View Result
            </button>
          </>
        );
      } else {
        return (
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
                  history.push("/testinstructions/" + stp.testId._id);
                }
              } else {
                console.log("not available");
                console.log(new Date(stp.startTime).getTime());
                console.log(new Date(stp.startTime) <= Date.now());
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
        );
      }
    }
  }
  console.log("testid");

  return <>{los(props.stp)}</>;
};

export default TestChecking;
