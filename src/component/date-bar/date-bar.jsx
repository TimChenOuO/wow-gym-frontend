import React from 'react'
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";


function DateBar(props) {
// console.log(props)
    return (
        <>
            <div className="chooseWeek">
                <a><IoMdArrowDropleft /></a>
      <a id="week">7/13~7/19</a>
      <a><IoMdArrowDropright /></a>
            </div>
        </>
    )
}

export default DateBar;