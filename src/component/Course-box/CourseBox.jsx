import React from "react";
import "./CourseBox.scss";

import CourseBookingButton from "../course-booking-button/CourseBookingButton";
import Swal from "sweetalert2";

function CourseBox(props) {

    //將現在時間的星期轉換成毫秒
    const nowTime = Date.now()
    // console.log('nowTime', +nowTime)

    //抓資料裡的課程時間(毫秒)
    const getTimeInData = props.course.courseTime2

    //   console.log(currentUserId)
    //預約後存值

    let t = props.course.courseTime
    // console.log('t:', t)
    let newT = t.split(/[' ']/)[3]
    // console.log(props)

    // 點擊預約後抓該id
    const getThisCourseId = props.course.courseId

    async function addBooking() {
        if (props.currentUserId === null) {
            alert("請先登入會員")
        } else {

            //post新增預約到資料庫
            const bookingPost = {
                memberId: props.currentUserId,
                courseId: getThisCourseId
            }
            const request = new Request("http://localhost:5000/api/courses/bookingData", {
                method: 'POST',
                body: JSON.stringify(bookingPost),
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }),
            })
            const response = await fetch(request)
            const data = await response.json()

            //post新增預約到資料庫
            const addNumPost = {
                courseId: getThisCourseId,
            }
            const req = new Request("http://localhost:5000/api/courses/addNumOfCourse", {
                method: 'POST',
                body: JSON.stringify(addNumPost),
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }),
            })
            const res = await fetch(req)
            const newData = await res.json()
            props.getBookingData()
            props.getCoursesData()
            //頁面重整，等待拔掉
            window.location.reload()
        }
    }

    function myConfirmAddBooking(addBooking) {
        let a = window.confirm("確定要預約此課程嗎?")
        if (a === true) {
            addBooking()
            // window.location.reload()
        } else {
            console.log('nooo')
        }
    }

    //已額滿按鈕
    const displayFullBtn = (
        <>
            <button value={props.value} className="fullBooking">已額滿</button>
        </>
    )

 
    //課程彈跳視窗
    function showCJumpWindow() {
        Swal.fire({
            width: 800,
            title: props.course.courseName,
            imageUrl: props.course.courseImg,
            imageWidth: 400,
            imageHeight: 300,
            text: props.course.courseIntroduce,
        })
    }
    //教練彈跳視窗
    function showEJumpWindow() {
        Swal.fire({
            width: 800,
            title: props.course.Ename,
            imageUrl: props.course.Eimg,
            imageWidth: 400,
            html: `<h4>證照：</h4></br>${props.course.Elicense}<br/><br/><h4>專長：</h4></br>${props.course.Eexpertise}`,
        })
    }

    return (
        <>
            <div className="courseBox">
                {getTimeInData <= nowTime ? <div className="courseBoxCover"></div> : ''}
                <div className="courseName" onClick={() => showCJumpWindow()}>{props.course.courseName}</div>
                <div className="courseTime">{newT}</div>
                <div onClick={() => showEJumpWindow()} className="coachName">
                    {props.course.Ename}
                </div>

                <div>{props.course.numberOfCourse}/{props.course.courseQuoda}</div>
                <div>
                    {+props.course.numberOfCourse === +props.course.courseQuoda ? displayFullBtn :
                        <CourseBookingButton
                            value={props.course.courseId}
                            bookingData={props.bookingData}
                            currentUserId={props.currentUserId}
                            addBooking={addBooking}
                            myConfirmAddBooking={myConfirmAddBooking}
                            thisUserBookingId={props.thisUserBookingId}
                        />
                    }
                </div>
            </div>
        </>
    );
}

export default CourseBox;

