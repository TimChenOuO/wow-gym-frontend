import React from "react"
import "./CourseCalender.scss"
import DayContainer from "../day-container/DayContainer"

function CourseCalender(props) {
  // let t =[]= props.allCourse.courseTime
  // console.log(t)
  // console.log(props)
  // console.log('cc:',props.newCourses)

   //找到該會員已預約的課程id
   const thisUserBookingId = props.bookingData && props.bookingData.filter(m => m.memberId === props.currentUserId).map(bookedCourse => (bookedCourse.courseId))
   console.log(thisUserBookingId)


  return (
    <>
      <div className="schedule">
        <DayContainer
          title={'Mon'}
          newCourses={props.newCourses}
          bookingData={props.bookingData}
          getBookingData={props.getBookingData}
          getCoursesData={props.getCoursesData}
          currentUserId={props.currentUserId}
          thisUserBookingId={thisUserBookingId}
        />
        <DayContainer
          title={'Tue'}
          newCourses={props.newCourses}
          bookingData={props.bookingData}
          getBookingData={props.getBookingData}
          getCoursesData={props.getCoursesData}
          currentUserId={props.currentUserId}
          thisUserBookingId={thisUserBookingId}
        />
        <DayContainer
          title={'Wed'}
          newCourses={props.newCourses}
          bookingData={props.bookingData}
          getBookingData={props.getBookingData}
          getCoursesData={props.getCoursesData}
          currentUserId={props.currentUserId}
          thisUserBookingId={thisUserBookingId}
        />
        <DayContainer
          title={'Thu'}
          newCourses={props.newCourses}
          bookingData={props.bookingData}
          getBookingData={props.getBookingData}
          getCoursesData={props.getCoursesData}
          currentUserId={props.currentUserId}
          thisUserBookingId={thisUserBookingId}
        />
        <DayContainer
          title={'Fri'}
          newCourses={props.newCourses}
          bookingData={props.bookingData}
          getBookingData={props.getBookingData}
          getCoursesData={props.getCoursesData}
          currentUserId={props.currentUserId}
          thisUserBookingId={thisUserBookingId}
        />
        <DayContainer
          title={'Sat'}
          newCourses={props.newCourses}
          bookingData={props.bookingData}
          getBookingData={props.getBookingData}
          getCoursesData={props.getCoursesData}
          currentUserId={props.currentUserId}
          thisUserBookingId={thisUserBookingId}
        />
        <DayContainer
          title={'Sun'}
          newCourses={props.newCourses}
          bookingData={props.bookingData}
          getBookingData={props.getBookingData}
          getCoursesData={props.getCoursesData}
          currentUserId={props.currentUserId}
          thisUserBookingId={thisUserBookingId}
        />
      </div>
    </>
  )
}
export default CourseCalender