import React from "react";
import logo1 from "../../images/logo.png";

const Users = () => {
  return (
    <>
      <div className="container-fluid admn">
        <div className="row  pt-2 ml-3 pb-2">
          <div className="col text-left">
            <img src={logo1} />
          </div>
          <div className="col text-right">
            <i class="fas fa-user-circle fa-3x"></i>
            <br />
            Logout
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div class="card">
          <div class="card-body text-center">
            <h3>Announcements</h3>
            This is some text within a card body.
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div class="card-deck">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title ">Assignments Assigned</h5>
              <div class="card text-center">
                <div class="card-body">
                  <h5 class="card-title ">Assignments </h5>
                  Check If you have an assignment
                  <br />
                  <button type="button" class="btn btn-danger mt-3">
                    Check
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title ">Quiz Assigned</h5>
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title text-center">Quiz 1 : Statistics</h5>
                  Total Question : 12
                  <br />
                  <button type="button" class="btn btn-danger mt-3">
                    Give Quiz
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5 mb-5">
        <div class="card text-center">
          <div class="card-body ">
            <h3>All Quiz Result</h3>

            <button type="button" class="btn btn-danger mt-3">
              Check
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
