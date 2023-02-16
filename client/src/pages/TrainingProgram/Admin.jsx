import React from 'react';
import logo1 from '../../images/logo.png';
import AdminBoxes from '../AdminBoxes';
import { useHistory } from 'react-router-dom';

const Admin = () => {
  let history = useHistory();
  const logout = () => {
    localStorage.removeItem('Admin');
    history.push('/admin');
  };
  const styles= { borderRadius: '10px',
   margin: '10px',
   "box-shadow": "10px 10px 5px -5px rgba(174,174,174,0.75)",
  " -webkit-box-shadow": "10px 10px 5px -5px rgba(174,174,174,0.75)",
   "-moz-box-shadow": "10px 10px 5px -5px rgba(174,174,174,0.75)" }
  return (
    <>
      <div className="container-fluid admn">
        <div className="row  pt-2 ml-3 pb-2">
          <img src={logo1} />
        </div>
      </div>

      <div className="container mt-4 text-white">
        <button
          className="btn float-right"
          style={{ backgroundColor: '#0E3B7D', color: 'white' }}
          onClick={logout}
        >
          Logout
        </button>
        <button
          className="btn float-right mr-3"
          style={{ backgroundColor: '#0E3B7D', color: 'white' }}
          onClick={() => {
            history.push('/admin');
          }}
        >
          Home
        </button>
      </div>

      <div className="container text-center mt-5 pt-4">
        {/* <h3>Welcome to Admin Panel of L2/L3 - Program</h3> */}
        <h3>Welcome to Ikigai's Assement Platform</h3>
      </div>
      {/* <AdminBoxes /> */}
      <div className="container text-center mt-5 mb-5">
        <div className="row align-items-center  d-flex justify-content-center">
          <div className="col-12 col-lg-6">
            <div class="card text-center" style={styles}>
              <div class="card-header">Test Creation</div>
              <div class="card-body ">
                <h5 class="card-title">Create Tests/ Add Events</h5>
                <p class="card-text" style={{ fontSize: '17px' }}>
                  Add Test And Test Details Modulewise
                </p>
                <button 
                  className="btn btn-danger "
                  onClick={() => {
                    history.push('/createbatch');
                  }}
                >
                  Access
                </button>
              </div>
              <div class="card-footer text-muted">Admin</div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mt-5 mt-lg-0 mb-5 mb-lg-0">
            <div class="card text-center" style={styles}>
              <div class="card-header">Students Outcome</div>
              <div class="card-body">
                <h5 class="card-title">Check Modulewise Results</h5>
                <p class="card-text" style={{ fontSize: '17px' }}>
                  Check Moduleweise Results of all the students
                </p>
                <button
                  className="btn btn-danger "
                  onClick={() => {
                    history.push('/adminallmodules');
                  }}
                >
                  Check
                </button>
              </div>
              <div class="card-footer text-muted">Admin</div>
            </div>
          </div>
          {/* /////////////////////////////// */}
          {/* <div className="col-12 col-lg-4 mt-5 mt-lg-0 mb-5 mb-lg-0">
            <div class="card text-center">
              <div class="card-header">Trainer assigning</div>
              <div class="card-body">
                <h5 class="card-title">Assign Trainers</h5>
                <p class="card-text" style={{ fontSize: "17px" }}>
                  Assign trainers to Batches
                  <br />
                </p>
                <button
                  className="btn btn-danger "
                >
                  Assign
                </button>
              </div>
              <div class="card-footer text-muted">Admin</div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Admin;
