import React, { useState, useEffect } from "react";
import logo1 from "../../images/logo.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useTable, useSortBy } from "react-table";
import exportFromJSON from "export-from-json";
const Loader = () => <div className="loader"></div>;

const ResultData = (props) => {
  const [loading, setloading] = useState(true);
  let history = useHistory();

  const hideLoader = () => {
    setloading(false);
  };

  const [studentdata, setstudentdata] = useState([]);
  const [test, settest] = useState([]);
  const [testname, settestname] = useState("");

  const fileName = testname;
  const exportType = exportFromJSON.types.csv;

  const ExportToExcel = () => {
    exportFromJSON({ data: studentdata, fileName, exportType });
  };

  useEffect(async () => {
    if (localStorage.getItem("Admin")) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem("Admin")}`,
        },
      };
      try {
        const res = await axios.get(
          "/api/v1/admin/excelData/testNotGiven/" + props.match.params.id,
          config
        );
        const res1 = await axios.get(
          "/api/v1/admin/test/" + props.match.params.id,
          config
        );

        hideLoader();
        console.log(res.data.data.data);
        setstudentdata(res.data.data.data);
        settest(res1.data.data.test);
        settestname(res1.data.data.test.testName);
      } catch (err) {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      }
    } else {
      history.push("/admin");
    }
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Contact No.",
        accessor: "phone",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: studentdata,
      },
      useSortBy
    );

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
                onClick={() => {
                  history.push("/modulewiseresult");
                }}
                style={{ cursor: "pointer", color: "blue" }}
              >
                Back
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-none d-sm-block admn">
        <div className="row pt-2 container-fluid ">
          <div className="col-4">
            <img src={logo1} />
          </div>
          <div className="col-4 text-center">
            {/* <h4 className="pt-3 pl-5">Admin Dashboard</h4> */}
          </div>
          <div className="col float-right">
            <div className="row pt-2">
              <div className="col text-right pt-2"> {}</div>
              <div className="col-2 text-right">
                <i class="fas fa-arrow-circle-left fa-2x"></i>
                <div
                  onClick={() => {
                    history.push("/modulewiseresult");
                  }}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  Back
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container text-center pt-4">
        <h2>Students Not Given The Test</h2>
      </div>

      <div className="container text-center pt-4 ">
        <h5>{props.match.params.type}</h5>
        <h5>Test Name : {test && test.testName}</h5>
      </div>

      <div className="container text-center pt-2 text-danger">
        <h4>No. of Students : {studentdata && studentdata.length}</h4>
      </div>

      <div className="Container mt-3">
        <header className="App-header" style={{ textAlign: "center" }}>
          <button type="button" class="btn btn-info" onClick={ExportToExcel}>
            Export To Excel
          </button>
        </header>
      </div>

      <div className="container pt-4 mb-3 text-center">
        <div class="table-responsive ">
          <table
            {...getTableProps()}
            className="table  table-hover mx-auto w-auto"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      style={{
                        // padding: "10px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        paddingRight: "30px",
                        paddingLeft: "30px",
                        border: "solid 1px gray",
                        cursor: "pointer",
                      }}
                    >
                      {column.render("Header")}
                      {/* Add a sort direction indicator */}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            " 🔽"
                          ) : (
                            " 🔼"
                          )
                        ) : (
                          <i class="fa fa-fw fa-sort"></i>
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          style={{
                            padding: "10px",
                            border: "solid 1px gray",
                          }}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {loading ? <Loader /> : null}
    </>
  );
};

export default ResultData;
