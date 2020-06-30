import React from "react";
import "./UserCourseUpdateBtn.scss"

function UserCourseUpdateBtn (props){

    // console.log(props.userCancelBooking)
    const displayUserBookingButton = (
            <>
             <button
             className="userUpdateBtn"
             value={props.userBookingId}
             onClick={() => props.userConfirmUpdateBooking(props.userCancelBooking)}>
             按我取消
             </button>
            </>
        )
        const displayUserCancelButton = (
            <>
             <button 
             value={props.userCourseId}
             className="userCanceledBtn">
             已取消
             </button>
            </>
        )

    return(
        <>
         {+props.getThisBookingState === 0 ?displayUserCancelButton :displayUserBookingButton}
        </>
    )
}

export default UserCourseUpdateBtn;