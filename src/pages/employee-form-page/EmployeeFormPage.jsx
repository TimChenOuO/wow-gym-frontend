import React ,{useState} from 'react'
import './EmployeeFormPage.scss'

import EmployeeFormInput from '../../component/employee-from-input/EmployeeFormInput'
import EmployeeFormSelect from '../../component/employee-form-select/EmployeeFormSelect'
import EmployeeFormRadio from '../../component/employee-form-checkbox/EmployeeFormRadio'
import MyTextarea from '../../component/employee-form-textarea/EmployeeFormTextarea'

function EmployeeForm(props) {
  const [course, setCourse] = useState('')
  const [time, setTime] = useState('')
  const [hour, setHour] = useState('')
  const [file, setFile] = useState('')
  const [explanation, setExplanation] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')


  async function handleSubmit (){
    const row = {
      "staffId": 5,
    "courseCategoryId": 1,
    "courseName": course,
    "courseCategoryName":category,
    "courseImg": "",
    "courseIntroduce": explanation,
    "courseTime": time,
    "courseHours": hour
    }

      // ,name,file

    const request = new Request('http://localhost:5000/api/courses', {
      method: 'POST',
      body: JSON.stringify(row),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()

    console.log('伺服器回傳的json資料', data)
    // console.log(row)
    
  }


  return (
    <>
      <form className="form-box">
        <div className="left">
          <EmployeeFormInput title={'課程名稱：'} type={'text'} value={course} onChange={(event)=>{setCourse(event.target.value)}} />
          <EmployeeFormInput title={'課程時間：'} type={'datetime-local'} value={time} onChange={(event)=>{setTime(event.target.value)}} />
          <EmployeeFormInput title={'課程時數：'} type={'number'} value={hour} onChange={(event)=>{setHour(event.target.value)}} />
          <EmployeeFormInput title={'課程圖片：'} type={'file'} value={file} onChange={(event)=>{setFile(event.target.value)}} />
        </div>
        <div className="right">
          <MyTextarea title={'課程說明：'} value={explanation} onChange={(event)=>{setExplanation(event.target.value)}} />
          <EmployeeFormSelect title={'教練名稱：'} value={name} onChange={(event)=>{setName(event.target.value)}} />
          <label className="label">
            課程分類:
            <EmployeeFormRadio title={'有氧教室'} value={category} onClick={()=>{setCategory("有氧教室")}} />
            <EmployeeFormRadio title={'瑜伽教室'} value={category} onClick={()=>{setCategory("瑜伽教室")}} />
            <EmployeeFormRadio title={'飛輪教室'} value={category} onClick={()=>{setCategory("飛輪教室")}} />
          </label>
        </div>
        <div>
          <button className="submit" type="button" onClick={()=>{
            handleSubmit()
          }}>
            送出
          </button>
        </div>
      </form>
    </>
  )
}
export default EmployeeForm