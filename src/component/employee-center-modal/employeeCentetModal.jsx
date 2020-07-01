import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./EmployeeCentetModal.scss";
import moment from "moment";

import { createStructuredSelector } from "reselect";
import { currentEmployeeSelect } from "../../redux/employee/employee-selector";

function EmployeeCentetModal({
  currentEmployee,
  setModashow,
  itemID,
  courseid,
}) {
  const [courseName, setCourseName] = useState("");
  const [courseTime, setCourseTime] = useState("");
  const [courseHour, setCourseHour] = useState("");
  const [courseQuoda, setCourseQuoda] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const courseData = courseid.filter((item) => {
    return item.courseId === itemID;
  });

  const courseValue = courseData.map((item) => {
    return (
      <>
        課程名稱：
        <input
          className=""
          type="text"
          defaultValue={item.courseName}
          onChange={(event) => {
            setCourseName(event.target.value);
          }}
        />
        開課時間：
        <input
          type="datetime-local"
          defaultValue={moment(item.courseTime).format("YYYY-MM-DD HH:mm")}
          onChange={(event) => {
            setCourseTime(event.target.value);
          }}
        />
        課程時數：
        <input
          type="number"
          defaultValue={item.courseHour}
          onChange={(event) => {
            setCourseHour(event.target.value);
          }}
        />
        人數上限：
        <input
          type="number"
          defaultValue={item.courseQuoda}
          onChange={(event) => {
            setCourseQuoda(event.target.value);
          }}
        />
        課程分類：
        <input
          type="text"
          defaultValue={item.categoryName}
          onChange={(event) => {
            setCategoryName(event.target.value);
          }}
        />
      </>
    );
  });

  //req.body
  async function updataCourse() {
    const row = {
      courseId: itemID,
      staffId: currentEmployee.Eid,
      categoryName: categoryName,
      courseName: courseName,
      courseTime: courseTime,
      courseHour: courseHour,
      courseQuoda: courseQuoda,
    };

    //編輯
    const request = new Request(`http://localhost:5000/api/courses/${itemID}`, {
      method: "POST",
      body: JSON.stringify(row),
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });

    const response = await fetch(request);
    const data = await response.json();

    console.log("伺服器回傳的json資料", data);
  }

  //載入
  useEffect(() => {
    courseData.forEach((element) => {
      setCourseName(element.courseName);
      setCourseTime(moment(element.courseTime).format("YYYY-MM-DD HH:mm"));
      setCourseHour(element.courseHour);
      setCourseQuoda(element.courseQuoda);
      setCategoryName(element.categoryName);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal-box">
      <header className="modal-header">
        <h1>課程編輯</h1>
      </header>
      <article className="modal-body">{courseValue}</article>
      <footer className="modal-footer">
        <button
          onClick={() => {
            updataCourse();
          }}
        >
          儲存並修改
        </button>
        <button
          onClick={() => {
            setModashow(false);
          }}
        >
          關閉視窗
        </button>
      </footer>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentEmployee: currentEmployeeSelect,
});

export default withRouter(connect(mapStateToProps)(EmployeeCentetModal));
