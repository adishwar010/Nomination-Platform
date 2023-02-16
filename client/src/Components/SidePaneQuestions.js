import React, { useState, useEffect } from "react";
import "./SidePanelQuestions.css";
import Countdown, { zeroPad } from "react-countdown";
import { useHistory } from "react-router-dom";
import axios from "axios";
import _ from "lodash";

const SidePaneQuestions = ({
  setCurrentQuestion,
  startedAt,
  statusans,
  setstatusans,
}) => {
  let history = useHistory();

  useEffect(() => {
    // console.log("pol");
  }, []);

  const quest = () => {
    return (
      <>
        {_.times(statusans.length, (i) => (
          <button
            onClick={onClick}
            value={i + 1}
            type="button"
            // className="btn btn-secondary ml-5 mt-2 butsty"
            className={`btn ${
              statusans[i].status === "answered" ? "btn-success" : "btn-danger"
            } ml-5 mt-2 butsty`}
          >
            {i + 1}
          </button>
        ))}
      </>
    );
  };

  const onClick = (e) => {
    setCurrentQuestion(parseInt(e.target.value));
    if (localStorage.getItem("token")) {
      const config = {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      };
      axios
        .get("api/v1/dsat/questionPaper", config)
        .then(function (res) {
          setstatusans(res.data.data.paper.questions);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
  };
  const onComplete = () => {
    alert("Test has ended");
    history.push("/finish");
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
  const date = new Date(startedAt).getTime() + 30 * 60 * 1000;
  return (
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
  );
};

export default SidePaneQuestions;
