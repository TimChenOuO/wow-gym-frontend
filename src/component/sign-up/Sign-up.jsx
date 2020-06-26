import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./Sign-up.scss";

import FormInput from "../form-input/Form-input";
import CustomButton from "../custom-button/Custom-button";
import { userLogin } from "../../redux/user/user-action";
import { createStructuredSelector } from "reselect";
import { userListSelect } from "../../redux/user/user-selector";
import axios from 'axios'
class SingUP extends React.Component {
  state = {
    email: "",
    password: "",
    name: "",
    mobile: ""
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log('123')
    axios.post(`http://localhost:5000/api/user/insertUser`, {
      method: "POST",
      credentials: "include", // 需傳送 Cookie 必須開啟
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      data: {
        memberAccount: this.state.email,
        memberPwd: this.state.password,
        memberName: this.state.name,
        memberPhoneNum: this.state.mobile,
      }
    });
  };

  handleChange = (e) => {
    const { name, value, } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2 className="title">I don't have account</h2>
        <span>Sign Up with your email & password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            label="Email"
          />

          <FormInput
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            label="Password"
          />
          <FormInput
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            label="name"

          />
          <FormInput
            name="mobile"
            value={this.state.mobile}
            onChange={this.handleChange}
            label="mobile"
          />
          <div className="buttons">
            <CustomButton type="submit">SIGN UP</CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userList: userListSelect,
});

const mapDispatchToProps = (dispatch) => ({
  userLogin: (user) => dispatch(userLogin(user)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingUP));
