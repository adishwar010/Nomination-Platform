import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import logo1 from "../images/logo.png";
import logo2 from "../images/newLogo.png";
import logo3 from "../images/sail.png";
import ADSATable from "./ADSATable";
import exportFromJSON from "export-from-json";
import AdminBoxes from "./AdminBoxes";

const ADSATreg = () => {
  const fileName = "A-DSAT Registration";
  const exportType = "xls";

  const ExportToExcel = () => {
    exportFromJSON({ data, fileName, exportType });
  };

  let history = useHistory();
  const [no, setno] = useState(0);
  const [data, setData] = useState([]);

  function adminHome() {
    history.push("/adminroutes");
    let role = localStorage.getItem('role');
    localStorage.setItem('Dept',role);
  }

  useEffect(async () => {
    if (localStorage.getItem("Admin")) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem("Admin")}`,
        },
      };
      try {
        // const dep = localStorage.getItem("Dept");
        // console.log(dep);
        
        // // const res = await axios.get(`/api/v1/admin/employeeStats/all`, config);
        // // if()
        // const res = await axios.get(`/api/v1/admin/employeeStats/${dep}`, config);
        let res;
        
        const dep = localStorage.getItem("Dept");
        if(dep!="HR"){
          const result = await axios.get(`/api/v1/admin/employeeStats/${dep}`, config);
          res = result;
        }else{
          const result = await axios.get("/api/v1/admin/employeeStats/all", config);
          res  = result
        }

        console.log(res);
        console.log(res.data.data.numberOfUserRegistered);
        setno(res.data.data.numberOfUserRegistered);
        // console.log("number",no);
        setData(res.data.data.users);
      } catch (err) {
        console.log(err);
        if (err.response && err.response.data) alert(err.response.data.message);
      }
    } else {
    }
  }, []);

  return (
    <>
      <div className="container-fluid admn d-flex justify-content-between">
        <div className="row  pt-2 ml-3 pb-2">
          <img src={logo2} />
          <img src={logo3} />
        </div>
        <div className="row  pt-2 ml-3 pb-2">
          <img src={logo1} />
        </div>
      </div>

      {/* <AdminBoxes /> */}

      <div className="container mt-3 text-white">
        <button
          className="btn float-right"
          style={{ backgroundColor: "#0E3B7D", color: "white" }}
          onClick={adminHome}
        >
          Go Back
        </button>
      </div>

      <div className="container text-center pt-5">
        <h3 className="pt-2 mb-4">Employee Details</h3>
        <div className="mb-4">
          <h6>Total No. of employees assigned to you :{" " + no}</h6>
        </div>
        <div className="Container mb-4">
          <header className="App-header" style={{ textAlign: "center" }}>
            <button type="button" class="btn btn-info" onClick={ExportToExcel}>
              Export To Excel
            </button>
          </header>
        </div>
        <ADSATable />
      </div>
    </>
  );
};

export default ADSATreg;
