import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./employeeCentetModal.scss";
// import Moment from "react-moment";

import { createStructuredSelector } from "reselect";
import { currentEmployeeSelect } from "../../redux/employee/employee-selector";

const employeeCentetModal=({ currentEmployee,setModashow,itemID,courseid,courseName,setCourseName,courseTime,setCourseTime,courseHour,setCourseHour,courseQuoda,setCourseQuoda,categoryName,setCategoryName })=> {
  

  const coursedata = courseid.filter((item)=>{
        return item.courseId === itemID;
  }).map((item)=>{
    console.log(itemID)
    setCourseName(item.courseName)
    setCourseTime(Number(item.courseTime))
    setCourseHour(item.courseHour)
    setCourseQuoda(Number(item.courseQuoda))
    setCategoryName(item.categoryName)
    return<>
        課程名稱：<input className="" type="text" defaultValue={item.courseName} onChange={(event)=>{setCourseName(event.target.value)}} />
        開課時間：<input type="datetime-local" defaultValue={item.courseTime} onChange={(event)=>{setCourseTime(event.target.value)}} />
        課程時數：<input type="number" defaultValue={item.courseHour} onChange={(event)=>{setCourseHour(event.target.value)}} />
        人數上限：<input type="number" defaultValue={item.courseQuoda} onChange={(event)=>{setCourseQuoda(event.target.value)}} />
        課程分類：<input type="text" defaultValue={item.categoryName} onChange={(event)=>{setCategoryName(event.target.value)}} />
        </>
  })

  // console.log(coursedata)

  async function updataCourse(){
    const row = {
      "courseId":itemID,
      "staffId":currentEmployee.Eid,
      "categoryName":categoryName,
      "courseName":courseName,
      "courseTime":courseTime,
      "courseHour":courseHour,
      "courseQuoda":courseQuoda
    }

    const request = new Request(`http://localhost:5000/api/courses/${itemID}`, {
      method: 'POST',
      body: JSON.stringify(row),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()

    console.log('伺服器回傳的json資料', data)
    
   
  }
  
 

  
  return (
    <div className="modal-box">
      <header className="modal-header">
        <h1>課程編輯</h1>
      </header>
      <article className="modal-body">
        {coursedata}
      </article>
      <footer className="modal-footer">
        <button
          onClick={() => {
            updataCourse()
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

export default withRouter(connect(mapStateToProps)(employeeCentetModal));
