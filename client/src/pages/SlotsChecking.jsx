import React, { useState, useEffect } from "react";
import logo1 from "../images/logo.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useTable, usePagination } from "react-table";
import AdminBoxes from "./AdminBoxes";

const SlotsChecking = () => {
  const [data, setData] = useState([]);
  let history = useHistory();
  useEffect(async () => {
    if (localStorage.getItem("Admin")) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem("Admin")}`,
        },
      };
      try {
        const res = await axios.get("/api/v1/admin/timeslots", config);

        // console.log(res);
        setData(res.data.data.timeslots);
      } catch (err) {
        console.log(err);
        // if (err.response.data && err.response.data.message) {
        //   alert(err.response.data.message);
        // }
      }
    } else {
      history.push("/admin");
    }
  }, []);

  function adminHome() {
    history.push("/adminroutes");
  }

  async function onStudDetail(id) {
    history.push({ pathname: "/studentsperslot", state: { id: id } });
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "Slot Number",
        accessor: "slotNumber",
      },
      {
        Header: "Test Timing",
        accessor: (row) => {
          var date = new Date(row.startTime);
          var date2 = new Date(row.endTime);
          const time = new Date(date).toLocaleTimeString("en", {
            timeStyle: "short",
            hour12: true,
            timeZone: "IST",
          });
          const time2 = new Date(date2).toLocaleTimeString("en", {
            timeStyle: "short",
            hour12: true,
            timeZone: "IST",
          });
          return (
            <div>
              {time}
              {"-"}
              {time2}
            </div>
          );
        },
      },
      {
        Header: "Test Date",
        accessor: (row) => {
          // var date = new Date(row.endTime).toString();
          var date = new Date(row.startTime);
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var dt = date.getDate();

          if (dt < 10) {
            dt = "0" + dt;
          }
          if (month < 10) {
            month = "0" + month;
          }
          return <div>{dt + "-" + month + "-" + year}</div>;
        },
      },
      {
        Header: "Students",
        Cell: ({ cell }) => (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => onStudDetail(cell.row.original._id)}
          >
            <button type="button" class="btn btn-info">
              Check
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <>
      <div className="container-fluid admn">
        <div className="row  pt-2 ml-3 pb-2">
          <img src={logo1} />
        </div>
      </div>

      <AdminBoxes />

      <div className="container mt-3 text-white">
        <button
          className="btn float-right"
          style={{ backgroundColor: "#0E3B7D", color: "white" }}
          onClick={adminHome}
        >
          Go Back
        </button>
      </div>

      <div className="text-center container mt-5 pt-3">
        <h2>Students Test Slots </h2>
      </div>

      <div class="table-responsive mt-3 text-center">
        <table
          {...getTableProps()}
          className="table  table-hover mx-auto w-auto"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      // padding: "10px",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      paddingRight: "50px",
                      paddingLeft: "50px",
                      border: "solid 1px gray",
                      cursor: "pointer",
                    }}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
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

        <div className="pagination ">
          <div className="container text-center mb-5">
            <span className="">
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <div className="mt-3">
              <button
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
                className="btn btn-primary"
              >
                {"<<"}
              </button>{" "}
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className="btn btn-primary"
              >
                {"<"}
              </button>{" "}
              <button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className="btn btn-primary"
              >
                {">"}
              </button>{" "}
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
                className="btn btn-primary"
              >
                {">>"}
              </button>{" "}
            </div>
            <br />
            <span className="">
              Go to page:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: "30px" }}
              />
            </span>{" "}
            <span className="ml-3">
              Rows Per Page:{" "}
              <select
                value={pageSize}
                className=""
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlotsChecking;
