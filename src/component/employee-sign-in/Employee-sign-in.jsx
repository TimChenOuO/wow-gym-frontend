import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import FormInput from "../form-input/Form-input";
import CustomButton from "../custom-button/Custom-button";
import { employeeLogin } from "../../redux/employee/employee-action";
import { employeeListSelect } from "../../redux/employee/employee-selector";

import "./sign-in.scss";

class EmployeeSignIn extends React.Component {
  state = {
    email: "",
    password: "",
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { employeeList, employeeLogin, history } = this.props;

    const currentEmployee = employeeList.find(
      (employee) => employee.Eemail === email && employee.Epwd === password
    );
    if (currentEmployee) {
      employeeLogin(currentEmployee);
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
        <h2 className="title">教練員工帳號登入</h2>
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
  employeeList: employeeListSelect,
});

const mapDispatchToProps = (dispatch) => ({
  employeeLogin: (employee) => dispatch(employeeLogin(employee)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EmployeeSignIn)
);
