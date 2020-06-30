import React, { useState, useEffect } from "react";
import UserCourseUpdateBtn from "../../component/user-course-update-btn/UserCourseUpdateBtn"
import "./UserMyCourses.scss"
import Swal from "sweetalert2";


function UserMyCourses(props) {

    const [userBooking, setUserBooking] = useState([])

    const T = props.userCourse.courseTime
    const newT = T.split("T")[0]

    //轉換時間格式比較先後
    const newTime = new Date(T).getTime()
    const nowTime = Date.now()
    // console.log(newTime)

    // const dd = new Date(T).getTime();
    // const weekdays = "星期日,星期一,星期二,星期三,星期四,星期五,星期六".split(",");
    // const newDd = weekdays[dd.getDay()];
    // console.log(weekdays)

    //會員的預約編號
    const userBookingId = props.userCourse.courseBookingId

    console.log(props.userCourse)

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
        const response = await fetch(request)
        const data = await response.json()
        setUserBooking('')
        // console.log(userBookingId)

        //抓localStorage的courses資料
        const coursesInLocal = JSON.parse(localStorage.getItem('courses'))
        if (props.currentUserId !== '') {
            //用課程id抓localStorage特定課程
            const getCourseInLocal = await coursesInLocal.coursesRow && coursesInLocal.coursesRow.filter(item => item.courseId === props.userCourse.courseId).map(i => i)
            // console.log(getCourseInLocal)
            //將課程人數-1
            getCourseInLocal[0].numberOfCourse -= 1

            // //將其他未被選到的課程轉到新陣列
            const nonFind = await coursesInLocal.coursesRow && coursesInLocal.coursesRow.filter(item => item.courseId !== props.userCourse.courseId)

            // //將預定人數增加的資料推進新陣列
            await nonFind.push(getCourseInLocal[0])
            // // console.log(nonFind)

            // // //刪除原本localStorage課程的data
            localStorage.setItem("courses", JSON.stringify({ "coursesRow": nonFind }))
        }
    }

    // console.log(props.userCourseId)
    //判斷此課程的預約狀況
    const getThisBookingState = props.userBooking && props.userBooking.filter(i => i.courseId === props.userCourseId).map(p => p.bookingState)

    // console.log(getThisBookingState)

    function userConfirmUpdateBooking(userCancelBooking) {
        let c = window.confirm("取消後無法再次預約該課程，確定要取消嗎?")
        if (c === true) {
            userCancelBooking()
            // window.location.reload()
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
        {nowTime > newTime ?<div className="userCoursesInfoCover"></div> :""}
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

export default UserMyCourses
