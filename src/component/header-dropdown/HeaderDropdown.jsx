import React from "react";
import { Link, useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  navChooseSelect,
  navLinkSelect,
} from "../../redux/nav-bar/navBar-selector";

import "./HeaderDropdown.scss";

const HeaderDropdown = ({ setSubDiv, subDiv, navChoose, navLink }) => {
  const history = useHistory();
  return (
    <CSSTransition
      in={subDiv}
      timeout={200}
      classNames="slide-in-top"
      mountOnEnter
      unmountOnExit
    >
      <div className="sub-div" onMouseLeave={() => setSubDiv(false)}>
        <div className="top-sub-div">
          {navChoose.map((linkInfo) => (
            <Link
              key={linkInfo.name + "cc"}
              to={`${linkInfo.linkRoute}`}
              onClick={() => setSubDiv(false)}
            >
              {linkInfo.name}
            </Link>
          ))}
        </div>

        <div className="side-sub-div">
          <h2 onClick={() => history.push("/shopping")}>商城專區</h2>
          <div className="side-sub-link-container">
            {navLink["shop"].map((linkInfo) => (
              <Link
                key={linkInfo.name + "h1"}
                to={`${linkInfo.linkRoute}`}
                onClick={() => setSubDiv(false)}
              >
                {linkInfo.name}
              </Link>
            ))}
          </div>

          <h2 onClick={() => history.push("/courses")}>教練專區</h2>
          <div className="side-sub-link-container">
            {navLink["coach"].map((linkInfo) => (
              <Link
                key={linkInfo.name + "h2"}
                to={`${linkInfo.linkRoute}`}
                onClick={() => setSubDiv(false)}
              >
                {linkInfo.name}
              </Link>
            ))}
          </div>

          <h2 onClick={() => history.push("/articles")}>討論專區</h2>
          <div className="side-sub-link-container">
            {navLink["article"].map((linkInfo) => (
              <Link
                key={linkInfo.name + "h3"}
                to={`${linkInfo.linkRoute}`}
                onClick={() => setSubDiv(false)}
              >
                {linkInfo.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
  // return ReactDOM.createPortal(
  //   content,
  //   document.getElementById("header-slide-dropdown")
  // );
};

const mapStateToProps = createStructuredSelector({
  navChoose: navChooseSelect,
  navLink: navLinkSelect,
});

export default connect(mapStateToProps)(HeaderDropdown);
