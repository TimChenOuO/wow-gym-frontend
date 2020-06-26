import React from "react";

import "./custom-button.scss";

const CustomButton = ({ children, shopCount, signin, ...otherProps }) => (
  <button
    className={`${shopCount ? "shop-count-btn" : ""} ${
      signin ? "sign-in-btn" : ""
    } custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
