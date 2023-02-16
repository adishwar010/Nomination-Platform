import React from "react";
import dwnicon from "../images/icons/dwnicon.png";
import share from "../images/icons/share.png";

const AdminResultData = (props) => {
  const listitems = props.result.map((res) => (
    <tr>
      {/* {console.log(res)} */}
      <td>{res.user && res.user.name}</td>
      <td>{res.testName}</td>
      <td>{res.user && res.user.email}</td>
      {/* <td>457690</td> */}
      <td>{res.marks}</td>
      <td>{res.totalQuestion}</td>
      <td>{res.correct}</td>
      <td>{res.incorrect}</td>
      <td>
        <img src={dwnicon} />
        <span className="ml-5"></span>
        <img src={share} />
      </td>
    </tr>

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
  ));
  return <>{listitems}</>;
};

export default AdminResultData;
