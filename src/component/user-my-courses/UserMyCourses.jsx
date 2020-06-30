import React, {useState, useEffect} from "react";

function UserMyCourses(props){

const [userBooking, setUserBooking] = useState([])

const T = props.userCourse.courseTime
const newT = T.split("T")[0]
const dd = new Date(T).getTime();
const weekdays = "星期日,星期一,星期二,星期三,星期四,星期五,星期六".split(",");
const userCancelId = props.userBooking[0].courseBookingId
// const newDd = weekdays[dd.getDay()];
// console.log(weekdays)

// console.log(T)
async function cancelBooking(){

    const cancelBookingJson = {
        courseBookingId: userCancelId,
        memberId: props.currentUserId,
        courseId: props.userCourse.courseId
    }

const request = new Request(`http://localhost:5000/api/courses/bookingData/${userCancelId}`, {
    method: 'DELETE',
    body: JSON.stringify(cancelBookingJson),
    headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }),
})
const response = await fetch(request)
const data = await response.json()
setUserBooking('')
console.log('okk')


}


useEffect(()=>{
    
props.getCoursesDataInAllUser()

},[userBooking])

    return(
        <>
        <ul className="userCoursesInfo">
                        {/* <li>課程星期</li> */}
                        <li>{newT}</li>
                        <li>{props.userCourse.courseName}</li>
                        <li>{props.userCourse.categoryName}</li>
                        <li>{props.userCourse.Ename}</li>
                        <li>
                        <button onClick={()=>cancelBooking()}>取消預約</button>
                        </li>
                    </ul>
        </>
    )
}

export default UserMyCourses

// var num = 1305856000000;
// var dd = new Date(num);
// document.write(dd.toString() + "<br />");
// var months = "一月,二月,三月,四月,五月,六月,七月,八月,九月,十月,十一月,十二月".split(",");
// var weekdays = "星期日,星期一,星期二,星期三,星期四,星期五,星期六".split(",");
// document.write( months[dd.getMonth()] );
// document.write( weekdays[dd.getDay()] );