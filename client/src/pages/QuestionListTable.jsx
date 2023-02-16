import React, { useEffect, useState } from "react";

import { useTable, useSortBy } from "react-table";
import axios from "axios";
import logo1 from "../images/logo.png";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const QuestionListTable = () => {
  let history = useHistory();

  const [question, setquestion] = useState([]);

  useEffect(async () => {
    if (localStorage.getItem("questionAdd")) {
      const config = {
        headers: {
          Authorization: `questionAdd ${localStorage.getItem("questionAdd")}`,
        },
      };
      try {
        const res = await axios.get("/api/v1/admin/questions/list", config);
        // console.log(res.data.data.questions);
        setquestion(res.data.data.questions);
      } catch (err) {
        console.log(err);
        if (err.response && err.response.data) alert(err.response.data.message);
      }
    } else {
      history.push("/questionaddlogin");
    }
  }, []);

  function questionHome() {
    history.push("/questionroutes");
  }

  async function onDelete(id) {
    const config = {
      headers: {
        Authorization: `questionAdd ${localStorage.getItem("questionAdd")}`,
      },
    };

    try {
      const res = await axios.delete(`/api/v1/admin/questions/${id}`, config);
      alert(res.data.message);
    } catch (err) {
      console.log(err.response.data);
      if (err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      }
    }
  }

  const columns = React.useMemo(
    () => [
      {
        Header: <h4>Question</h4>,
        accessor: "text",
      },
      {
        Header: "Option_1",
        accessor: "A.text",
      },
      {
        Header: "Option_2",
        accessor: "B.text",
      },
      {
        Header: "Option_3",
        accessor: "C.text",
      },
      {
        Header: "Option_4",
        accessor: "D.text",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Delete Question",
        // accessor: "delete",
        Cell: ({ cell }) => (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => onDelete(cell.row.original._id)}
          >
            <i style={{ color: "#C82333" }} class="fas fa-trash"></i>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: question,
      },
      useSortBy
    );

  return (
    <>
      <div className="container-fluid admn">
        <div className="row ml-3 ">
          <Link to="/questionroutes">
            <img src={logo1} />
          </Link>
        </div>
      </div>

      <div className="container mt-3 text-white">
        <button
          className="btn float-right"
          style={{ backgroundColor: "#0E3B7D", color: "white" }}
          onClick={questionHome}
        >
          Go Back
        </button>
      </div>

      <div className="container text-center pt-5">
        <h2>Questions Database</h2>
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
    </>
  );
};

export default QuestionListTable;
