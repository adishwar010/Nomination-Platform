import React, { useState, useEffect } from "react";
import logo1 from "../../images/logo.png";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import "moment/locale/en-in";
const TimeTable = () => {
  return (
    <>
      <div className="container-fluid admn">
        <div className="row  pt-2 ml-3 pb-2">
          <img src={logo1} />
        </div>
      </div>

      <div className="container mt-5 d-flex justify-content-center">
        <div class="card w-50 text-center">
          <h5 class="card-header">Featured</h5>
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            Start Date & Time :{" "}
            <Datetime
              onChange={(date) => {
                console.log(date);

                console.log(date.toDate());
              }}
            />
            <a href="#" class="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeTable;
