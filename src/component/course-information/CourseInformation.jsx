import React from 'react'
import './CourseInformation.scss'

function Information(props){
// console.log('info:'+props)
    return(
        <>
        <div className="information">
            {/* <p className="title">{props.introduce[0].courseCategory}</p> */}
            <hr />
            <p className="introduce">
              {/* {props.introduce[0].introduce} */}
            </p>
          </div>
        </>
    )
}

export default Information 