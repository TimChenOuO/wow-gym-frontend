import React from "react"
import './CourseBookingButton.scss'


function CourseBookingButton(props) {

     // 點擊預約後抓該id
    //  const getThisCourseId = props.value
    //  // console.log('c:', getThisCourseId)
    //  const coursesInLocal = JSON.parse(localStorage.getItem('courses'))

    //找到該會員已預約的課程id
    const A = props.bookingData && props.bookingData.filter(m => m.memberId === props.currentUserId).map(bookedCourse => (bookedCourse.courseId))
    // console.log(A)
    //確認此課程是否已被該會員預約
    const checkBooking = A.indexOf(props.value)
// console.log(props.bookingData)
    //可預約button
    const displayBookingBtn = (
        <>
            <button value={props.value} onClick={() => props.myConfirmAddBooking(props.addBooking)} className="accessBooking courseBtn">預約</button>
        </>
    )
    //已預約button
    const displayBookedBtn = (
        <>
            <button value={props.value} onClick={() => props.myConfirmCancelBooking(props.cancelBooking)} className="alreadyBooked courseBtn">取消預約</button>

        </>
    )
    return (
        <>
            {checkBooking !== -1 ? displayBookedBtn : displayBookingBtn}
        </>
    )
}

export default CourseBookingButton