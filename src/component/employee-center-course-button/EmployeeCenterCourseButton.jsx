import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { createStructuredSelector } from "reselect";
import { currentEmployeeSelect } from "../../redux/employee/employee-selector";

import EmployeeCentetModal from "../employee-center-modal/employeeCentetModal";

function CourseButton({ currentEmployee, itemID }) {
  const [modashow, setModashow] = useState(false);
  const [courseid, setCourseid] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [courseTime, setCourseTime] = useState("");
  const [courseHour, setCourseHour] = useState("");
  const [courseQuoda, setCourseQuoda] = useState("");
  const [categoryName, setCategoryName] = useState("");

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
    // console.log(courseid)
  }


  async function handleDelete() {
    const request = new Request(`http://localhost:5000/api/courses/${itemID}`, {
      method: "DELETE",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });

    await fetch(request);

    window.location.reload()
  }


  //載入
  useEffect(() => {
    getCourseID();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  //改變
  useEffect(() => {
    setCourseid(courseid);
    // console.log(courseid)
    
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
        編輯
      </button>
      <button
        type="button"
        className="delete"
        onClick={() => {
          handleDelete();
        }}
      >
        刪除
      </button>
      {modashow && (
        <EmployeeCentetModal
          modashow={modashow}
          setModashow={setModashow}
          itemID={itemID}
          courseid={courseid}
          setCourseid={setCourseid}
          courseName={courseName}
          setCourseName={setCourseName}
          courseTime={courseTime}
          setCourseTime={setCourseTime}
          courseHour={courseHour}
          setCourseHour={setCourseHour}
          courseQuoda={courseQuoda}
          setCourseQuoda={setCourseQuoda}
          categoryName={categoryName}
          setCategoryName={setCategoryName}
        />
      )}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  currentEmployee: currentEmployeeSelect,
});

export default withRouter(connect(mapStateToProps)(CourseButton));
