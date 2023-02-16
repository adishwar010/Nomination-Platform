import React, { useState, useEffect } from "react";
import Countdown, { zeroPad } from "react-countdown";
import { useHistory } from "react-router-dom";
import axios from "axios";
import _ from "lodash";

const SidePaneTestQuestion = ({
  setCurrentQuestion,
  startedAt,
  statusans,
  questions,
  setstatusans,
  id,
  testduration,
}) => {
  let history = useHistory();

  console.log("SidePanel", statusans);

  useEffect(() => {
    // console.log("pol");
  }, []);

  const colourt = (p) => {
    let x = "btn-danger";
    console.log(questions[p]._id);
    if (statusans.length != 0) {
      for (let j = 0; j < statusans.length; j++) {
        if (questions[p]._id === statusans[j].questionId) {
          x = "btn-success";
        }
      }
    }
    return x;
  };

  const quest = () => {
    return (
      <>
        {_.times(questions.length, (i) => (
          <button
            onClick={onClick}
            value={i + 1}
            type="button"
            className={`btn ${colourt(i)} ml-5 mt-2 butsty`}
          >
            {i + 1}
          </button>
        ))}
      </>
    );
  };

  const onClick = (e) => {
    setCurrentQuestion(parseInt(e.target.value));
    if (localStorage.getItem("studtoken")) {
      const config = {
        headers: {
          Authorization: `studtoken ${localStorage.getItem("studtoken")}`,
        },
      };
      axios
        .get("/api/v1/test/" + id, config)
        .then(function (res) {
          setstatusans(res.data.data.paper.responses);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  };
  const onComplete = () => {
    history.push("/testended");
  };

  const renderer = ({ hours, minutes, seconds }) => {
    if (minutes < 1 && seconds < 60) {
      return (
        <h5 className=" blink_me text-danger">
          {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </h5>
      );
    } else if (minutes < 4) {
      return (
        <h5 className="text-danger ">
          {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </h5>
      );
    } else {
      return (
        <h5 className="text-success ">
          {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </h5>
      );
    }
  };
  const date = new Date(startedAt).getTime() + testduration * 60 * 1000;

  return (
    <>
      <div className="container shadow bg-light rounded scroll hem">
        <h5 className="text-center pt-3">Time Left</h5>
        <hr />
        <div className="text-center ">
          <span className="font-weight-bolder">
            {date && (
              <Countdown
                onComplete={onComplete}
                date={date}
                renderer={renderer}
              />
            )}
          </span>
        </div>
        <h5 className="text-center pt-4">Questions</h5>
        <hr />
        <div className="row pl-2 pr-2">{quest()}</div>
        <h5 className="text-center pt-4"></h5>
      </div>
    </>
  );
};

export default SidePaneTestQuestion;
