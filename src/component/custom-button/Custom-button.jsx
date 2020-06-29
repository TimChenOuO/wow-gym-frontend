import React from "react";

import "./custom-button.scss";

const CustomButton = ({
  children,
  shopCount,
  signin,
  errorModel,
  mobileMode,
  unMobileMode,
  ...otherProps
}) => (
  <button
    className={`
    ${shopCount ? "shop-count-btn" : ""} 
    ${signin ? "sign-in-btn" : ""} 
    ${errorModel ? "error-model-btn" : ""} 
    ${unMobileMode ? "unmobile-mode" : ""} 
    ${mobileMode ? "mobile-mode" : ""} 
    custom-button draw-border`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
