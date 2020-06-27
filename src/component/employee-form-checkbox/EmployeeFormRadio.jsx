import React from 'react'
import './EmployeeFormRadio.scss'

function MyCheckBox(props) {
    const {value, onClick, title} = props
    
  return (
    <>
      <label className="label-radio">
        <input className="radio" name="category" type="radio" value={value} onClick={onClick}  />
        <span className="span">{title}</span>
      </label>
    </>
  )
}
export default MyCheckBox