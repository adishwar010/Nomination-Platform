import React from 'react';
import logo1 from '../images/logo.png';
import { useHistory } from 'react-router-dom';

import logo2 from "../images/newLogo.png";
import logo3 from "../images/sail.png";
import *  as XLSX from "xlsx";
import { useState } from 'react';

import axios from "axios";

const ImportData = () => {
  let history = useHistory();
  const logout = () => {
    localStorage.removeItem('Admin');
    history.push('/admin');
  };
  const [item,setItem] = useState({});

  const readExcel = (file) => {
    const promise = new Promise((resolve,reject)=>{

        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);

        fileReader.onload=(e)=>{
            const bufferArray = e.target.result;

            const wb = XLSX.read(bufferArray,{type:'buffer'});

            const wsname = wb.SheetNames[0];

            const ws = wb.Sheets[wsname];

            const data = XLSX.utils.sheet_to_json(ws);

            resolve(data);

        };

        fileReader.onerror=((error)=>{
            reject(error);
        });

    });

    promise.then((d)=>{
        setItem(d);
        console.log("d",d);
    });
  };

  function Onsubmit(event) {
    if (event) {
      event.preventDefault();
    }
    
    console.log("submit",item);

    // for(var j =0;j<item.length; j++){
    //   console.log(item[j]);
    // }
    var myData= [];
    for(const importedData in item){
      myData.push(item[importedData]);
    }

    console.log("mydata", myData);
    // var array = myData[0];
    for(var curr = 0; curr<myData.length;curr++){
        // console.log("data",myData[curr]);
        const EmployeeData = {
          STNO: myData[curr].STNO,
        
          Name: myData[curr].Name,
          PersNO: myData[curr].PersNO,
          Grade: myData[curr].Grade,
          Designation: myData[curr].Designation,
          DepName: myData[curr].DepName,
          Section: myData[curr].Section,
          Mobile: myData[curr].Mobile,
          Email: myData[curr].Email,
          CGMName: myData[curr].CGMName,
          CGMOfficialEmail: myData[curr].CGMOfficialEmail,
          isAllocated: myData[curr].isAllocated,
          // Batch: myData[curr].Batch,
        }
        console.log(`Sr no of employee ${curr}`,EmployeeData);

        const config = {
          headers: {
            Authorization: `Admin ${localStorage.getItem("Admin")}`,
          },
        };

        axios
        .post(`/api/v1/admin/addemployees/addemployee`, EmployeeData , config)
        .then((res) => {
          console.log(res);
          // alert("Question added");
        })
        .catch((err) => {
          console.log(err.response.data);
          console.error(err);


        });

    }
    alert('Employees imported');
    history.push('/adminroutes');

  }
  
  const styles= { borderRadius: '10px',
   margin: '10px',
   "box-shadow": "10px 10px 5px -5px rgba(174,174,174,0.75)",
  " -webkit-box-shadow": "10px 10px 5px -5px rgba(174,174,174,0.75)",
   "-moz-box-shadow": "10px 10px 5px -5px rgba(174,174,174,0.75)" }
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

      <div className="container text-center mt-5 pt-4">
        <input type="file" 
            onChange={(e)=> {
                const file = e.target.files[0];
                readExcel(file);
            }}
        />
        <button
                  className="btn btn-danger "  
                  onClick={Onsubmit} 
                >
                  Import Data
                </button>
      </div>
      
      
      
    </>
  );
};

export default ImportData;
