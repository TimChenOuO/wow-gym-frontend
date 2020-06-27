import React from "react";

import "./custom-button.scss";

const CustomButton = ({
  children,
  shopCount,
  signin,
  errorModel,
  ...otherProps
}) => (
  <button
    className={`
    ${shopCount ? "shop-count-btn" : ""} 
    ${signin ? "sign-in-btn" : ""} 
    ${errorModel ? "error-model-btn" : ""} 
    custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
