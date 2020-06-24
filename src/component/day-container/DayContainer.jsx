import React from 'react'
import './DayContainer.scss'
import CourseBox from '../Course-box/CourseBox'


function DayContainer(props) {
// console.log('d:',props.newCourses)
// console.log(props)
  

    return (
        <>
            <div className="dayContainer">
                <div className="day">{props.title}</div>
                {/* {props.allCourses.coursesRow && props.allCourses.coursesRow.map(course =>(
                  <CourseBox key={course.courseId} course={course}/>
              ))} */}
              {props.newCourses && props.newCourses
              .filter(course => course.courseTime.split(' ')[0] === props.title)
              .map(course =>(<CourseBox key={course.courseId} course={course} />))
                }

            </div>
        </>
    )
}

export default DayContainer