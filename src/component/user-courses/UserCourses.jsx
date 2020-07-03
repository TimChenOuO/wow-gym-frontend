import React, { useState, useEffect } from "react"
import "./UserCourses.scss"
import UserMyCoursesList from "../../component/user-my-courses-list/UserMyCoursesList"
// import UserCanceledCourses from "../user-canceled-courses/UserCanceledCourses"
// import UserFinishedCourses from "../user-finished-courses/UserFinishedCourses"
//---------------
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { currentUserSelect } from "../../redux/user/user-selector";
//---------------


function UserCourses(props) {

    const [userBooking, setUserBooking] = useState([])
    const [allCoursesOfThisUser, setAllCoursesOfThisUser] = useState([])
    const [filterCoursesOfData, setFilterCoursesOfData] = useState([])
    const [choose, setChoose] = useState("")

    //---------------
    const { currentUserData } = props
    //該使用者的id
    const currentUserId = currentUserData ? currentUserData.memberId : ''
    //---------------

    //Fetch 預約資料
    async function getUserBooking() {
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

        const booking = data && data.filter(i => i.memberId === currentUserId).map(p => p)
        setUserBooking(booking)
        // setNumOfCourse(props.course.numberOfCourse)
        // console.log(booking)
    }

    async function getCoursesDataInAllUser() {
        // 開啟載入指
        // 注意header資料格式要設定，伺服器才知道是json格式
        const request = new Request("http://localhost:5000/api/courses/memberBookingData", {
            method: "GET",
            headers: new Headers({
                Accept: "application/json",
                "Content-Type": "application/json",
            }),
        });

        const response = await fetch(request);
        const data = await response.json();
        const courseOfUser = data.coursesRow.filter(i => i.memberId === currentUserId).map(f => f)

        // console.log()
        setAllCoursesOfThisUser(courseOfUser)
    }



    const handleChange = (e) => {
        if (e.target.value === "預約的課程") {

            setChoose("預約的課程")
        } else if (e.target.value === "已取消的課程") {
            setChoose("已取消的課程")
        } else {
            setChoose("歷史課程")
        }

        console.log(e.target.value)
    }

    const filterCourse = function () {
        if (choose === "預約的課程") {
            // console.log('1')
            const getBookingState = allCoursesOfThisUser && allCoursesOfThisUser.filter(i => +i.bookingState === +1).map(p => p)
            // console.log(getBookingState)
            setFilterCoursesOfData(getBookingState)
        } else if (choose === "已取消的課程") {
            const getBookingState2 = allCoursesOfThisUser && allCoursesOfThisUser.filter(i => +i.bookingState === +0).map(p => p)
            // console.log(getBookingState2)
            setFilterCoursesOfData(getBookingState2)
        } else {
            const nowTime = Date.now()
            const getCourseTime = allCoursesOfThisUser && allCoursesOfThisUser.filter(i => i.courseTime2 < nowTime).map(p=>p)
            setFilterCoursesOfData(getCourseTime)
        }
    }

    useEffect(() => {
        getUserBooking()
        getCoursesDataInAllUser()
    }, [])

    useEffect(() => {
        filterCourse()
        console.log(choose)
    }, [choose])


    return (
        <>
            <div className="userCourseContainer">
               
                <div className="userMyCoursesContainer">
                <div className="userCorsesBtnContainer">
                    <button className="bookedBtn" onClick={(e) => handleChange(e)} value={"預約的課程"}>預約的課程</button>
                    <button className="canceledBtn" onClick={(e) => handleChange(e)} value={"已取消的課程"}>已取消的課程</button>
                    <button className="finishedBtn" onClick={(e) => handleChange(e)} value={"歷史課程"}>歷史課程</button>
                </div>
                    <ul className="userCoursesTitle">
                        <li>課程日期</li>
                        <li>課程時間</li>
                        <li>課程名稱</li>
                        <li>課程種類</li>
                        <li>教練名稱</li>
                        <li>預約狀況</li>
                    </ul>
                    <UserMyCoursesList
                        userBooking={userBooking}
                        allCoursesOfThisUser={allCoursesOfThisUser}
                        setAllCoursesOfThisUser={setAllCoursesOfThisUser}
                        currentUserId={currentUserId}
                        getCoursesDataInAllUser={getCoursesDataInAllUser}
                        filterCoursesOfData={filterCoursesOfData}
                        setFilterCoursesOfData={setFilterCoursesOfData}
                        getUserBooking={getUserBooking}
                        choose={choose}
                    />

                </div>
            </div>
        </>
    )
}

//---------------
const mapStateToProps = createStructuredSelector({
    currentUserData: currentUserSelect,
});

export default withRouter(connect(mapStateToProps)(UserCourses));
//---------------