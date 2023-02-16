import React, { useState, useEffect } from 'react';
import logo1 from '../../images/logo.png';
import axios from 'axios';
import AdminBoxes from '../AdminBoxes';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const Admin = () => {
  const l2programsubtopicname = [];
  let history = useHistory();

  const getExpirationDate = (jwtToken) => {
    if (!jwtToken) {
      return null;
    }

    const jwt = JSON.parse(atob(jwtToken.split('.')[1]));

    // multiply by 1000 to convert seconds into milliseconds
    const expdatetime = new Date(jwt && jwt.exp && jwt.exp * 1000);
    const time = new Date(expdatetime).toLocaleTimeString('en', {
      timeStyle: 'short',
      hour12: true,
      timeZone: 'IST',
    });

    return expdatetime || null;
  };

  const isExpired = (exp) => {
    if (!exp) {
      return false;
    }

    return Date.now() > exp;
  };

  const styles= { borderRadius: '10px',
   margin: '10px',
   "box-shadow": "10px 10px 5px -5px rgba(174,174,174,0.75)",
  " -webkit-box-shadow": "10px 10px 5px -5px rgba(174,174,174,0.75)",
   "-moz-box-shadow": "10px 10px 5px -5px rgba(174,174,174,0.75)" };

  const [subtopicname, setsubtopicname] = useState([]);
  const logout = () => {
    localStorage.removeItem('Subtopicid');
    localStorage.removeItem('Admin');
    history.push('/admin');
  };

  useEffect(async () => {
    if (localStorage.getItem('Admin')) {
      const exp = isExpired(getExpirationDate(localStorage.getItem('Admin')));
      console.log(exp);
      if (exp == true) {
        swal(
          {
            title: 'Session Expired',
            text: 'Please Login again !!',
            type: 'warning',
            confirmButtonColor: '#0E3B7D',
            confirmButtonText: 'Ok',
            closeOnConfirm: true,
            customClass: 'Custom_Cancel',
          },
          function (isConfirm) {
            if (isConfirm) {
              logout();
            } else {
            }
          }
        );
      }
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem('Admin')}`,
        },
      };
      try {
        const res = await axios.get('/api/v1/admin/course/subtopic', config);
        const respo = await fetch('/api/v1/admin/course/subtopic', config);
        const Moduledata = await respo.json();
        console.log("res",res);
        console.log("res data",Moduledata.data.subtopics);
        setsubtopicname(Moduledata.data.subtopics);

        // console.log(res1.data.data.paper);
      } catch (err) {
        console.log(err);
        console.log(err.response.data);
        
      }
    } else {
      history.push('/admin');
    }
  }, []);


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
            history.push('/trainingadmin');
          }}
        >
          Back
        </button>
      </div>

      <div className="container text-center mt-5 pt-4">
        {/* <h3>Welcome to Admin Panel of L2/L3 - Program</h3> */}
        <h3>Welcome to Ikigai's Assessment Platform</h3>
      </div>
      {/* <AdminBoxes /> */}
      <div className="container text-center mt-5 mb-5">
        <div className="row pt-3 align-items-center  d-flex justify-content-center">
         
          {/* <div className="col-12 col-lg-6 mt-5 mt-lg-0 mb-5 mb-lg-0">
            <div class="card text-center">
              <div class="card-header">Students Outcome</div>
              <div class="card-body">
                <h5 class="card-title">Check Modulewise Results</h5>
                <p class="card-text" style={{ fontSize: '17px' }}>
                  Check Moduleweise Results of all the students
                </p>
                <button
                  className="btn btn-danger "
                  onClick={() => {
                    history.push('/modulewiseresult');
                  }}
                >
                  Check
                </button>
              </div>
              <div class="card-footer text-muted">Admin</div>
            </div>
          </div> */}

          {
            subtopicname.map((curr)=>{
              return(
                <>
                    <div className="col-12 col-lg-6 mt-5 mt-lg-0 mb-5 mb-lg-0" >
              <div class="card text-center" style={styles}>
                <div class="card-header">Students Outcome</div>
                <div class="card-body">
                  <h5 class="card-title">{curr.name}</h5>
                  <p class="card-text" style={{ fontSize: '17px' }}>
                  Check Results for {curr.name} module of all the students for all quizes
                  </p>
                  <button
                    className="btn btn-danger "
                    onClick={() => {
                      const id = curr._id;
                      localStorage.setItem('Subtopicid',curr._id)
                      history.push('/modulewiseresult');
                    }}
                    style={{ borderRadius: '10px' }}
                  >
                    Check Results
                  </button>
                </div>
                <div class="card-footer text-muted">Admin</div>
              </div>
            </div>
                </>
            
              )
            })
          }
          
        </div>
      </div>
    </>
  );
};

export default Admin;
