import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./EmployeeCenterPage.scss";
import { withRouter } from "react-router";
import Moment from "react-moment";
import "moment-timezone";

import CourseButton from "../../component/employee-center-course-button/EmployeeCenterCourseButton";
import { createStructuredSelector } from "reselect";
import { currentEmployeeSelect } from "../../redux/employee/employee-selector";

function EmployeeCenter({ currentEmployee }) {
 
  const [employeedata, setEmployeedata] = useState([]);
  const [coursedata, setCoursedata] = useState([]);

  async function getEmployeeId() {
    // console.log(currentEmployee);
    const request = new Request(
      `http://localhost:5000/api/employee/${currentEmployee.Eid}`,
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
    setEmployeedata(data);
  }

  async function getCourse() {
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
    setCoursedata(data);
  }

  //載入
  useEffect(() => {
    getEmployeeId();
    getCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //改變
  useEffect(() => {
    setEmployeedata(employeedata);
  }, [employeedata]);

  useEffect(() => {
    setCoursedata(coursedata);
    // console.log(coursedata);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coursedata]);

  const employeeCapital = employeedata.map((item) => {
    return (
      <>
        <p className="data" key="1">
          姓名：{item.Ename}
        </p>
        <p className="data" key="2">
          性別：{item.Egender}
        </p>
        <p className="data" key="3">
          生日：<Moment format="YYYY/MM/DD">{item.Ebirthday}</Moment>
        </p>
        <p className="data" key="4">
          電話：{item.EphoneNumber}
        </p>
        <p className="data" key="5">
          email：{item.Eemail}
        </p>
      </>
    );
  });

  const employeeRecord = employeedata.map((item) => {
    return (
      <>
        <p className="license" key="6">
          專長：{item.Elicense}
        </p>
        <p className="license" key="7">
          證照：{item.Eexpertise}
        </p>
      </>
    );
  });

  const course = coursedata.map((item, index) => {
    return (
      <>
        <div className="course" key={index}>
          {item.courseName}
          <div className="course-container-img">
            <img className="course-img" alt="" src={item.courseImg} />
          </div>
          <CourseButton itemID={item.courseId}/>
        </div>
      </>
    );
  });

  return (
    <>
      <div className="box">
        <div className="top">
          <div className="photo">
            <img className="people" alt="" src={currentEmployee.Eimg} />
          </div>
          <div className="data">{employeeCapital}</div>
          <div className="expertise">{employeeRecord}</div>
        </div>
        <div className="bottom">{course}</div>
      </div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  currentEmployee: currentEmployeeSelect,
});

export default withRouter(connect(mapStateToProps)(EmployeeCenter));
