import React from 'react'
import './CourseCalender.scss'
import DayContainer from '../day-container/DayContainer'

function CourseCalender(props) {
  // let t =[]= props.allCourse.courseTime
  // console.log(t)
  // console.log(props)
  // console.log('cc:',props.newCourses)

  return (
    <>
      <div className="chooseWeek">7/6~7/12</div>
      <div className="schedule">
        <DayContainer
          title={'Mon'}
          newCourses={props.newCourses}
          coaches={props.coaches}
          mId={props.mId}
          setMId={props.setMId}
        />
        <DayContainer
          title={'Tue'}
          newCourses={props.newCourses}
          coaches={props.coaches}
          mId={props.mId}
          setMId={props.setMId}
        />
        <DayContainer
          title={'Wed'}
          newCourses={props.newCourses}
          coaches={props.coaches}
          mId={props.mId}
          setMId={props.setMId}
        />
        <DayContainer
          title={'Thu'}
          newCourses={props.newCourses}
          coaches={props.coaches}
          mId={props.mId}
          setMId={props.setMId}
        />
        <DayContainer
          title={'Fri'}
          newCourses={props.newCourses}
          coaches={props.coaches}
          mId={props.mId}
          setMId={props.setMId}
        />
        <DayContainer
          title={'Sat'}
          newCourses={props.newCourses}
          coaches={props.coaches}
          mId={props.mId}
          setMId={props.setMId}
        />
        <DayContainer
          title={'Sun'}
          newCourses={props.newCourses}
          coaches={props.coaches}
          mId={props.mId}
          setMId={props.setMId}
        />
      </div>
    </>
  )
}
export default CourseCalender