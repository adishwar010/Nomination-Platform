import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const ReportStudent = ({ reportData }) => {
  
  function topicWise(data) {
    console.log("rep data",data)
    if (!data) return [[], []];
    let strongTopics = [];
    let weakTopics = [];
    let topics = Object.keys(data);
    console.log("topics",topics);
    for (let i = 0; i < topics.length; i++) {
      let r = data[topics[i]];
      if (r.correct / r.total < 0.5) {
        weakTopics.push(topics[i]);
      } else {
        strongTopics.push(topics[i]);
      }
    }
    console.log("w",weakTopics);
    return [weakTopics, strongTopics];
  }
  const [weakTopics, strongTopics] = topicWise(reportData.topicWise);
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          {/* <div className="col">Marks: {reportData.marks}</div> */}
          <div className="col"> 
            {/* <div className="col">Marks: {reportData.marks}</div> */}
          </div>
          {/* <div className="col">Class Average: {reportData.classAverage}</div> */}
        </div>
        <div className="row heading">
          <div className="">
            <h4 className="mt-3">Marks: 16</h4>
            
            {/* {weakTopics.map((t) => (
              <div className="col topic">{t}</div>
            ))} */}
          </div>
        </div>
        <div className="row heading">
          <div className="">
            <h4 className="mt-3 text-danger">Weak Topics: Understand sampling,  probability theory,  and probability  distributions</h4>
            
            {/* {weakTopics.map((t) => (
              <div className="col topic">{t}</div>
            ))} */}
          </div>
        </div>

        <div className="row heading">
          <div className="">
            <h4 className="mt-3 text-success">Strong Topics: Demonstrate knowledge of descriptive statistical concepts</h4>
            
            {/* {strongTopics.map((t) => (
              <div className="col topic">{t}</div>
            ))} */}
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default ReportStudent;
