import React from "react";
// import './editingWindow.css';
import { Modal } from "react-bootstrap";

function CJumpWindow(props) {
  const { onHide, show } = props;

  // console.log(props);
  return (
    <Modal.Dialog>
      <Modal
        size="sm"
        // dialogClassName="modal-50w"
        // aria-labelledby="contained-modal-title-vcenter"
        // centered
        {...{ onHide, show }}
        className="modalBox"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.courseName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img 
          src={props.courseImg}
          alt="courseImg"
          />
          {props.courseIntroduce}
        </Modal.Body>
      </Modal>
    </Modal.Dialog>
  );
}

export default CJumpWindow;
