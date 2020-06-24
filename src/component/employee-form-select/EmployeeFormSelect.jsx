import React from 'react'
import './EmployeeFormSelect.scss'

function MySelect(props) {
 const{value, onChange, title} = props
//  console.log(props)
 
  return (
    <>
      <label className="label">
        {title}
        <select className="select" value={value} onChange={onChange}>
          <option>小琳</option>
          <option>小宇</option>
          <option>小志</option>
          <option>小凱</option>
          <option>小隆</option>
          <option>小唐</option>
          <option>小榕</option>
        </select>
      </label>
    </>
  )
}
export default MySelect