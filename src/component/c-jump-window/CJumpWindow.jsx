import React from "react";
// import './editingWindow.css';
// import { Modal } from "react-bootstrap";

function CJumpWindow(props) {
  const { onHide, show } = props;

  console.log(props);
  return (
    <>
    <div className="courseModal">
      <div
        {...{ onHide, show }}
        className="modalBox"
      >
        <div className="closeBtn">
          <button onClick={()=>{props.setCModalShow(false)}}>close</button>
            <p className="courseModalName">{props.courseName}</p>
        </div>
        <div className="courseModalImg">
          <img 
          src={props.courseImg}
          alt="courseImg"
          />
          <div>
          {props.courseIntroduce}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default CJumpWindow;
