import React, { useState, useEffect } from "react"
import "./UserCourses.scss"
import UserMyCoursesList from "../../component/user-my-courses-list/UserMyCoursesList"
//---------------
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { currentUserSelect } from "../../redux/user/user-selector";
//---------------


function UserMyCourses(props) {

    const [userBooking, setUserBooking] = useState([])
    const [allCoursesOfThisUser, setAllCoursesOfThisUser] = useState([])

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

        const booking = data && data.filter(i=> i.memberId === currentUserId).map(p=>p)
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
        const courseOfUser = data.filter(i=> i.memberId === currentUserId).map(f=>f)

        // console.log()
        setAllCoursesOfThisUser(courseOfUser)    
      }

    useEffect(() => {
        getUserBooking()
        getCoursesDataInAllUser()
    }, [])


    return (
        <>
            <div className="userCourseContainer">
                <div className="userMyCoursesContainer">
                    <ul className="userCoursesTitle">
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

export default withRouter(connect(mapStateToProps)(UserMyCourses));
//---------------