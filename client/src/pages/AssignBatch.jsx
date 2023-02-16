import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import logo1 from "../images/logo.png";
import logo2 from "../images/newLogo.png";
import logo3 from "../images/sail.png";
import ADSATable from "./ADSATable";
import exportFromJSON from "export-from-json";
import AdminBoxes from "./AdminBoxes";
import AsyncSelect from "react-select/async"

const AssignBatch = (props) => {
  

  let history = useHistory();
  console.log(props.location.state);
  const [det,setdet] = useState([]);
  const [no, setno] = useState(0);
  const [group,setGroup] = useState([]);
  const [singleBatch,setsingleBatch] =useState([]);
  const [data, setData] = useState([]);
  const [id,setId] = useState("");

  function adminHome() {
    history.push("/adminroutes");
    let role = localStorage.getItem('role');
    localStorage.setItem('Dept',role);
  }

  

  const fetchData = async() =>{
    const config = {
      headers: {
        Authorization: `Admin ${localStorage.getItem("Admin")}`,
      },
    };

    try {
      const res = await axios.get(`api/v1/admin/batch/get/allbatch`);
      console.log("resuklt",res);
      return res;
      
    } catch (err) {
      console.log(err.response.data);
      if (err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      }
    }
  }

  

  useEffect(async () => {
    if (localStorage.getItem("Admin")) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem("Admin")}`,
        },
      };
      try {
        
        
          const res = await axios.get(`/api/v1/admin/addemployees/get/employee/${props.location.state}`, config);
         
          const result = await axios.get(`api/v1/admin/batch/get/allbatch`,config);
          console.log("resuklt",result.data);
      

        console.log(res.data);
        // console.log("number",no);
        // setData(res.data.data.users);
        // setName(res.data.Name);
        setdet(res.data);
        setGroup(result.data);

      } catch (err) {
        console.log(err);
        if (err.response && err.response.data) alert(err.response.data.message);
      }
    } else {
    }
  }, []);

  const onddlChange = (e) => {
    
    if (localStorage.getItem("Admin")) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem("Admin")}`,
        },
      };
    
    setId(e.target.value);
    axios.get(`api/v1/admin/batch/get/singlebatch/${e.target.value}`,config).then(
      (response)=>{console.log("response",response);setsingleBatch(response.data)}
    ).then((err)=>console.log(err));
  }}
//mint money
  const onSubmit = () =>{
    const dat = {group : id};
    axios
      .put(`/api/v1/admin/batch/update/addemployee/${props.location.state}`, dat)
      .then((res) => {
        console.log(res);
        alert("Batch Assigned")
        let role = localStorage.getItem('role');
        localStorage.setItem('Dept',role);
        history.push("/adminroutes");

        // console.log(res.data.data.token);
        // localStorage.setItem("token", res.data.data.token);
      })
      .catch((err) => console.error(err));
      // history.push("/adminroutes");
  }

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
        <h3 className="pt-2 mb-4">Employee Details </h3>

        <form>
  <div class="form-row">
  <div class="form-group col-md-6">
      <label for="name">Name</label>
      <input type="text" class="form-control" value={det.Name} />
    </div>
    <div class="form-group col-md-6">
      <label for="inputEmail4">Email</label>
      <input type="email" class="form-control" value={det.Email} />
    </div>
    
  </div>
  <div class="form-row">
  <div class="form-group col-md-6">
  <label for="cgmname">CGM Name</label>
    <input type="text" class="form-control" value={det.CGMName} />
    </div>
    <div class="form-group col-md-6">
    <label for="cgmmail">CGM Email</label>
    <input type="text" class="form-control" value={det.CGMOfficialEmail} />
    </div>
    
  </div>

  <div class="form-row">
  <div class="form-group col-md-6">
  <label for="grade">Grade</label>
    <input type="text" class="form-control" value={det.Grade} />
    </div>
    <div class="form-group col-md-6">
    <label for="designnation">Designation</label>
    <input type="text" class="form-control" value={det.Designation} />
    </div>
    
  </div>
  
  
  <div class="form-group">
    <label for="dept">Department</label>
    <input type="text" class="form-control" value={det.DepName} />
  </div>
  <div class="form-row">
    
    <div class="form-group col-md-4">
      <label for="inputState">Batch</label>
      <select id="inputState" class="form-control" onChange={onddlChange}>
        <option selected>Choose...</option>
        {group.map((group)=>(
          <option key={group.groupNo} value={group._id}>{group.groupNo}</option>
        ))}
      </select>
      
    </div>
    
  </div>
  
  
</form>
        
        <div className="Container mb-4">
          <header className="App-header" style={{ textAlign: "center" }}>
            
            <button type="button" class="btn btn-info" onClick={onSubmit}>
              Assign
            </button>
          </header>
        </div>
        
      </div>
    </>
  );
};

export default AssignBatch;
