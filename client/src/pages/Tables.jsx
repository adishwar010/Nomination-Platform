import React, { useEffect, useState } from "react";

import { useTable, useSortBy } from "react-table";
import axios from "axios";
const Tables = () => {
  const [data, setData] = useState([]);

  // Using useEffect to call the API once mounted and set the data
  useEffect(async () => {
    if (localStorage.getItem("Admin")) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem("Admin")}`,
        },
      };
      try {
        const res = await axios.get(
          "api/v1/admin/result/dsat/generateResult",
          config
        );
        // console.log(res.data.data.results);
        setData(res.data.data.results);
      } catch (err) {
        console.log(err);
        if (err.response && err.response.data) alert(err.response.data.message);
      }
    } else {
    }
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Student Name",
        accessor: "user.name",
      },
      {
        Header: "Email",
        accessor: "user.email",
      },
      {
        Header: "Total Marks",
        accessor: "marks",
      },
      {
        Header: "Questions Attempted",
        accessor: "attempted",
      },
      {
        Header: "Correct",
        accessor: "correct",
      },
      {
        Header: "InCorrect",
        accessor: "incorrect",
      },
      {
        Header: "Total Time Taken",
        accessor: (row) => {
          function msToTime(ms) {
            let seconds = (ms / 1000).toFixed(1);
            let minutes = (ms / (1000 * 60)).toFixed(1);
            let hours = (ms / (1000 * 60 * 60)).toFixed(1);
            let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
            if (seconds < 60) return seconds + " Sec";
            else if (minutes < 60) return minutes + " Min";
            else if (hours < 24) return hours + " Hrs";
            else return days + " Days";
          }
          return msToTime(row.timeTaken);
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <>
      <div class="table-responsive">
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
    </>
  );
};

export default Tables;
