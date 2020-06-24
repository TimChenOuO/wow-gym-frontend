import React from 'react'

function CourseButton() {
  return (
    <>
      <div className="course">
        課程
        <button type="button" className="edit">
          編輯
        </button>
        <button type="button" className="delete">
          刪除
        </button>
      </div>
    </>
  )
}
export default CourseButton