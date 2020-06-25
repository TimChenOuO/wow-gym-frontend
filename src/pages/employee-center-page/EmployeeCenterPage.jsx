import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./EmployeeCenterPage.scss";
import people from "./111.jpg";
import { withRouter } from "react-router";
import Moment from "react-moment";
import "moment-timezone";

// import P from '../../component/employee-center-P/EmployeeCenterP'
import CourseButton from "../../component/employee-center-course-button/EmployeeCenterCourseButton";
import { createStructuredSelector } from "reselect";
import { currentEmployeeSelect } from "../../redux/employee/employee-selector";

function EmployeeCenter({ currentEmployee }) {
  const [employeedata, setEmployeedata] = useState([]);
  // console.log(props)

  async function getEmployeeId() {
    // const x = localStorage
    //   .getItem('employee')
    //   .split(',', 1)
    //   .join('')
    //   .match(/\d+/)
    console.log(currentEmployee.Eid);
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

  //載入
  useEffect(() => {
    getEmployeeId();
  }, []);

  //改變
  useEffect(() => {
    // const a =[]
    setEmployeedata(employeedata);

    //   employeedata.find((item) => {
    //     return a.push(item.Ename, item.Egender, item.Ebirthday,item.EphoneNumber,item.Eemail)
    //   })
    // console.log(a)
  }, [employeedata]);

  // const y =[]
  // const x = employeedata
  //   .find((item) => {
  //     return y.push(item.Ename, item.Egender, item.Ebirthday,item.EphoneNumber,item.Eemail)
  //   })

  //   const employeeCapital = y.map((i)=>{
  //     return<>
  //       <p>{y[0]}</p>
  //     </>
  //   })

  const employeeCapital = employeedata.map((item) => {
    return (
      <>
        <p key={1}>姓名：{item.Ename}</p>
        <p key={2}>性別：{item.Egender}</p>
        <p key={3}>
          生日：<Moment format="YYYY/MM/DD">{item.Ebirthday}</Moment>
        </p>
        <p key={4}>電話：{item.EphoneNumber}</p>
        <p key={5}>email：{item.Eemail}</p>
      </>
    );
  });

  const employeeRecord = employeedata.map((item) => {
    return (
      <>
        <p key={6}>專長：{item.Elicense}</p>
        <p key={7}>證照：{item.Eexpertise}</p>
      </>
    );
  });

  return (
    <>
      <div className="box">
        <div className="top">
          <div className="photo">
            <img className="people" alt="" src={people} />
          </div>
          <div className="data">{employeeCapital}</div>
          <div className="expertise">{employeeRecord}</div>
        </div>
        <div className="bottom">
          <CourseButton />
          <CourseButton />
          <CourseButton />
          <CourseButton />
          <CourseButton />
          <CourseButton />
          <CourseButton />
          <CourseButton />
        </div>
      </div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  currentEmployee: currentEmployeeSelect,
});

export default withRouter(connect(mapStateToProps)(EmployeeCenter));
