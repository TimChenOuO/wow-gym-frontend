import React from "react"
import "./CourseCalender.scss"
import DayContainer from "../day-container/DayContainer"

function CourseCalender(props) {
 
   //找到該會員已預約的課程id
   const thisUserBookingId = props.bookingData && props.bookingData.filter(m => m.memberId === props.currentUserId).map(bookedCourse => (bookedCourse.courseId))
  //  console.log(thisUserBookingId)

  return (
    <>
      <div className="schedule">
        <DayContainer
          title={'Mon'}
          newCourses={props.newCourses}
          bookingData={props.bookingData}
          getBookingData={props.getBookingData}
          getCoursesData={props.getCoursesData}
          currentUserData={props.currentUserData}
          currentUserId={props.currentUserId}
          thisUserBookingId={thisUserBookingId}
          setNewCourses={props.setNewCourses}
        />
        <DayContainer
          title={'Tue'}
          newCourses={props.newCourses}
          bookingData={props.bookingData}
          getBookingData={props.getBookingData}
          getCoursesData={props.getCoursesData}
          currentUserData={props.currentUserData}
          currentUserId={props.currentUserId}
          thisUserBookingId={thisUserBookingId}
          setNewCourses={props.setNewCourses}
        />
        <DayContainer
          title={'Wed'}
          newCourses={props.newCourses}
          bookingData={props.bookingData}
          getBookingData={props.getBookingData}
          getCoursesData={props.getCoursesData}
          currentUserData={props.currentUserData}
          currentUserId={props.currentUserId}
          thisUserBookingId={thisUserBookingId}
          setNewCourses={props.setNewCourses}
        />
        <DayContainer
          title={'Thu'}
          newCourses={props.newCourses}
          bookingData={props.bookingData}
          getBookingData={props.getBookingData}
          getCoursesData={props.getCoursesData}
          currentUserData={props.currentUserData}
          currentUserId={props.currentUserId}
          thisUserBookingId={thisUserBookingId}
          setNewCourses={props.setNewCourses}
        />
        <DayContainer
          title={'Fri'}
          newCourses={props.newCourses}
          bookingData={props.bookingData}
          getBookingData={props.getBookingData}
          getCoursesData={props.getCoursesData}
          currentUserData={props.currentUserData}
          currentUserId={props.currentUserId}
          thisUserBookingId={thisUserBookingId}
          setNewCourses={props.setNewCourses}
        />
        <DayContainer
          title={'Sat'}
          newCourses={props.newCourses}
          bookingData={props.bookingData}
          getBookingData={props.getBookingData}
          getCoursesData={props.getCoursesData}
          currentUserData={props.currentUserData}
          currentUserId={props.currentUserId}
          thisUserBookingId={thisUserBookingId}
          setNewCourses={props.setNewCourses}
        />
        <DayContainer
          title={'Sun'}
          newCourses={props.newCourses}
          bookingData={props.bookingData}
          getBookingData={props.getBookingData}
          getCoursesData={props.getCoursesData}
          currentUserData={props.currentUserData}
          currentUserId={props.currentUserId}
          thisUserBookingId={thisUserBookingId}
          setNewCourses={props.setNewCourses}
        />
      </div>
    </>
  )
}
export default CourseCalender