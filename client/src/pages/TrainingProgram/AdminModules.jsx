import React, { useState, useEffect } from 'react';
import logo1 from '../../images/logo.png';
import l2prog from '../../images/l2prog.jpg';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import swal from 'sweetalert';

const AdminModules = (props) => {
  const l2programsubtopicname = [];
  const l3programsubtopicname = [];
  let history = useHistory();
  const [subtopicname, setsubtopicname] = useState([]);
  const [l2subtopicname, setl2subtopicname] = useState([]);
  const [l3subtopicname, setl3subtopicname] = useState([]);
  const [subtopic, setsubtopic] = useState('');
  const [program, setprogram] = useState('');

  function home() {
    history.push('/trainingadmin');
  }
  function back() {
    history.push('/createbatch');
  }

  const AddSubtopic = async (event) => {
    if (event) {
      event.preventDefault();
    }

    let data = {
      name: subtopic,
      // program: program,
      program : "L2"
    };
    console.log(data);

    if (localStorage.getItem('Admin')) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem('Admin')}`,
        },
      };
      try {
        const res = await axios.post(
          '/api/v1/admin/course/subtopic/' + props.match.params.id,
          data,
          config
        );
        console.log(res);
        swal(
          {
            title: 'Module Added',
            text: 'Successfully Added Module details',
            type: 'success',
            confirmButtonColor: '#0E3B7D',
            confirmButtonText: 'Ok',
            closeOnConfirm: false,
            customClass: 'Custom_Cancel',
          },
          function (isConfirm) {
            if (isConfirm) {
              window.location.reload();
            } else {
              window.location.reload();
            }
          }
        );
      } catch (err) {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      }
    } else {
      history.push('/admin');
    }
  };

  const logout = () => {
    localStorage.removeItem('admin');
    history.push('/admin');
  };

  useEffect(async () => {
    if (localStorage.getItem('Admin')) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem('Admin')}`,
        },
      };
      try {
        const res = await axios.get('/api/v1/admin/course/subtopic/', config);
        console.log(res);
        console.log(res.data.data.subtopics);
        setsubtopicname(res.data.data.subtopics);
        res.data.data.subtopics.map((stp) => {
          if (stp.program) {
            if (stp.program === 'L3') {
              l3programsubtopicname.push(stp);
            } else if (stp.program === 'L2') {
              l2programsubtopicname.push(stp);
            }
          } else {
            l2programsubtopicname.push(stp);
          }
        });
        setl2subtopicname(l2programsubtopicname);
        setl3subtopicname(l3programsubtopicname);

        console.log(l2programsubtopicname);
        console.log(l3programsubtopicname);
      } catch (err) {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      }
    } else {
      history.push('/admin');
    }
  }, []);

  return (
    <>
      <div
        class="modal fade"
        id="ModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">
                Module Details
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={AddSubtopic}>
                <div class="form-group">
                  <label for="testName">Add Module Name :</label>
                  <input
                    class="form-control"
                    id="testName"
                    value={subtopic}
                    onChange={(e) => setsubtopic(e.target.value)}
                    required
                  />
                  <br />
                  {/* {setprogram('L2')} */}
                  {/* <label for="testName">Select Program :</label>
                  <select
                    class="form-control"
                    id="program-name"
                    value={program}
                    onChange={(e) => setprogram(e.target.value)}
                    required
                  >
                    <option value="">Choose...</option>
                    <option value="L2">L2</option>
                    <option value="L3">L3</option>
                  </select> */}
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary ml-3">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

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
          <h4 className="pt-3">Admin Dashboard</h4>
        </div>
      </div>

      <div className="d-none d-sm-block">
        <div className="row pt-2 container-fluid">
          <div className="col-4">
            <img src={logo1} />
          </div>
          <div className="col-4 text-center">
            <h4 className="pt-3 pl-5">Admin Dashboard</h4>
            {/* <Cameraweb /> */}
          </div>
          <div className="col float-right">
            <div className="row pt-2">
              <div className="col text-right ">
                <i class="fas fa-home fa-2x"></i>
                <div
                  onClick={home}
                  style={{ cursor: 'pointer', color: 'blue' }}
                >
                  Home
                </div>
              </div>
              <div className="col-2 text-right">
                <i class="fas fa-arrow-circle-left fa-2x"></i>
                <div
                  onClick={back}
                  style={{ cursor: 'pointer', color: 'blue' }}
                >
                  Back
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-3">
        <div
          class="card w-100"
          style={{ backgroundColor: '#180D5B', color: 'white' }}
        >
          <div class="card-body">
            <div className="row">
              <div className="col d-flex align-items-center">
                <h3>
                  {/* L2 - L3 Program (Data Science & Artificial Intelligence) */}
                  Module Details
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
<br />
      <div className="container-fluid d-none d-sm-block">
        <h3>Existing Modules</h3>
        {/* <h4 className="pt-3 container">L2 Program Modules :-</h4> */}
        <div className="row d-flex justify-content-center">
          {l2subtopicname &&
            l2subtopicname.map((stp, index) => (
              <div
                class="card mt-4  shadow  w-25 m-2"
                style={{
                  border: '2px solid white',
                  borderRadius: '20px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  history.push('/ModulesTest/' + stp._id);
                }}
              >
                <div class="position-absolute badge badge-secondary  px-2 m-2">
                  Module - {index + 1}
                </div>
                <div class="card-body ">
                  {/* <div className="px-2 badage">Module No. - {index + 1}</div> */}
                  <br />
                  <h5
                    class="card-title bg-primary  text-white px-2 py-2"
                    style={{ border: '2px solid ', borderRadius: '20px' }}
                  >
                    {stp.name}
                  </h5>

                  <h6 class="card-text px-2 mb-3 text-danger">
                    Test Added : {stp.events.length}
                  </h6>
                </div>
              </div>
            ))}
        </div>
        {/* <h4 className="pt-3 container">L3 Program Modules :-</h4> */}
        <div className="row d-flex justify-content-center">
          {l3subtopicname &&
            l3subtopicname.map((stp, index) => (
              <div
                class="card mt-4  shadow  w-25 m-2"
                style={{
                  border: '2px solid white',
                  borderRadius: '20px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  history.push('/ModulesTest/' + stp._id);
                }}
              >
                <div class="position-absolute badge badge-secondary  px-2 m-2">
                  Module - {index + 1}
                </div>
                <div class="card-body ">
                  {/* <div className="px-2 badage">Module No. - {index + 1}</div> */}
                  <br />
                  <h5
                    class="card-title bg-primary  text-white px-2 py-2"
                    style={{ border: '2px solid ', borderRadius: '20px' }}
                  >
                    {stp.name}
                  </h5>

                  <h6 class="card-text px-2 mb-3 text-danger">
                    Test Added : {stp.events.length}
                  </h6>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* for mobile */}

      <div className="container-fluid d-block d-sm-none">
        <h4 className="pt-3 container">L2 Program Modules :-</h4>
        <div className="row d-flex justify-content-center">
          {l2subtopicname &&
            l2subtopicname.map((stp, index) => (
              <div
                class="card mt-4  shadow w-100 m-2"
                style={{
                  border: '2px solid white',
                  borderRadius: '20px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  history.push('/ModulesTest/' + stp._id);
                }}
              >
                <div class="position-absolute badge badge-secondary  px-2 m-2">
                  Module - {index + 1}
                </div>
                <div class="card-body ">
                  {/* <div className="px-2 badage">Module No. - {index + 1}</div> */}
                  <br />
                  <h5
                    class="card-title bg-primary  text-white px-2 py-2"
                    style={{ border: '2px solid ', borderRadius: '20px' }}
                  >
                    {stp.name}
                  </h5>

                  <h6 class="card-text px-2 mb-3 text-danger">
                    Test Added : {stp.events.length}
                  </h6>
                </div>
              </div>
            ))}
        </div>
        <h4 className="pt-3 container">L3 Program Modules :-</h4>
        <div className="row d-flex justify-content-center">
          {l3subtopicname &&
            l3subtopicname.map((stp, index) => (
              <div
                class="card mt-4  shadow w-100 m-2"
                style={{
                  border: '2px solid white',
                  borderRadius: '20px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  history.push('/ModulesTest/' + stp._id);
                }}
              >
                <div class="position-absolute badge badge-secondary  px-2 m-2">
                  Module - {index + 1}
                </div>
                <div class="card-body ">
                  {/* <div className="px-2 badage">Module No. - {index + 1}</div> */}
                  <br />
                  <h5
                    class="card-title bg-primary  text-white px-2 py-2"
                    style={{ border: '2px solid ', borderRadius: '20px' }}
                  >
                    {stp.name}
                  </h5>

                  <h6 class="card-text px-2 mb-3 text-danger">
                    Test Added : {stp.events.length}
                  </h6>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="container mt-4 mb-5">
        <h3>Create A New Module</h3>
        <div
          class="card  shadow "
          style={{ border: '2px solid white', borderRadius: '20px' }}
        >
          <div class="card-body ">
            <h5
              class="card-title  text-white px-2 py-2"
              style={{
                border: '2px solid ',
                borderRadius: '20px',
                backgroundColor: '#180D5B',
              }}
            >
              Add New Module
            </h5>
            <p class="card-text px-2 h5">Click here to add new modules</p>
            <p class="card-text text-right">
              <button
                type="button"
                className="btn btn-danger"
                data-toggle="modal"
                data-target="#ModalCenter"
              >
                Add
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminModules;
