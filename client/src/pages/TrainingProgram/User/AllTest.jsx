import React, { useState, useEffect } from 'react';
import logo1 from '../../../images/logo.png';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import l2prog from '../../../images/l2prog.jpg';
import l3prog from '../../../images/l3prog.jpg';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import swal from 'sweetalert';
import './AllTest.css';
import Avatar from 'react-avatar';
import Faq from 'react-faq-component';
import NewModule from './NewModule';

const AllTest = () => {
  let history = useHistory();
  const l2programsubtopicname = [];

  const [username, setusername] = useState([]);

  const [subtopicname, setsubtopicname] = useState([]);
  const [subtopicnamel3, setsubtopicnamel3] = useState([]);
  const [l3error, setl3error] = useState('');
  const [result, setresult] = useState([]);

  function SubEvent(events) {
    console.log('hey');
    return (
      <>
        <NewModule events={events} result={result} />
      </>
    );
  }

  const l3 = () => {
    // alert(l3error);
    if (l3error === 'Student Not Present in the L3 Program') {
      return;
    } else if (l3error === 'no error') {
      return (
        <>
          <div className="container mt-3">
            <div
              class="card w-100"
              style={{
                backgroundColor: '#192066',
                color: 'white',
                border: '2px solid #180D5B',
                borderRadius: '10px',
              }}
            >
              <div class="card-body">
                <div className="row">
                  <div className="col d-flex align-items-center">
                    <h3>
                      {/* L-3 Program (Data Science & Artificial Intelligence) */}
                      Check Your Proficiency Level
                    </h3>
                  </div>
                  <div className="col d-flex justify-content-end">
                    <img
                      src={l3prog}
                      alt="program Image"
                      height="190px"
                      width="290px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 container pb-3">
            <div className="row">
              <div className="col">
                All SubTopics {'('}
                {subtopicnamel3 && subtopicnamel3.length}
                {')'}
              </div>
            </div>
          </div>

          <div className=" pb-4 mb-5 rounded bg-white container ">
            {subtopicnamel3 &&
              subtopicnamel3.map((stp, index) => (
                <Faq
                  data={{
                    title: '',
                    rows: [
                      {
                        title: 'Module ' + (index + 1) + ' : ' + stp.name,
                        content: <>{SubEvent(stp.events)}</>,
                      },
                    ],
                  }}
                  styles={styles1}
                  config={config}
                />
              ))}
          </div>
        </>
      );
    }
  };

  const styles1 = {
    // bgColor: 'white',
    titleTextColor: 'black',
    rowTitleColor: 'black',
    rowContentColor: '#182d78',
    arrowColor: 'black',
    rowContentPaddingLeft: '5px',
  };

  const styles = {
    // bgColor: 'white',
    titleTextColor: 'black',
    rowTitleColor: 'black',
    rowContentColor: '#33827f',
    arrowColor: 'black',
  };

  const config = {
    // animate: true,
    // arrowIcon: "V",
    // tabFocus: true,
  };

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
          
          // console.clear();
          const subId = localStorage.getItem('Subtopicid');
          // console.log("sub",subId);
          const res = await axios.get(`/api/v1/test/subtopics`, config);
          const respo = await fetch(`/api/v1/test/subtopics/${subId}`, config);
          const res1 = await axios.get('/api/v1/test/resultAll', config);
          
          const ModuleData = await respo.json();
          console.log("res",res);
          console.log("res data",res.data.data.subtopic);
          
          console.log("mod data",ModuleData.data.subtopic);
          console.log(res1);
          res.data.data.subtopics.map((stp) => {
            if (stp.program) {
              if (stp.program === 'L3') {
              } else if (stp.program === 'L2' && stp._id === subId ) {
                localStorage.setItem('SubTopicName',stp.name);
                l2programsubtopicname.push(stp);
              }
            } else {
              l2programsubtopicname.push(stp);
            }
          });
          setsubtopicname(l2programsubtopicname);
          console.log("sn");
          l2programsubtopicname.forEach(e => console.log(e));
          setresult(res1.data.data.paper);

          const resl3 = await axios.get('/api/v1/test/subtopics/l3', config);
          console.log(resl3);
          setl3error('no error');
          setsubtopicnamel3(resl3.data.data.subtopics);
          // console.log(res1.data.data.paper);
        } catch (err) {
          console.log(err);
          // console.log(err.response.data);
          // if (err.response && err.response.data) {
          //   if (
          //     err.response.data.message ===
          //     'Student Not Present in the L3 Program'
          //   ) {
          //     setl3error(err.response.data.message);
          //     return;
          //   }
          //   alert(err.response.data.message);
          // }
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
                <div className=" text-right ">
                  <i class="fas fa-arrow-circle-left fa-3x"></i>
                  <div
                    onClick={() => {
                      localStorage.removeItem('SubTopicName');
                      localStorage.removeItem('Subtopicid');
                      history.push('/studentdashboard');
                    }}
                    className="mr-2"
                    style={{ cursor: 'pointer', color: 'blue' }}
                  >
                    Back
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container text-center">
            <h4 className="pt-3">Modulewise Quizes</h4>
          </div>
        </div>

        <div className="d-none d-sm-block">
          <div className="row pt-2 container-fluid">
            <div className="col-4">
              <img src={logo1} />
            </div>
            <div className="col-4 text-center">
              <h4 className="pt-3 pl-5">Modulewise Quizes</h4>
            </div>
            <div className="col float-right">
              <div className="row pt-2">
                <div className="col text-right ">
                  <i class="fas fa-arrow-circle-left fa-3x"></i>
                  <div
                    onClick={() => {
                      localStorage.removeItem('SubTopicName');
                      localStorage.removeItem('Subtopicid');
                      history.push('/studentdashboard');
                    }}
                    className="mr-2"
                    style={{ cursor: 'pointer', color: 'blue' }}
                  >
                    Back
                  </div>
                </div>
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

        {l3()}

        <div className="container mt-3">
          <div
            class="card w-100"
            style={{
              backgroundColor: '#180D5B',
              color: 'white',
              border: '2px solid #180D5B',
              borderRadius: '10px',
            }}
          >
            <div class="card-body">
              <div className="row">
                <div className="col d-flex align-items-center">
                  {/* <h3>L-2 Program (Data Science & Artificial Intelligence)</h3> */}
                      {/* <h3>Check Your Proficiency Level</h3> */}
                      <h3>We assist you in determining your strengths and weaknesses.</h3>
                </div>
                <div className="col d-flex justify-content-end">
                  <img
                    src={l2prog}
                    alt="program Image"
                    height="190px"
                    width="290px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-3 container">
          <div className="row">
            <div className="col">
              All SubTopics {'('}
              {subtopicname && subtopicname.length}
              {')'}
            </div>
          </div>
        </div>

        <div className="pt-3 pb-4 mb-5 rounded bg-white container ">
          {subtopicname &&
            subtopicname.map((stp, index) => (
              <Faq
                data={{
                  title: '',
                  rows: [
                    {
                      title: 'Module Name ' /*+ (index + 1)*/ + ' : ' + stp.name,
                      content: <>{SubEvent(stp.events)}</>,
                    },
                  ],
                }}
                styles={styles1}
                config={config}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default AllTest;
