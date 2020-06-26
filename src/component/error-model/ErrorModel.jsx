import React from "react";
import { CSSTransition } from "react-transition-group";
import CustomButton from "../custom-button/Custom-button";

import "./ErrorModel.scss";

const ErrorModel = ({ unValid, handleIsValid, children }) => {
  return (
    <CSSTransition
      in={unValid}
      timeout={200}
      classNames="pop-up-center"
      mountOnEnter
      unmountOnExit
    >
      <div className="error-model-container">
        <div className="gradient-bar" />
        <h3>{children}</h3>
        <CustomButton errorModel onClick={handleIsValid}>
          確定
        </CustomButton>
      </div>
    </CSSTransition>
  );
};
export default ErrorModel;
