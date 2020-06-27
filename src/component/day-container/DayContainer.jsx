import React from 'react'
import './DayContainer.scss'
import CourseBox from '../Course-box/CourseBox'


function DayContainer(props) {
    // console.log('d:',props.newCourses)
    // console.log(props)


    const filterCourses = props.newCourses && props.newCourses
    .filter(course => course.courseTime.split(' ')[0] === props.title)
    .map(course => (<CourseBox key={course.courseId} course={course} />))

    return (
        <>
            <div className="dayContainer">
                <div className="day">{props.title}</div>
                {filterCourses}
            </div>
        </>
    )
}

export default DayContainer