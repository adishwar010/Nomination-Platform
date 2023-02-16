import React, { useState, useEffect } from "react";
import "./AdminResult.css";
import logo1 from "../images/logo.png";
import AdminResultData from "../Components/AdminResultData";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Tables from "./Tables";
import AdminBoxes from "./AdminBoxes";
import DataTable from "react-data-table-component";

const columns = [
  {
    name: <b>Student Name</b>,
    selector: "user.name",
    sortable: true,
    grow: 18,
  },
  {
    name: <b>Email</b>,
    selector: "user.email",
    sortable: true,
    grow: 25,
  },
  {
    name: <b>Total Marks</b>,
    selector: "marks",
    sortable: true,
    grow: 10,
    center: true,
  },
  {
    name: <b>Questions Attempted</b>,
    selector: "attempted",
    sortable: true,
    grow: 14,
    center: true,
  },
  {
    name: <b>Correct</b>,
    selector: "correct",
    sortable: true,
    center: true,
  },
  {
    name: <b>Incorrect</b>,
    selector: "incorrect",
    sortable: true,
    center: true,
  },
  {
    name: <b>Total Time Taken</b>,
    selector: (row) => {
      function msToTime(ms) {
        let seconds = (ms / 1000).toFixed(1);
        let minutes = (ms / (1000 * 60)).toFixed(1);
        let hours = (ms / (1000 * 60 * 60)).toFixed(1);
        let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
        if (seconds < 60) return seconds + " Sec";
        else if (minutes < 60) return minutes + " Min";
        else if (hours < 24) return hours + " Hrs";
        else return days + " Days";
      }
      return msToTime(row.timeTaken);
    },
    sortable: true,
    right: true,
    grow: 13,
  },
];

const AdminResult = () => {
  // const columns = React.useMemo(
  //   () => [
  //     {
  //       Header: "Student Name",
  //       accessor: "user.name",
  //     },
  //     {
  //       Header: "Email",
  //       accessor: "user.email",
  //     },
  //     {
  //       Header: "Total Marks",
  //       accessor: "marks",
  //     },
  //     {
  //       Header: "Questions Attempted",
  //       accessor: "attempted",
  //     },
  //     {
  //       Header: "Correct",
  //       accessor: "correct",
  //     },
  //     {
  //       Header: "InCorrect",
  //       accessor: "incorrect",
  //     },
  //     {
  //       Header: "Total Time Taken",
  //       accessor: (row) => {
  //         function msToTime(ms) {
  //           let seconds = (ms / 1000).toFixed(1);
  //           let minutes = (ms / (1000 * 60)).toFixed(1);
  //           let hours = (ms / (1000 * 60 * 60)).toFixed(1);
  //           let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
  //           if (seconds < 60) return seconds + " Sec";
  //           else if (minutes < 60) return minutes + " Min";
  //           else if (hours < 24) return hours + " Hrs";
  //           else return days + " Days";
  //         }
  //         return msToTime(row.timeTaken);
  //       },
  //     },
  //   ],
  //   []
  // );

  let history = useHistory();
  const [pending, setPending] = useState(true);

  const [data, setData] = useState([]);

  const [result, setresult] = useState([]);
  const [testname, settestname] = useState("");
  function adminHome() {
    history.push("/adminroutes");
  }
  useEffect(async () => {
    if (localStorage.getItem("Admin")) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem("Admin")}`,
        },
      };
      try {
        const res = await axios.get(
          "/api/v1/admin/result/dsat/generateResult",
          config
        );
        // console.log(res);
        setPending(false);
        setresult(res.data.data.results);
        settestname(res.data.data.results[0].testName);
        setData(res.data.data.results);
        // console.log(res.data.data.results);
        // console.log(result);

        // console.log(result.length);
      } catch (err) {
        console.log(err);
        // console.log(err.response.data.msg);
        if (err.response && err.response.data) alert(err.response.data.message);
      }
      // alert("Signin Complete");
      // history.push("/addingquestions");
    } else {
      history.push("/admin");
    }
  }, []);

  // const Sendmail = () => {
  //   if (localStorage.getItem("Admin")) {
  //     const config = {
  //       headers: {
  //         Authorization: `Admin ${localStorage.getItem("Admin")}`,
  //       },
  //     };
  //     axios
  //       .get("/api/v1/admin/result/sendMail", config)
  //       .then(function (res) {
  //         // console.log(res);
  //         alert("Reault Mail have been sent to the students");
  //         console.log("Result Mail send to students");
  //       })
  //       .catch(function (error) {
  //         // handle error
  //         console.log(error);
  //       });
  //   }
  // };

  return (
    <>
      <div className="container-fluid admn">
        <div className="row ml-3 ">
          <Link to="/adminroutes">
            <img src={logo1} />
          </Link>
        </div>
      </div>

      <AdminBoxes />

      <div className="container text-right mt-3 mb-4">
        <button className="btn btn-danger" onClick={adminHome}>
          Go Back
        </button>
      </div>

      <div className="container text-center ">
        <h3 className=" pb-3">Students Result</h3>
        {/* <Tables /> */}
        <DataTable
          // title="Arnold Movies"
          columns={columns}
          data={data}
          pagination={true}
          progressPending={pending}
          // progressComponent={<LinearIndeterminate />}
          persistTableHead
        />
      </div>
    </>
  );
};

export default AdminResult;
