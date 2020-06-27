import React from 'react'
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";


function WeekBar(props) {
// console.log(props)
    return (
        <>
            <div className="chooseWeek">
                <a><IoMdArrowDropleft /></a>
      <select onChange={props.changeWeek}>
      <option value="07/06-07/12">07/01-07/07</option>
      <option value="07/13-07/19">07/13-07/19</option>
      </select>
      <a><IoMdArrowDropright /></a>
            </div>
        </>
    )
}

export default WeekBar;