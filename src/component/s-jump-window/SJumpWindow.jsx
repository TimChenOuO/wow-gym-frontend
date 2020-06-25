import React from "react";
import "./SJumpWindow.scss";
import { Modal } from "react-bootstrap";

function JumpWindow(props) {
  const { onHide, show } = props;

  const L = props.coachExpertise.split("、").map((item, i) => {
    return (
      <React.Fragment key={i}>
        {item}
        <br />
      </React.Fragment>
    );
  });
  const S = props.coachLicense.split("、").map((item, i) => {
    return (
      <React.Fragment key={i}>
        {item}
        <br />
      </React.Fragment>
    );
  });

  console.log(props.coachExpertise);
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
            {props.coachName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <img src={props.coachImg} /> */}
          <div className="coachExpertise">
            <h5>專長：</h5>
            <br />
            {L}
          </div>
          <hr />
          <div className="coachLicense">
            <h5>證照：</h5>
            <br />
            {S}
          </div>
        </Modal.Body>
      </Modal>
    </Modal.Dialog>
  );
}

export default JumpWindow;
