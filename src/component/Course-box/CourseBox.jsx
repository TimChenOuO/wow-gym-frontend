import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { createStructuredSelector } from "reselect";
import { currentUserSelect } from "../../redux/user/user-selector"
import "./CourseBox.scss";

import CJumpWindow from "../c-jump-window/CJumpWindow";
import SJumpWindow from "../s-jump-window/SJumpWindow";
import CourseBookingButton from "../course-booking-button/CourseBookingButton";

function CourseBox(props) {

    const { currentUserData } = props
    //該使用者的id
    const currentUserId = currentUserData ? currentUserData.memberId : ''
    // console.log(currentUserId)

    const [cModalShow, setCModalShow] = useState(false);
    const [sModalShow, setSModalShow] = useState(false);
    //原本資料庫的bookingData
    const [bookingData, setBookingData] = useState('');
    //預約後存值
    const [newBookingData, setNewBookingData] = useState('')


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
        // console.log(A)
    }

    //
    async function addBooking() {
        if (currentUserId !== '') {
            // 點擊預約後抓該id
            const getThisCourseId = props.course.courseId
            // console.log('c:', getThisCourseId)

            //post新增預約到資料庫
            const bookingPost = {
                memberId: currentUserId,
                courseId: getThisCourseId
            }
            const request = new Request("http://localhost:5000/api/courses/bookingData", {
                method: 'POST',
                body: JSON.stringify(bookingPost),
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }),
            })
            const response = await fetch(request)
            const data = await response.json()
            setNewBookingData(data)
            // setChangeBtn(props.course.courseId)
        } else {
            alert('請先登入會員')
        }
    }

    //初始render抓booking資料
    useEffect(() => {
        getBookingData()
    }, [])
    // 如果有新預定就重抓booking資料
    useEffect(() => {
        getBookingData()
        // console.log(nowBooking)
    }, [newBookingData])

    return (
        <>
            <div className="courseBox">
                <div onClick={() => setCModalShow(true)}>{props.course.courseName}</div>
                <div className="courseTime">{newT}</div>
                <div onClick={() => setSModalShow(true)} className="coachName">
                    {props.course.Ename}
                </div>
                <CourseBookingButton
                    value={props.course.courseId}
                    bookingData={bookingData}
                    currentUserId={currentUserId}
                    addBooking={addBooking}
                />
            </div>
            <div className="jumpWindow">
                <CJumpWindow
                    show={cModalShow}
                    onHide={() => setCModalShow(false)}
                    courseName={props.course.courseName}
                    courseIntroduce={props.course.courseIntroduce}
                    courseImg={props.course.courseImg}
                />
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


const mapStateToProps = createStructuredSelector({
    currentUserData: currentUserSelect,
});

export default withRouter(connect(mapStateToProps)(CourseBox));
