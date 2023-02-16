import React, { useState, useEffect } from "react";
import logo1 from "../../images/logo.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useTable, useSortBy } from "react-table";

const TestQuestionsDatabase = (props) => {
  let history = useHistory();
  const [question, setquestion] = useState([]);
  const [questionadded, setquestionadded] = useState(0);

  useEffect(async () => {
    if (localStorage.getItem("Admin")) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem("Admin")}`,
        },
      };
      try {
        const res = await axios.get(
          "/api/v1/admin/test/" + props.match.params.id,
          config
        );
        console.log(res.data.data.test.questionBank);
        setquestion(res.data.data.test.questionBank);
        setquestionadded(res.data.data.test.questionBank.length);
      } catch (err) {
        console.log(err);
        if (err.response && err.response.data) alert(err.response.data.message);
      }
    } else {
      history.push("/admin");
    }
  }, []);

  function questionHome() {
    history.push("/testdetails/" + props.match.params.id);
  }

  const columns = React.useMemo(
    () => [
      {
        Header: <h4>Question</h4>,
        accessor: "text",
      },
      {
        Header: "Option_A",
        accessor: "A.text",
      },
      {
        Header: "Option_B",
        accessor: "B.text",
      },
      {
        Header: "Option_C",
        accessor: "C.text",
      },
      {
        Header: "Option_D",
        accessor: "D.text",
      },
      {
        Header: "Answer",
        accessor: "answer",
      },
      {
        Header: "Taxonomy",
        accessor: "difficulty",
      },
      {
        Header: "Topic",
        accessor: "topic",
      },
      {
        Header: "Sub Topic",
        accessor: "subtopic",
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
        <div className="row  pt-2 ml-3 pb-2">
          <img src={logo1} />
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

      <div className="container text-center pt-4">
        <h4 className="text-danger">Questions Added : {questionadded}</h4>
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

export default TestQuestionsDatabase;
