import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { createStructuredSelector } from "reselect";
import { currentEmployeeSelect } from "../../redux/employee/employee-selector";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

import EmployeeCentetModal from "../employee-center-modal/EmployeeCentetModal";

function CourseButton({ currentEmployee, itemID }) {
  const [modashow, setModashow] = useState(false);
  const [courseid, setCourseid] = useState("");

  //取得
  async function getCourseID() {
    const request = new Request(
      `http://localhost:5000/api/employeecenter/${currentEmployee.Eid}`,
      {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "appliaction/json",
        }),
      }
    );

    const response = await fetch(request);
    const data = await response.json();
    setCourseid(data);
  }

  //刪除
  async function handleDelete() {
    const confirmDelete = window.confirm("確定要刪除嗎?");
    if (confirmDelete === true) {
      const request = new Request(
        `http://localhost:5000/api/courses/${itemID}`,
        {
          method: "DELETE",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        }
      );

      await fetch(request);

      window.location.reload();
    }
  }

  //載入
  useEffect(() => {
    getCourseID();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  //改變
  useEffect(() => {
    setCourseid(courseid);
  }, [courseid]);

  return (
    <>
      <button
        type="button"
        className="edit"
        onClick={() => {
          setModashow(true);
        }}
      >
        <FaEdit />
      </button>
      <button
        type="button"
        className="delete"
        onClick={() => {
          handleDelete();
        }}
      >
        <FaTrashAlt />
      </button>
      {modashow && (
        <EmployeeCentetModal
          modashow={modashow}
          setModashow={setModashow}
          itemID={itemID}
          courseid={courseid}
          setCourseid={setCourseid}
        />
      )}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  currentEmployee: currentEmployeeSelect,
});

export default withRouter(connect(mapStateToProps)(CourseButton));
