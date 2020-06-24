import React from 'react'
import './EmployeeFormInput.scss'

function MyInput(props) {
    const {value, onChange, title, type} =props
    // console.log(props)
  return (
    <>
        <label className="label">
          {title}
          <input  placeholder="111" className="input" type={type} value={value} onChange={onChange} />
        </label>
    </>
  )
}
export default MyInput