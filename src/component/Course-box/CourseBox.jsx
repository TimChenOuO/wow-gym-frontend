import React, { useState, useEffect } from "react";
import "./CourseBox.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//---------------
import { createStructuredSelector } from "reselect";
import { currentUserSelect } from "../../redux/user/user-selector"
//---------------

import CJumpWindow from "../c-jump-window/CJumpWindow";
import SJumpWindow from "../s-jump-window/SJumpWindow";
import CourseBookingButton from "../course-booking-button/CourseBookingButton";

function CourseBox(props) {
    //---------------
    const { currentUserData } = props
    //該使用者的id
    const currentUserId = currentUserData ? currentUserData.memberId : ''
    //---------------

    // console.log(props.course)
    // console.log(currentUserData)

    const [cModalShow, setCModalShow] = useState(false);
    const [sModalShow, setSModalShow] = useState(false);
    //原本資料庫的bookingData
    const [bookingData, setBookingData] = useState('');
    //預約後存值
    const [newBookingData, setNewBookingData] = useState('')
    const [numOfCourse, setNumOfCourse] = useState(0)

    let t = [] = props.course.courseTime
    // console.log('t:', t)
    let newT = t.split(/[' ']/)[3]

    //Fetch 預約資料
    async function getBookingData() {
        const request = new Request("http://localhost:5000/api/courses/bookingData", {
            method: 'GET',
            body: JSON.stringify(),
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }),
        })
        const response = await fetch(request)
        const data = await response.json()
        setBookingData(data)
        setNumOfCourse(props.course.numberOfCourse)
        // console.log(A)
    }

    async function addBooking() {
        if (currentUserId !== '') {
            // 點擊預約後抓該id
            const getThisCourseId = props.course.courseId
            // console.log('c:', getThisCourseId)
            const coursesInLocal = JSON.parse(localStorage.getItem('courses'))
            //post新增預約到資料庫
            // const bookingPost = {
            //     memberId: currentUserId,
            //     courseId: getThisCourseId
            // }
            // const request = new Request("http://localhost:5000/api/courses/bookingData", {
            //     method: 'POST',
            //     body: JSON.stringify(bookingPost),
            //     headers: new Headers({
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json',
            //     }),
            // })
            // const response = await fetch(request)
            // const data = await response.json()
            // setNewBookingData(data)

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
            localStorage.setItem("courses",JSON.stringify({"coursesRow":nonFind}))

            const renewLocal = JSON.parse(localStorage.getItem("courses"))
            const newNum = await renewLocal.coursesRow && 
            renewLocal.coursesRow.filter(c => c.courseId === getThisCourseId )
            .map(i => i.numberOfCourse)

            setNumOfCourse(newNum)
        }
    }

    async function cancelBooking() {
        if (currentUserId !== '') {
            // 點擊預約後抓該id
            const getThisCourseId = props.course.courseId
            // console.log('c:', getThisCourseId)
            //該會員已預約過的預約Id
            const bookedId = bookingData && bookingData.filter(m => m.memberId === currentUserId).map(bookedCourse => (bookedCourse))
            // console.log(A)
            //該會員預約的課程id
            const B = bookedId && bookedId.filter(item => item.courseId === getThisCourseId)

            const cancelId = B[0].courseBookingId

            const bookingDel = {
                courseBookingId: cancelId,
                memberId: currentUserId,
                courseId: getThisCourseId
            }

            const request = new Request(`http://localhost:5000/api/courses/bookingData/${cancelId}`, {
                method: 'DELETE',
                body: JSON.stringify(bookingDel),
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }),
            })
            const response = await fetch(request)
            const data = await response.json()
            setNewBookingData(data)
            console.log('okk')
        }
    }

    //初始render抓booking資料
    useEffect(() => {
        getBookingData()
        
        return () =>{
        const aa = JSON.parse(localStorage.getItem("courses")).coursesRow
        const bb = aa && aa
        .filter((q => q.courseId === props.course.courseId))
        .map(i => i.numberOfCourse)

        setNumOfCourse(bb)
        }
    }, [newBookingData])

    return (
        <>
            <div className="courseBox">
                <div className="courseName" onClick={() => setCModalShow(true)}>{props.course.courseName}</div>
                <div className="courseTime">{newT}</div>
                <div onClick={() => setSModalShow(true)} className="coachName">
                    {props.course.Ename}
                </div>
                <div>{numOfCourse}/{props.course.courseQuoda}</div>
                <div>
                <CourseBookingButton
                    value={props.course.courseId}
                    bookingData={bookingData}
                    currentUserId={currentUserId}
                    addBooking={addBooking}
                    cancelBooking={cancelBooking}
                />
                </div>
            </div>
            <div className="jumpWindow">
                {cModalShow && (
                    <CJumpWindow
                    show={cModalShow}
                    onHide={() => setCModalShow(false)}
                    setCModalShow={setCModalShow}
                    courseName={props.course.courseName}
                    courseIntroduce={props.course.courseIntroduce}
                    courseImg={props.course.courseImg}
                />
                )}
                {sModalShow && (
                    <SJumpWindow
                        show={sModalShow}
                        onHide={() => setSModalShow(false)}
                        coachName={props.course.Ename}
                        //專長
                        coachExpertise={props.course.Eexpertise}
                        //證照
                        coachLicense={props.course.Elicense}
                        coachImg={props.course.Eimg}
                    />
                )}
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
