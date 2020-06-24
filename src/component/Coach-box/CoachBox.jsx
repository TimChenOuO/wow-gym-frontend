import React from 'react'
import './CoachBox.scss'

function CoachBox(props) {

    return (
        <>
            <div className="coachBox">
            <img src={props.employee.Eimg} />
                <div className="nameShadow">
                    {props.employee.Ename}
                </div>
            </div>
        </>
    )
}

export default CoachBox