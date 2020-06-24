import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Form, Button } from "react-bootstrap";

import "./header.scss";

// Component-------------------------------
import { ReactComponent as Logo } from "../../assets/logo.svg";
import CartIcon from "../cart-icon/Cart-icon";
import CartDropdown from "../cart-dropdown/Cart-dropdown";
import { cartHiddenSelect } from "../../redux/cart/cart-selector";
import HeaderDropdown from "../header-dropdown/HeaderDropdown";

// redux action-------------------------------
import { userLogout } from "../../redux/user/user-action";
import { navBarSelect } from "../../redux/nav-bar/navBar-action";
import { shopShowFilterTag } from "../../redux/shop/shop-action";
import { currentUserSelect } from "../../redux/user/user-selector";
import CustomButton from "../custom-button/Custom-button";

const Header = ({
  navBarSelect,
  shopShowFilterTag,
  currentUser,
  userLogout,
}) => {
  const [subDiv, setSubDiv] = useState(false);
  const history = useHistory();

  return (
    <div className="header">
      <div className="header-spacing" />
      <div
        className={`hamburger-btn ${subDiv ? "hamburger-clicked" : ""}`}
        onClick={() => setSubDiv(!subDiv)}
      >
        <div className="" />
        <div className="" />
        <div className="" />
      </div>

      <div className="main">
        <Link to="/" className="logo-container">
          <Logo className="logo" />
        </Link>

        <div
          className="options"
          onMouseOver={() => {
            if (subDiv) return;
          }}
        >
          <Link
            to="/shopping"
            className="option"
            onClick={() => {
              shopShowFilterTag("選擇篩選");
              setSubDiv(false);
            }}
            onMouseEnter={() => {
              navBarSelect("shop");
              if (subDiv) return;
              setSubDiv(true);
            }}
          >
            精選商城
          </Link>
          <Link
            to="/courses"
            className="option"
            onClick={() => setSubDiv(false)}
            onMouseEnter={() => {
              navBarSelect("coach");
              if (subDiv) return;
              setSubDiv(true);
            }}
          >
            教練課程
          </Link>
          <Link
            to="/articles"
            className="option"
            onClick={() => setSubDiv(false)}
            onMouseEnter={() => {
              navBarSelect("article");
              if (subDiv) return;
              setSubDiv(true);
            }}
          >
            心得討論
          </Link>
        </div>
      </div>

      <div className="sub sub-cart" onMouseOver={() => setSubDiv(false)}>
        {currentUser ? (
          <CustomButton
            onClick={() => {
              userLogout();
              // history.push("/login");
            }}
          >
            登出
          </CustomButton>
        ) : (
          <CustomButton onClick={() => history.push("/login")}>
            登入
          </CustomButton>
        )}
        <CartIcon />
      </div>
      <HeaderDropdown setSubDiv={setSubDiv} subDiv={subDiv} />
      <CartDropdown />
    </div>
  );
};

// redux mapState & mapDispatch
const mapStateToProps = createStructuredSelector({
  hidden: cartHiddenSelect,
  currentUser: currentUserSelect,
});

const mapDispatchToProps = (dispatch) => ({
  navBarSelect: (select) => dispatch(navBarSelect(select)),
  shopShowFilterTag: (tag) => dispatch(shopShowFilterTag(tag)),
  userLogout: () => dispatch(userLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
