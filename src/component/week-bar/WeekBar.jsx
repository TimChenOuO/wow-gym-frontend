import React from 'react'


function WeekBar(props) {
    // console.log(props)
    return (
        <>
            <div className="chooseWeek">
                <select onChange={props.changeWeek}>
                    <option value="07/06-07/12">07/01-07/07</option>
                    <option value="07/13-07/19">07/13-07/19</option>
                </select>
            </div>
        </>
    )
}

export default WeekBar;