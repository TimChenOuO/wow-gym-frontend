import React, { useState } from 'react'
import './CoachBox.scss'
import SJumpWindow from "../s-jump-window/SJumpWindow";


function CoachBox(props) {

    const [sModalShow, setSModalShow] = useState(false);


    return (
        <>
            <div className="coachBoxFront">
            <img 
            onClick={() => setSModalShow(true)}
            src={props.employee.Eimg}
            alt="coachPhoto"
            />
                <div className="nameShadow" onClick={() => setSModalShow(true)}>
                    {props.employee.Ename}
                </div>
            </div>
            {sModalShow && (
                    <SJumpWindow
                    className="coachJumpWindow"
                        show={sModalShow}
                        setSModalShow={setSModalShow}
                        onHide={() => setSModalShow(false)}
                        coachName={props.employee.Ename}
                        //專長
                        coachExpertise={props.employee.Eexpertise}
                        //證照
                        coachLicense={props.employee.Elicense}
                        coachImg={props.employee.Eimg}
                    />
                )}
        </>
    )
}

export default CoachBox