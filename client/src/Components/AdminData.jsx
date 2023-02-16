import React from "react";

import { Link } from "react-router-dom";
const AdminData = (props) => {
  // <div className="row pt-2 mt-3 bg-light rounded pb-2 shadow">
  //   <div className="col">John</div>
  //   <div className="col">{res.testName}</div>
  //   <div className="col">56789</div>
  //   <div className="col">457690</div>
  //   <div className="col">{res.marks}</div>
  //   <div className="col">{res.totalQuestion}</div>
  //   <div className="col">{res.correct}</div>
  //   <div className="col">{res.incorrect}</div>
  //   <div className="col">
  //     <img src={dwnicon} />
  //     <span className="ml-5"></span>
  //     <img src={share} />
  //   </div>
  // </div>
  return (
    <>
      <tr>
        <td>
          <Link to="/adminresult">{props.testname}</Link>
        </td>
        <td>{props.resultlen}</td>
      </tr>
    </>
  );
};

export default AdminData;
