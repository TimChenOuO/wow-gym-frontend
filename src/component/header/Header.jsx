import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Navbar, Nav, Form, Button } from 'react-bootstrap'


import "./header.scss";

// Component-------------------------------
import { ReactComponent as Logo } from "../../assets/logo.svg";
import CartIcon from "../cart-icon/Cart-icon";
import CartDropdown from "../cart-dropdown/Cart-dropdown";
import { cartHiddenSelect } from "../../redux/cart/cart-selector";
import HeaderDropdown from "../header-dropdown/HeaderDropdown";

// redux action-------------------------------
import { navBarSelect } from "../../redux/nav-bar/navBar-action";

const Header = (props) => {
  const [subDiv, setSubDiv] = useState(false);
  //會員登出---------
  const { mAuth , setMAuth, eAuth, navBarSelect, MLogoutProcess,ELogoutProcess }= props

  
  const MLogoutSuccessCallback = () => {
    alert('登出成功，跳回首頁')
    props.setEAuth(false)
    localStorage.clear()
    // props.history.push('/MLogin')
  }

  // console.log(mAuth)
  //教練登出----------
  const ELogoutSuccessCallback = () => {
    alert('登出成功，跳回首頁')
    props.setEAuth(false)
    localStorage.clear()
    // props.history.push('/MLogin')
  }


  const MLoginButton = (
    <>
     <Link  to="/MLogin"
    >
      <Button
        variant="outline-light"
        // onClick={() => {
        //   props.history.push('/MLogin')
        // }}
      >
        會員登入
      </Button>
      </Link>
    </>
  )

  const ELoginButton = (
    <>
    <Link  to="/employeelogin"
    >
      <Button
        variant="outline-light"
        // onClick={() => {
        //   props.history.push('/employeelogin')
        // }}
      >
        教練登入
      </Button>
      </Link>
    </>
  )
  const MLogoutButton = (
    <>
      <span style={{ color: '#ffffff' }}> 你好</span>
      <Button
        variant="outline-light"
        onClick={() => { MLogoutProcess(MLogoutSuccessCallback) }}
      >
        登出
      </Button>
    </>
  )

  const ELogoutButton = (
    <>
      <span style={{ color: '#ffffff' }}> 你好</span>
      <Button
        variant="outline-light"
        onClick={() => { ELogoutProcess(ELogoutSuccessCallback) }}
      >
        登出
      </Button>
    </>
  )

  const displayMButton = mAuth ? MLogoutButton : MLoginButton
  const displayEButton = eAuth ? ELogoutButton : ELoginButton
  //----------------------------------
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
            // navBarSelect("shop");
            if (subDiv) return;
            // setSubDiv(true);
          }}
        >
          {/* <Link to="/" className="option">
            about
          </Link> */}

          <Link
            to="/shopping"
            className="option"
            onClick={() => setSubDiv(false)}
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
        {/* //--------登入登出紐------ */}
        <Form inline>{displayMButton}</Form>
        <Form inline>{displayEButton}</Form>
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
});

const mapDispatchToProps = (dispatch) => ({
  navBarSelect: (select) => dispatch(navBarSelect(select)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
