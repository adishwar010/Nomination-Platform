import React, { useState, useEffect } from 'react';
import logo1 from '../../images/logo.png';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import l2prog from '../../images/l2prog.jpg';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import swal from 'sweetalert';
import Avatar from 'react-avatar';
import Faq from 'react-faq-component';
import NewModule from './User/NewModule';
import L2NewModule from './User/L2NewModule';
import exportFromJSON from 'export-from-json';

const Loader = () => <div className="loader">hey</div>;

const L2Result = () => {
  const l2programsubtopicname = [];
  const l3programsubtopicname = [];
  const [loading, setloading] = useState(false);
  let history = useHistory();

  const [subtopicname, setsubtopicname] = useState([]);
  const [l2subtopicname, setl2subtopicname] = useState([]);
  const [l3subtopicname, setl3subtopicname] = useState([]);

  const [studentstestdetails, setstudentstestdetails] = useState('');

  const fileName = 'Students_Data_with_Quizes';
  const exportType = exportFromJSON.types.csv;

  const hideLoader = () => {
    setloading(false);
  };

  const showLoader = () => {
    setloading(true);
  };

  const ExportToExcel = async () => {
    showLoader();
    const config = {
      headers: {
        Authorization: `Admin ${localStorage.getItem('Admin')}`,
      },
    };
    try {
      const res1 = await axios.get(
        '/api/v1/admin/excelData/testAlldetails',
        config
      );
      console.log("res1",res1);
      hideLoader();
      // setstudentstestdetails(res1.data.data.data);
      exportFromJSON({ data: res1.data.data.data, fileName, exportType });
    } catch (err) {
      if (err.response && err.response.data) {
        alert(err.response.data.message);
      }
    }
  };

  function SubEvent(id) {
    console.log('hey');
    return (
      <>
        <L2NewModule id={id} />
      </>
    );
  }

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

  function userHome() {
    history.push('/userdashboard');
  }

  const badage = (index) => {
    if (index == 0) {
      return <div class="position-absolute badge badge-danger m-2">New</div>;
    }
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
        const subId = localStorage.getItem('Subtopicid');
        const res = await axios.get('/api/v1/admin/course/subtopic', config);
        console.log(res);
        setsubtopicname(res.data.data.subtopics);
        res.data.data.subtopics.map((stp) => {
          if (stp.program) {
            if (stp.program === 'L3') {
              l3programsubtopicname.push(stp);
            } else if (stp.program === 'L2'  && stp._id === subId) {
              l2programsubtopicname.push(stp);
            }
          } else {
            l2programsubtopicname.push(stp);
          }
        });
        setl2subtopicname(l2programsubtopicname);
        setl3subtopicname(l3programsubtopicname);
      } catch (err) {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      }
    } else {
      history.push('/admin');
    }
  }, []);

  function timed(lp) {
    var date = new Date(lp);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.toString().slice(4, 16) + strTime;
  }

  const timedline = (lp) => {
    var utcDate = new Date(lp);

    console.log(utcDate.toString());
    return utcDate.toString().slice(4, 16);
  };

  return (
    <>
      <div className="d-block d-sm-none">
        <div className="row pt-2">
          <div className="col">
            <img src={logo1} />
          </div>
          <div className="col text-right">
            <div className=" pt-2">
              <i class="text-right fas fa-user-circle fa-3x"></i>
              <div className=" text-right pt-2"> </div>
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
          <h4 className="pt-3">Students Result</h4>
        </div>
      </div>

      <div className="d-none d-sm-block">
        <div className="row pt-2 container-fluid">
          <div className="col-4">
            <img src={logo1} />
          </div>
          <div className="col-4 text-center">
            <h4 className="pt-3 pl-5">Students Result</h4>
            {/* <Cameraweb /> */}
          </div>
          <div className="col float-right">
            <div className="row pt-2">
              <div className="col text-right ">
                <i class="fas fa-arrow-circle-left fa-3x"></i>
                <div
                  onClick={() => {
                    
                    localStorage.removeItem('Subtopicid');
                    history.push('/adminallmodules');
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
                <h3>
                  {/* L2 - L3 Program (Data Science & Artificial Intelligence) */}
                  Proficiency Assessment
                </h3>
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
          <div className="col">Students Quizes Data :-</div>
        </div>
      </div>

      <div className="pt-3 container">
        <div
          class="card w-100 shadow"
          style={{
            backgroundColor: '#180D5B',
            color: 'white',
            border: '2px solid #180D5B',
            borderRadius: '10px',
          }}
        >
          <div class="card-body">
            <div className="row">
              <div className="col-12 col-lg-6 col-md-6 d-flex align-content-center h6">
                All Students Data with Quizes [ Given or Not Given ]
              </div>
              <div className="col-12 col-lg-6 col-md-6 d-flex justify-content-lg-end justify-content-md-end align-content-center">
                <button className="btn btn-danger" onClick={ExportToExcel}>
                  Download Excel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="pt-5 container"
        // data-toggle="tooltip"
        // title="Hooray!"
        // data-placement="right"
      >
        <div className="row">
          <div className="col">
            <h5>
              {' '}
              All Quizes {'('}
              {l2subtopicname && l2subtopicname.length}
              {')'} :-
            </h5>
          </div>
        </div>
      </div>

      <div className="pt-3 pb-4 mb-5 rounded bg-white container ">
        {l2subtopicname &&
          l2subtopicname.map((stp, index) => (
            <Faq
              data={{
                title: '',
                rows: [
                  {
                    title: 'Module Name ' /*+ (index + 1)  */+ ' : ' + stp.name,
                    content: (
                      <>
                        {/* {stp._id} */}
                        {SubEvent(stp._id)}
                      </>
                    ),
                  },
                ],
              }}
              styles={styles1}
              config={config}
            />
          ))}
      </div>

      {/* <div
        className="pt-3 container"
        // data-toggle="tooltip"
        // title="Hooray!"
        // data-placement="right"
      >
        <div className="row">
          <div className="col">
            <h5>
              L3 Modules Result {'('}
              {l3subtopicname && l3subtopicname.length}
              {')'} :-
            </h5>
          </div>
        </div>
      </div> */}

      {/* <div className="pt-3 pb-4 mb-5 rounded bg-white container ">
        {l3subtopicname &&
          l3subtopicname.map((stp, index) => (
            <Faq
              data={{
                title: '',
                rows: [
                  {
                    title: 'Module ' + (index + 1) + ' : ' + stp.name,
                    content: (
                      <>
                        {/* {stp._id} */}
                        {/* {SubEvent(stp._id)}
                      </>
                    ),
                  },
                ],
              }}
              styles={styles1}
              config={config}
            />
          ))}
      </div> */} 

      {loading ? <Loader /> : null}
    </>
  );
};

export default L2Result;
