import React, { useState, useEffect } from "react";
import "./CourseBox.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//---------------
import { createStructuredSelector } from "reselect";
import { currentUserSelect } from "../../redux/user/user-selector";
//---------------
import CourseBookingButton from "../course-booking-button/CourseBookingButton";
import Swal from "sweetalert2";

function CourseBox(props) {
    //---------------
    const { currentUserData } = props
    //該使用者的id
    const currentUserId = currentUserData ? currentUserData.memberId : ''
    //---------------

    //將現在時間的星期轉換成毫秒
    const nowTime = Date.now()
    // console.log('nowTime', +nowTime)

    //抓資料裡的課程時間(毫秒)
    const getTimeInData = props.course.courseTime2



    //預約後存值
    const [newBookingData, setNewBookingData] = useState('')
    const [numOfCourse, setNumOfCourse] = useState('')

    let t = props.course.courseTime
    // console.log('t:', t)
    let newT = t.split(/[' ']/)[3]
    // console.log(props.course.courseId)



    // 點擊預約後抓該id
    const getThisCourseId = props.course.courseId
    // console.log('c:', getThisCourseId)
    const coursesInLocal = JSON.parse(localStorage.getItem('courses'))

    async function addBooking() {
        if (props.currentUserId !== '') {
            //用課程id抓localStorage特定課程
            const getCourseInLocal = await coursesInLocal.coursesRow && coursesInLocal.coursesRow.filter(item => item.courseId === getThisCourseId).map(i => i)
            // console.log(newFind)
            //將課程人數+1
            getCourseInLocal[0].numberOfCourse += 1
            // console.log(newFind)

            //將其他未被選到的課程轉到新陣列
            const nonFind = await coursesInLocal.coursesRow && coursesInLocal.coursesRow.filter(item => item.courseId !== getThisCourseId)

            //將預定人數增加的資料推進新陣列
            await nonFind.push(getCourseInLocal[0])
            // console.log(nonFind)

            // //刪除原本localStorage課程的data
            localStorage.setItem("courses", JSON.stringify({ "coursesRow": nonFind }))

            const renewLocal = await JSON.parse(localStorage.getItem("courses"))
            const newNum = await renewLocal.coursesRow &&
                renewLocal.coursesRow.filter(c => c.courseId === getThisCourseId)
                    .map(i => i.numberOfCourse)

            //post新增預約到bookingData資料庫
            const bookingPost = {
                memberId: currentUserId,
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
            setNewBookingData(data)
            setNumOfCourse(newNum)

           
        }
    }

    async function updateBooking() {
        if (currentUserId !== '') {
            //用課程id抓localStorage特定課程
            const getCourseInLocal = await coursesInLocal.coursesRow && coursesInLocal.coursesRow.filter(item => item.courseId === getThisCourseId).map(i => i)
            // console.log(getCourseInLocal)
            //將課程人數-1
            getCourseInLocal[0].numberOfCourse -= 1

            // //將其他未被選到的課程轉到新陣列
            const nonFind = await coursesInLocal.coursesRow && coursesInLocal.coursesRow.filter(item => item.courseId !== getThisCourseId)

            // //將預定人數增加的資料推進新陣列
            await nonFind.push(getCourseInLocal[0])
            // // console.log(nonFind)

            // // //刪除原本localStorage課程的data
            localStorage.setItem("courses", JSON.stringify({ "coursesRow": nonFind }))

            const renewLocal = await JSON.parse(localStorage.getItem("courses"))
            const newNum = await renewLocal.coursesRow &&
                renewLocal.coursesRow.filter(c => c.courseId === getThisCourseId)
                    .map(i => i.numberOfCourse)

            setNumOfCourse(newNum)

            // console.log('c:', getThisCourseId)
            //該會員已預約過的預約Id
            const bookedId = props.bookingData && props.bookingData.filter(m => m.memberId === currentUserId).map(bookedCourse => (bookedCourse))
            // console.log(A)
            //該會員預約的課程id
            const B = bookedId && bookedId.filter(item => item.courseId === getThisCourseId)

            const updateId = B[0].courseBookingId

            const bookingDel = {
                // courseBookingId: updateId,
                // memberId: currentUserId,
                // courseId: getThisCourseId,
                bookingState: 0
            }

            const request = new Request(`http://localhost:5000/api/courses/bookingData/${updateId}`, {
                method: 'POST',
                body: JSON.stringify(bookingDel),
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }),
            })
            const response = await fetch(request)
            const data = await response.json()
            setNewBookingData('')
            console.log('okk')
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



    function myConfirmUpdateBooking(updateBooking) {
        let c = window.confirm("確定要取消此課程嗎?")
        if (c === true) {
            updateBooking()
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

    //   //整理教練證照格式
    // const coachL = props.course.Elicense.split(/["、"]/).map((item, i) => {
    //     return (
    //       <React.Fragment key={i}>
    //         {item}
    //         <br />
    //       </React.Fragment>
    //     );
    //   });
    // console.log(coachL)
    //   //整理教練專長格式
    //   const coachE = props.course.Eexpertise.split(/["、"]/).map((item, i) => {
    //     return (
    //       <React.Fragment key={i}>
    //         {item}
    //         <br />
    //       </React.Fragment>
    //     );
    //   });
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

    useEffect(() => {

        const dataInLocal = JSON.parse(localStorage.getItem("courses")).coursesRow
        const numInLocal = dataInLocal && dataInLocal
            .filter((q => q.courseId === props.course.courseId))
            .map(i => i.numberOfCourse)
        setNumOfCourse(numInLocal)
    }, [newBookingData])

    useEffect(() => {
        // props.getBookingData()
    }, [numOfCourse])

    return (
        <>
            <div className="courseBox">
                {getTimeInData <= nowTime ? <div className="courseBoxCover"></div> : ''}
                <div className="courseName" onClick={() => showCJumpWindow()}>{props.course.courseName}</div>
                <div className="courseTime">{newT}</div>
                <div onClick={() => showEJumpWindow()} className="coachName">
                    {props.course.Ename}
                </div>

                <div>{numOfCourse}/{props.course.courseQuoda}</div>
                <div>
                    {+numOfCourse === +props.course.courseQuoda ? displayFullBtn :
                        <CourseBookingButton
                            value={props.course.courseId}
                            bookingData={props.bookingData}
                            currentUserId={currentUserId}
                            numOfCourse={numOfCourse}
                            setNumOfCourse={setNumOfCourse}
                            courseQuoda={props.course.courseQuoda}
                            addBooking={addBooking}
                            updateBooking={updateBooking}
                            myConfirmAddBooking={myConfirmAddBooking}
                            myConfirmUpdateBooking={myConfirmUpdateBooking}
                        />
                    }
                </div>
            </div>
        </>
    );
}
//---------------
const mapStateToProps = createStructuredSelector({
    currentUserData: currentUserSelect,
});

export default withRouter(connect(mapStateToProps)(CourseBox));
//---------------
