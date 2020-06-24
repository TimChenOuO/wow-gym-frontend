import React, { useState, useEffect } from 'react'
// import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { Navbar, Nav, Form, Button } from 'react-bootstrap'
import { Link, NavLink, withRouter } from 'react-router-dom'

function MyNavbar(props) {
  const { mAuth, eAuth, name, MLogoutProcess } = props
  // console.log(auth)

  const MLogoutSuccessCallback = () => {
    alert('登出成功，跳回首頁')
    props.setMAuth(false)
    localStorage.clear()
    props.history.push('/coaches')
  }

  const MLoginButton = (
    <>
      <Button
        variant="outline-light"
        onClick={() => {
          props.history.push('/mLogin')
        }}
      >
        會員登入
      </Button>
    </>
  )

  const ELoginButton = (
    <>
    <Button
        variant="outline-light"
        onClick={() => {
          props.history.push('/employeelogin')
        }}
      >
        教練登入
      </Button>
    </>
  )
  const logoutButton = (
    <>
      <span style={{ color: '#ffffff' }}>{name}, 你好</span>
      <Button
        variant="outline-light"
        onClick={() => { MLogoutProcess(MLogoutSuccessCallback) }}
      >
        登出
      </Button>
    </>
  )

  const displayMButton = mAuth ? logoutButton : MLoginButton
  const displayEButton = eAuth ? logoutButton : ELoginButton

  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          {/* 把Nav.Link當作NavLink來使用 */}
          {/* 記得首頁`/`要加exact作精確比對，不然都會一直點亮 */}
          <Nav.Link as={NavLink} to="/" exact>
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to={`/courses/?${props.mId}`}>
            課程資訊
          <Nav.Link as={NavLink} to={`/courses/?${props.mId}`}>
              課程預約
          </Nav.Link>
            <Nav.Link as={NavLink} to="/coaches">
              教練介紹
          </Nav.Link>
          </Nav.Link>
        </Nav>
        <Form inline>{displayMButton}</Form>
        <Form inline>{displayEButton}</Form>
      </Navbar>
    </>
  )
}

export default withRouter(MyNavbar)