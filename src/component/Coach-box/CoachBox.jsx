import React from 'react'
import './CoachBox.scss'

function CoachBox(props) {

    return (
        <>
            <div className="coachBox">
            <img 
            src={props.employee.Eimg}
            alt="coachPhoto"
            />
                <div className="nameShadow">
                    {props.employee.Ename}
                </div>
            </div>
        </>
    )
}

export default CoachBox