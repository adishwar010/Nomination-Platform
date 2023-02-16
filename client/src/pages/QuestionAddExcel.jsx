import React, { useState, useEffect } from "react";
import AdminSidePanel from "../Components/AdminSidePanel";
import logo1 from "../images/logo.png";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";

const QuestionAdd = (props) => {
  let history = useHistory();
  const testId = props.match.params.id;
  console.log("test id",testId);
  const [file,setFile] =useState(null);
  const [fileName,setFileName] = useState(null);
  const[sheetNames,setSheetNames] = useState([]);
  const[sheetData,setSheetData] = useState({});
  const[data,setData]=useState([]);

  const acceptableFileName = ['xlsx','xls'];

  
  const readDataFromExcel = (data) =>{

      const wb  = XLSX.read(data);
      
      setSheetNames(wb.SheetNames);
      console.log(wb);

      // Loop through sheets assign data from sheet to object

      var mySheetData = {};
      
      for(var i =0;i<wb.SheetNames.length;i++){
        let sheetName = wb.SheetNames[i];

        const worksheet = wb.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        mySheetData[sheetName] = jsonData;
        

        console.log(sheetName);
      }

      setSheetData(mySheetData);

      
      console.log("mySheetdata",mySheetData);
  }



  const checkFileName = (name) =>{
      return acceptableFileName.includes(name.split(".").pop().toLowerCase());
  }
  const handleFile = async (e)=> {
      // console.log(e);
      const myfile = e.target.files[0];
      if(!myfile){
        return;
      }
      if(!checkFileName(myfile.name)){
        alert("Invalid file type");
        return;
      }

      // adding xlsx data
      const data = await myfile.arrayBuffer();
      
      readDataFromExcel(data);

      setFile(myfile);
      setFileName(myfile.name);
  }

  function Onsubmit(event) {
    if (event) {
      event.preventDefault();
    }
    
    console.log("submit",sheetData);

    // for(var j =0;j<sheetData.length; j++){
    //   console.log(sheetData[j]);
    // }
    var myData= [];
    for(const importedData in sheetData){
      myData.push(sheetData[importedData]);
    }

    console.log("mydata", myData);
    var array = myData[0];
    for(var curr = 0; curr<array.length;curr++){
        console.log("data",array[curr]);
        const questiondata = {
          questionText: array[curr].text,
        options: [ {text: array[curr].Atext, /* imageUrl: array[curr].AimageUrl*/}, 
        {text: array[curr].Btext, /* imageUrl: array[curr].BimageUrl*/},
        {text: array[curr].Ctext, /* imageUrl: array[curr].CimageUrl*/},
        {text: array[curr].Dtext, /* imageUrl: array[curr].DimageUrl*/}
          ],
          category: array[curr].category,
          answer: array[curr].answer,
          difficulty: array[curr].difficulty,
          topic: array[curr].topic,
          subtopic: array[curr].subtopic,
        }
        console.log("qd",questiondata)

        const config = {
          headers: {
            Authorization: `Admin ${localStorage.getItem("Admin")}`,
          },
        };

        axios
        .post(`/api/v1/admin/questions/add/${testId}`, questiondata , config)
        .then((res) => {
          // console.log(res);
          // alert("Question added");
        })
        .catch((err) => {
          console.log(err.response.data);
          console.error(err);
        });

    }
    alert("Question added");

    // axios
    //   .post(`/excel/uploadfile/${testId}`,data,{
    //     headers: {
    //       Authorization: `Admin ${localStorage.getItem(
    //         "Admin"
    //       )}`,
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((res) => {
    //     // console.log(res);
    //     alert("Question added");
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data);
    //     console.error(err);
    //   });

  }

  useEffect(() => {
    if (localStorage.getItem("Admin")) {
      // history.push("/Instdsat");
    } else {
      history.push("/admin");
    }
  });
  function adminHome() {
    history.push("/adminroutes");
  }

  return (
    <>
      <div className="container-fluid admn">
        <div className="row  pt-2 ml-3 pb-2">
          <img src={logo1} />
        </div>
      </div>


      <div className="container-fluid mt-4">
      <a href="https://docs.google.com/spreadsheets/d/1JUUj_WSOsNJyoPrcACFzWZ-trQN2K5kiGYiwArtoOlE/edit?usp=sharing">Format for XLSX file</a>
          <br/>
        <div className="row">
        
          <div className="col border border-dark rounded ml-2 mr-2 pt-3 mb-3">
            <form>

              <div class="row mt-5 pl-2">
              
                <div class="col">
                <label for="op1">ID: </label>
                  <input
                    type="text"
                    class="form-control"
                    id="op1"
                    placeholder=""
                    value={testId}
                    required
                  />
                </div>
                <div class="col">
                  {fileName && <label for="file">File: {fileName}</label>}
                  {!fileName && <label for="file">Please Upload File</label>}
                  <input
                    type="file"
                    class="form-control-file"
                    id="file"
                    name="file"
                    onChange={handleFile}
                  />
                </div>
                
              </div>

              

              
              

              

              <div className="text-center mt-5 mb-5">
                <button
                  type="submit"
                  class="btn text-white"
                  style={{ backgroundColor: "#0E3B7D" }}
                  onClick={Onsubmit}
                >
                  Submit Question
                </button>
              </div>
            </form>
          </div>
          {/* <div className="col">
            <AdminSidePanel cnt={count} />
          </div> */}
        </div>
      </div>
      <div className="container text-center mt-5 mb-5">
        <button className="btn btn-danger" onClick={adminHome}>
          Go Back
        </button>
      </div>
    </>
  );
};

export default QuestionAdd;
