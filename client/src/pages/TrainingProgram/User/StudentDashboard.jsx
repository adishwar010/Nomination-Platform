import React, { useState, useEffect } from 'react';
import logo1 from '../../../images/logo1.png';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import 'sweetalert/dist/sweetalert.css';
import swal from 'sweetalert';

const StudentDashboard = () => {
  let history = useHistory();
  const l2programsubtopicname = [];
  

  const [username, setusername] = useState([]);
  const [subtopicname, setsubtopicname] = useState([]);

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

  const logout = () => {
    localStorage.removeItem('Subtopicid');
    localStorage.removeItem('studtoken');
    history.push('/');
  };
  const styles= { borderRadius: '10px', 
  margin: '10px',
  "box-shadow": "10px 10px 5px -5px rgba(174,174,174,0.75)",
 " -webkit-box-shadow": "10px 10px 5px -5px rgba(174,174,174,0.75)",
  "-moz-box-shadow": "10px 10px 5px -5px rgba(174,174,174,0.75)" };

  const classLink = async () => {
    const config = {
      headers: {
        Authorization: `studtoken ${localStorage.getItem('studtoken')}`,
      },
    };
    try {
      const res = await axios.get('/api/v1/attendance', config);
      console.log(res);
      window.open(res.data.data.meetLink, '_blank');
    } catch (err) {
      if (err.response && err.response.data) {
        alert(err.response.data.message);
      }
    }

    // window.open(classlink, "_blank");
  };

  useEffect(async () => {
    if (localStorage.getItem('studtoken')) {
      const exp = isExpired(
        getExpirationDate(localStorage.getItem('studtoken'))
      );
      console.log(exp);
      console.log(getExpirationDate(localStorage.getItem('studtoken')));
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
      } else {
        profile();
        const config = {
          headers: {
            Authorization: `studtoken ${localStorage.getItem('studtoken')}`,
          },
        };

        try {
          const res = await axios.get('/api/v1/test/subtopics', config);
          const respo = await fetch('/api/v1/test/subtopics', config);
          const Moduledata = await respo.json();
          console.log("res",res);
          console.log("res data",Moduledata.data.subtopics);
          setsubtopicname(Moduledata.data.subtopics);

          // console.log(res1.data.data.paper);
        } catch (err) {
          console.log(err);
          console.log(err.response.data);
          
        }


      }
    } else {
      history.push('/');
    }
  }, []);

  function profile() {
    axios
      .get('/api/v1/auth', {
        headers: {
          Authorization: `studtoken ${localStorage.getItem('studtoken')}`,
        },
      })
      .then((res) => {
        setusername(res.data.data.user.name);
        console.log(res);
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <div className="container-fluid">
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
                  style={{ cursor: 'pointer', color: 'blue' }}
                >
                  Logout
                </div>
              </div>
            </div>
          </div>
          <div className="container text-center">
            <h4 className="pt-3">Student Dashboard</h4>
          </div>
        </div>

        <div className="d-none d-sm-block">
          <div className="row pt-2 container-fluid">
            <div className="col-4">
              <img src={logo1} />
            </div>
            <div className="col-4 text-center">
              <h4 className="pt-3 pl-5">Ikigai Dashboard</h4>
            </div>
            <div className="col float-right">
              <div className="row pt-2">
                <div className="col text-right pt-2"> {username}</div>
                <div className="col-2 text-right">
                  <i class="fas fa-user-circle fa-3x"></i>
                  <div
                    onClick={logout}
                    style={{ cursor: 'pointer', color: 'blue' }}
                  >
                    Logout
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container text-center mt-5 ">
          {/* <h3>Welcome to Student Panel of L2/L3-Program</h3> */}
          <h3>Welcome to Ikigai's Assessment Platform</h3>
        </div>

        <div className="container text-center mt-5 mb-5  ">
          <div className="row pt-3 align-items-center d-flex justify-content-center">
            {/* <div className="col-12 col-lg-6">
              <div class="card text-center" style={{ borderRadius: '10px' }}>
                <div class="card-header">Attend Class</div>
                <div class="card-body ">
                  <h5 class="card-title">Attend Today's Class</h5>
                  <p class="card-text" style={{ fontSize: '17px' }}>
                    This will redirect you to join the class
                  </p>
                  <button
                    className="btn btn-danger "
                    onClick={classLink}
                    style={{ borderRadius: '10px' }}
                  >
                    Attend Class
                  </button>
                </div>
                <div class="card-footer text-muted">Student</div>
              </div>
            </div> */}
          {
            subtopicname.map((curr)=>{
              return(
                <div className="col-12 col-lg-6 mt-5 mt-lg-0 mb-5 mb-lg-0">
              <div class="card text-center" style={styles}>
                <div class="card-header">Module</div>
                <div class="card-body">
                  <h5 class="card-title">{curr.name}</h5>
                  <p class="card-text" style={{ fontSize: '17px' }}>
                    All the quizes are provided 
                  </p>
                  <button
                    className="btn btn-danger "
                    onClick={() => {
                      const id = curr._id;
                      localStorage.setItem('Subtopicid',curr._id)
                      history.push('/alltest');
                    }}
                    style={{ borderRadius: '10px' }}
                  >
                    Check Quizes
                  </button>
                </div>
                <div class="card-footer text-muted">Student</div>
              </div>
            </div>
              )
            })
          }



            {/* <div className="col-12 col-lg-6 mt-5 mt-lg-0 mb-5 mb-lg-0">
              <div class="card text-center" style={{ borderRadius: '10px' }}>
                <div class="card-header">Knowledge Check</div>
                <div class="card-body">
                  <h5 class="card-title">Attempt Quizes</h5>
                  <p class="card-text" style={{ fontSize: '17px' }}>
                    All the quizes are provided modulewise
                  </p>
                  <button
                    className="btn btn-danger "
                    onClick={() => {
                      history.push('/alltest');
                    }}
                    style={{ borderRadius: '10px' }}
                  >
                    Check Quizes
                  </button>
                </div>
                <div class="card-footer text-muted">Student</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
