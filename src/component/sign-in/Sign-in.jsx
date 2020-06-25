import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./sign-in.scss";

import FormInput from "../form-input/Form-input";
import CustomButton from "../custom-button/Custom-button";
import { userLogin } from "../../redux/user/user-action";
import { createStructuredSelector } from "reselect";
import { userListSelect } from "../../redux/user/user-selector";

class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { userList, userLogin, history } = this.props;

    const currentUser = userList.find(
      (user) => user.memberAccount === email && user.memberPwd === password
    );
    if (currentUser) {
      userLogin(currentUser);
      history.push("/");
    } else {
      alert("Wrong email or password!");
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2 className="title">I already have an account</h2>
        <span>Sign in with your email & password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            label="Email"
            required
          />

          <FormInput
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            label="Password"
            required
          />
          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
