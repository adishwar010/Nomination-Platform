import React, { useState, useEffect } from 'react';
import logo1 from '../../images/logo.png';
import l2prog from '../../images/l2prog.jpg';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import 'sweetalert/dist/sweetalert.css';
import swal from 'sweetalert';

// const batch = [
//   { Students: "50" },
//   { Students: "40" },
//   { Students: "30" },
//   { Students: "20" },
//   { Students: "20" },
//   { Students: "40" },
//   { Students: "30" },
//   { Students: "20" },
// ];

const CreateBatch = () => {
  let history = useHistory();
  const [studno, setstudno] = useState('');
  const [batch, setbatch] = useState([]);
  const [flag, setflag] = useState(1);

  useEffect(async () => {
    setflag(0);
    if (localStorage.getItem('Admin')) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem('Admin')}`,
        },
      };
      try {
        const res = await axios.get('/api/v1/admin/course/batch', config);
        setbatch(res.data.data.batches);
        console.log(res);
      } catch (err) {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      }
    } else {
      history.push('/admin');
    }
  }, [flag]);

  const NewBatch = async () => {
    let postData = {
      maxStudent: studno,
      // totalNumberOfStudents: studno,
    };
    console.log(postData);
    if (localStorage.getItem('Admin')) {
      // const config = {
      //   headers: {
      //     Authorization: `Admin ${localStorage.getItem("Admin")}`,
      //   },
      // };
      try {
        const resp = await axios.post('/api/v1/admin/course/batch', postData, {
          headers: {
            Authorization: `Admin ${localStorage.getItem('Admin')}`,
          },
        });
        console.log(resp.data);
        swal(
          {
            title: 'Batch created Succesfully',
            text: 'Successfully created new batch',
            type: 'success',
            confirmButtonColor: '#0E3B7D',
            confirmButtonText: 'Ok',
            closeOnConfirm: true,
            customClass: 'Custom_Cancel',
          },
          function (isConfirm) {
            if (isConfirm) {
              // window.location.reload();
            } else {
              // window.location.reload();
            }
          }
        );
        setflag('');
      } catch (err) {
        console.log(err.response.data.msg);
        if (err.response && err.response.data) {
          console.log(err.response.data);
        }
      }
    } else {
      history.push('/admin');
    }
  };

  function progHome() {
    history.push('/trainingadmin');
  }

  return (
    <>
      {/* For Mobile */}
      <div className="d-block d-sm-none">
        <div className="row pt-2">
          <div className="col">
            <img src={logo1} />
          </div>
          <div className="col text-right">
            <div className=" pt-2">
              <i class="fas fa-arrow-circle-left fa-2x"></i>
              <div className=" text-right pt-2"> {}</div>
              <div
                onClick={progHome}
                style={{ cursor: 'pointer', color: 'blue' }}
              >
                Back
              </div>
            </div>
          </div>
        </div>
        <div className="container text-center">
          <h4 className="pt-3">Admin</h4>
        </div>
      </div>

      <div className="d-none d-sm-block">
        <div className="row pt-2 container-fluid">
          <div className="col-4">
            <img src={logo1} />
          </div>
          <div className="col-4 text-center">
            <h4 className="pt-3 pl-5">Admin Dashboard</h4>
          </div>
          <div className="col float-right">
            <div className="row pt-2">
              <div className="col text-right pt-2"> {}</div>
              <div className="col-2 text-right">
                <i class="fas fa-arrow-circle-left fa-2x"></i>
                {/* <i class="fas fa-home fa-2x"></i> */}
                <div
                  onClick={progHome}
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
          style={{
            border: '2px solid black',
            borderRadius: '20px',
            backgroundColor: '#180D5B',
            color: 'white',
          }}
        >
          <div class="card-body">
            <div className="row">
              <div className="col d-flex align-items-center">
                <h3>
                  Ikigai's Assessment Platform
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

      <div className="pt-4 container">
        <div className="row">
          <div className="col">
            All Batches {'('}
            {batch && batch.length}
            {')'}
          </div>
        </div>
      </div>

      <div>
        <div className="container  mb-5 d-none d-sm-block">
          <div class="card  border-0" style={{ width: 'auto' }}>
            <div className="row">
              {/* <div className="col">
                <div class="card shadow border-0">
                  <div class="card-body">
                    <h5 class="card-title mb-4">Create New Batch</h5>
                    Enter No. of Students for new Batch :
                    <div className="d-flex justify-content-center mt-3">
                      <input
                        type="number"
                        style={{
                          width: "73px",
                          border: "2px solid red",
                          borderRadius: "15px",
                        }}
                        class="form-control"
                        placeholder="No."
                        onChange={(e) => setstudno(e.target.value)}
                      />
                    </div>
                    <button className="mt-4 btn btn-primary" onClick={NewBatch}>
                      Create Batch
                    </button>
                  </div>
                </div>
              </div> */}
              <div className="col">
                {batch &&
                  batch.map((stp, index) => (
                    // <div
                    //   class="card text-center shadow rounded-lg border-0"
                    //   style={{ backgroundColor: "turquoise" }}
                    // >
                    //   <div class="card-body  ">
                    //     <h5 class="card-title">Batch {index + 1}</h5>
                    //     <h6 class="card-subtitle mt-4 text-muted">
                    //       L2 - Program
                    //     </h6>
                    //     <h6 className="pt-3">
                    //       Create Test / Add Questions
                    //       <br /> for Batch
                    //     </h6>
                    //     <button
                    //       className="btn btn-danger mt-3"
                    //       onClick={() => {
                    //         history.push("/adminmodule/" + stp._id);
                    //       }}
                    //     >
                    //       Add Tests
                    //     </button>
                    //   </div>
                    // </div>

                    <div
                      class="card mt-4   "
                      style={{
                        border: '2px solid black',
                        borderRadius: '20px',
                        backgroundColor: 'turquoise',
                      }}
                    >
                      <div class="card-body row">
                        <div className="col ">
                          <p class="card-text ">
                            <h5>Batch {index + 1}</h5>
                          </p>
                        </div>
                        <div className="col d-flex ">
                          <p class="card-text " style={{ color: '#180D5B' }}>
                            <h6>
                              <i class="fa fa-tasks" aria-hidden="true"></i>
                              Program
                            </h6>
                          </p>
                        </div>
                        <div
                          className="col d-flex align-items-center justify-content-end"
                          style={{ color: 'black' }}
                        >
                          <h6 className="mt-3">Create Test / Add Questions</h6>
                        </div>
                        <div className="col d-flex align-items-center justify-content-end">
                          <button
                            className="btn btn-danger mt-3"
                            onClick={() => {
                              history.push('/adminmodule/' + stp._id);
                            }}
                          >
                            Add Tests
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* for mobile */}

        <div className="container mb-5 d-block d-sm-none">
          <div class="card  border-0" style={{ width: 'auto' }}>
            <div className="row">
              <div className="col">
                {batch &&
                  batch.map((stp, index) => (
                    <div
                      class="card mt-4   "
                      style={{
                        border: '2px solid black',
                        borderRadius: '20px',
                      }}
                    >
                      <div class="card-body row">
                        <div className="col ">
                          <p class="card-text ">
                            <h5>Batch {index + 1}</h5>
                          </p>
                        </div>
                        <div className="col d-flex justify-content-end">
                          <p class="card-text " style={{ color: '#180D5B' }}>
                            <h6>
                              <i class="fa fa-tasks" aria-hidden="true"></i>
                              L2/L3 - Program
                            </h6>
                          </p>
                        </div>
                      </div>
                      <div className="row mb-3 px-3 ">
                        <div className="col mt-3">
                          <h6 className="mt-3"></h6>
                        </div>
                        <div className="col d-flex justify-content-end">
                          <button
                            className="btn btn-danger mt-3"
                            onClick={() => {
                              history.push('/adminmodule/' + stp._id);
                            }}
                          >
                            Add Tests
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBatch;
