import React from 'react'
import './EmployeeFormRadio.scss'

function MyCheckBox(props) {
    const {value, onClick, title} = props
    // console.log(props)
    
  return (
    <>
      <label>
        <input className="radio" name="category" type="radio" value={value} onClick={onClick}  />
        <span className="span">{title}</span>
      </label>
    </>
  )
}
export default MyCheckBox