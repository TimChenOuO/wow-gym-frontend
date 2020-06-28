import React from "react";
import "./SJumpWindow.scss";
import { Modal } from "react-bootstrap";

function SJumpWindow(props) {
  const { onHide, show } = props;

  const coachE = props.coachExpertise.split("、").map((item, i) => {
    return (
      <React.Fragment key={i}>
        {item}
        <br />
      </React.Fragment>
    );
  });
  const coachL = props.coachLicense.split("、").map((item, i) => {
    return (
      <React.Fragment key={i}>
        {item}
        <br />
      </React.Fragment>
    );
  });

  // console.log(props.coachExpertise);
  return (
    <div className="coachModalBox">
      <div
        size="sm"
        className=""
        // dialogClassName="modal-50w"
        // aria-labelledby="contained-modal-title-vcenter"
        // centered
        {...{ onHide, show }}
      >

        <button
          onClick={() => { props.setSModalShow(false) }}
          className="coachModalCloseBtn">close</button>
        <div className="coachModalContainer">
          <div className="fCoachImg">
            <img
              src={props.coachImg}
              alt="coachImg"
            />
            <div className="coachModalNameCover"></div>
            <h4 className="coachModalName">{props.coachName}</h4>
          </div>
          <div className="coachModalInformation">
            <div className="coachExpertise">
              <h5 className="expertiseTitle">專長：</h5>
              <div className="coachE">{coachE}</div>
            </div>
            <hr />
            <div className="coachLicense">
              <h5 className="licenseTitle">證照：</h5>
              <div className="coachL">{coachL}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SJumpWindow;
