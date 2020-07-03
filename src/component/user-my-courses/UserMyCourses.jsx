import React, { useState, useEffect } from "react";
import UserCourseUpdateBtn from "../../component/user-course-update-btn/UserCourseUpdateBtn"
import "./UserMyCourses.scss"
import Swal from "sweetalert2";


function UserMyCourses(props) {
// console.log(props.userCourse)
    const [userBooking, setUserBooking] = useState([])

    const T = props.userCourse.courseTime
    const newD = T.split("T")[0]
    const newT = props.userCourse.courseTime3.split(" ")[3]

    //轉換時間格式比較先後
    const newTime = new Date(T).getTime()
    const nowTime = Date.now()
    // console.log(T)

    //會員的預約編號
    const userBookingId = props.userCourse.courseBookingId
    //該課程id
    const thisCourseId = props.userCourse.courseId

    // console.log(props.userCourse)

    async function userCancelBooking() {

        const updateBookingJson = {
            bookingState: 0
        }
        const request = new Request(`http://localhost:5000/api/courses/bookingData/${userBookingId}`, {
            method: 'POST',
            body: JSON.stringify(updateBookingJson),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
        })
        await fetch(request)
        setUserBooking('')

        //取消預約後減少預約人數
        const reduceNumJson = {
            courseId: thisCourseId,
        }
        const req = new Request(`http://localhost:5000/api/courses/data`, {
            method: 'POST',
            body: JSON.stringify(reduceNumJson),
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
        })
        await fetch(req)
        
    }

    // console.log(props.userCourseId)
    //判斷此課程的預約狀況
    const getThisBookingState = props.userBooking && props.userBooking.filter(i => i.courseId === props.userCourseId).map(p => p.bookingState)

    // console.log(getThisBookingState)

    function userConfirmUpdateBooking(userCancelBooking) {
        let c = window.confirm("取消後無法再次預約該課程，確定要取消嗎?")
        if (c === true) {
            userCancelBooking()
            
        } else {
            console.log('nooo')
        }
    }

    
    //課程彈跳視窗
    function showCJumpWindow() {
        Swal.fire({
            width: 800,
            title: props.userCourse.courseName,
            imageUrl: props.userCourse.courseImg,
            imageWidth: 400,
            imageHeight: 300,
            text: props.userCourse.courseIntroduce,
        })
    }

    //教練彈跳視窗
    function showEJumpWindow() {
        Swal.fire({
            width: 800,
            title: props.userCourse.Ename,
            imageUrl: props.userCourse.Eimg,
            imageWidth: 400,
            html: `<h4>證照：</h4></br>${props.userCourse.Elicense}<br/><br/><h4>專長：</h4></br>${props.userCourse.Eexpertise}`,
        })
    }

    useEffect(() => {
        props.getCoursesDataInAllUser()
        props.getUserBooking()
    }, [userBooking])

    return (
        <>
            <ul className="userCoursesInfo">
                {nowTime > newTime ? <div className="userCoursesInfoCover"></div> : ""}
                <li className="courseDayUser">{newD}</li>
                <li className="courseTimeUser">{newT}</li>
                <li className="courseNameInUser" onClick={() => showCJumpWindow()}>{props.userCourse.courseName}</li>
                <li className="courseCategoryInUser">{props.userCourse.categoryName}</li>
                <li className="coachNameInUser" onClick={() => showEJumpWindow()}>{props.userCourse.Ename}</li>
                <li className="userCourseBtn">
                    <div>
                        <UserCourseUpdateBtn
                            userBookingId={userBookingId}
                            userConfirmUpdateBooking={userConfirmUpdateBooking}
                            userCancelBooking={userCancelBooking}
                            getThisBookingState={getThisBookingState}
                        />
                    </div>
                </li>
            </ul>
        </>
    )
}
export default UserMyCourses;