import React from "react"
import "./CourseCalender.scss"
import DayContainer from "../day-container/DayContainer"

function CourseCalender(props) {
  // let t =[]= props.allCourse.courseTime
  // console.log(t)
  // console.log(props)
  // console.log('cc:',props.newCourses)

  return (
    <>
      <div className="schedule">
        <DayContainer
          title={'Mon'}
          newCourses={props.newCourses}
          coaches={props.coaches}
        />
        <DayContainer
          title={'Tue'}
          newCourses={props.newCourses}
          coaches={props.coaches}
        />
        <DayContainer
          title={'Wed'}
          newCourses={props.newCourses}
          coaches={props.coaches}
        />
        <DayContainer
          title={'Thu'}
          newCourses={props.newCourses}
          coaches={props.coaches}
        />
        <DayContainer
          title={'Fri'}
          newCourses={props.newCourses}
          coaches={props.coaches}
        />
        <DayContainer
          title={'Sat'}
          newCourses={props.newCourses}
          coaches={props.coaches}
        />
        <DayContainer
          title={'Sun'}
          newCourses={props.newCourses}
          coaches={props.coaches}
        />
      </div>
    </>
  )
}
export default CourseCalender