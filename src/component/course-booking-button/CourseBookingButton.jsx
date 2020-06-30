import React from "react"
import './CourseBookingButton.scss'


function CourseBookingButton(props) {

    //找到該會員已預約的課程id
    const A = props.bookingData && props.bookingData.filter(m => m.memberId === props.currentUserId).map(bookedCourse => (bookedCourse.courseId))
    // console.log(A)

    //確認此課程是否已被該會員預約
    const checkBooking = A.indexOf(props.value)

    //確認該課程預約狀況
    const checkBookingState = props.bookingData && props.bookingData.filter(m => m.courseId === props.value && m.memberId === props.currentUserId).map(bookedCourse => (bookedCourse.bookingState))

    // console.log(checkBookingState)
    // console.log(props.bookingData)
    //可預約button
    const displayBookingBtn = (
        <>
            <button value={props.value} onClick={() => props.myConfirmAddBooking(props.addBooking)} className="accessBooking courseBtn">預約</button>
        </>
    )
    //已預約button
    // const displayBookedBtn = (
    //     <>
    //         <button value={props.value} onClick={() => props.myConfirmUpdateBooking(props.updateBooking)} className="alreadyBooked courseBtn">取消預約</button>

    //     </>
    // )

    
    //若曾預約，視預約狀況顯示button
    function displayBookedBtn() {
        if (+checkBookingState === 0) {
            return (
                <>
                    <button value={props.value} className="canceledBooked courseBtn">已取消</button>
                </>)
        } else {
            return (
                <>
                    <button value={props.value} className="alreadyBooked courseBtn">已預約</button>

                </>)
        }
    }


        return (
            <>
                {checkBooking !== -1 ? displayBookedBtn() : displayBookingBtn}

            </>
        )
    }

    export default CourseBookingButton