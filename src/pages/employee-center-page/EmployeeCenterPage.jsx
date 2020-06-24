import React, { useEffect } from 'react'
import './EmployeeCenterPage.scss'
import people from './111.jpg'
import { withRouter } from 'react-router'

import P from '../../component/employee-center-p/EmployeeCenterP'
import CourseButton from "../../component/employee-center-course-button/EmployeeCenterCourseButton"

function EmployeeCenter(props) {

  console.log(props)

  const {eid} = props

  async function getEmployeeId(){
    const request = new Request(`http://localhost:5000/api/employee/${eid}`, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()

    console.log(data)


  }

  useEffect(()=>{
    getEmployeeId()
  },[])

  return (
    <>
      <div className="box">
        <div className="top">
          <div className="photo">
            <img className="people" alt="" src={people} />
          </div>
          <div className="data">
            <P title={'姓名：小琳'} />
            <P title={'性別：女'} />
            <P title={'生日：1111/11/11'} />
            <P title={'電話：0900000000'} />
            <P title={'email：aaa@aaa'} />
          </div>
          <div className="expertise">
            <P
              title={
                '專長：跆拳道、減重與體態雕朔、個人運動處方規劃、功能性訓練、運動按摩'
              }
            />
            <P
              title={
                '證照：健身Ｃ級教練、跆拳道Ｃ級裁判/教練、銀髮族體適能指導員、EMTI緊急救護員(CPR+AED)、中華奧會運動禁藥採樣員'
              }
            />
          </div>
        </div>
        <div className="bottom">
          <CourseButton/>
          <CourseButton/>
          <CourseButton/>
          <CourseButton/>
          <CourseButton/>
          <CourseButton/>
          <CourseButton/>
          <CourseButton/>
        </div>
      </div>
    </>
  )
}
export default withRouter(EmployeeCenter)