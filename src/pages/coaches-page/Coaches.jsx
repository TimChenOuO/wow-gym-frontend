import React, { useState, useEffect } from "react";
import "./Coaches.scss";
// import Selector from '../../component/course-selector/CourseSelector'
import CoachList from "../../component/Coach-list/CoachList";

function Coaches(props) {
  //   console.log(props)

  // const [place, setPlace] = useState([
  //     {
  //         placeId: 1,
  //         place: '民生館'
  //     },
  //     {
  //         placeId: 2,
  //         place: '巨蛋館'
  //     }
  // ])
  // const [choose, setChoose] = useState('')
  const [employee, setEmployee] = useState([]);

  async function getEmployeesData() {
    // 開啟載入指示
    // setDataLoading(true)
    // 注意header資料格式要設定，伺服器才知道是json格式
    const request = new Request("http://localhost:5000/api/employee", {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });

    const response = await fetch(request);
    const data = await response.json();

    // console.log(data)
    // 設定資料
    setEmployee(data);
  }

  useEffect(() => {
    getEmployeesData();
  }, []);

  return (
    <>
      <div className="wrapper">
        <header className="navbar">
          <div className="logo">
            <img src="./img/logo2.jpg" alt="logo" />
          </div>
        </header>
        <div className="banner">
          <h1>教練資訊 Coach information</h1>
        </div>
        <div className="container">
          {/* <Selector
                    selector = {place}
                    setPlace = {setPlace}
                    choose = {choose}
                    setChoose = {setChoose}
                /> */}

          <CoachList employee={employee} setEmployee={setEmployee} />
        </div>
      </div>
    </>
  );
}

export default Coaches;
