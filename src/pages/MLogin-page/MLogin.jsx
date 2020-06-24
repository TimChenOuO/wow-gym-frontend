import React, { useEffect } from 'react';
import './MLogin.scss'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'


function MLogin(props) {
    // console.log('M:', props.mData)
    // console.log(props)
console.log(props.mAuth)
    const MLoginSuccessCallback = () => {
        // alert('登入成功，跳轉頁面')
        const a = props.mAccount
        //判斷哪個會員
        const whichMember = 
        props.mData.membersRow && 
        props.mData.membersRow.filter(m=>(m.memberAccount === a)).map(m=>(m))
        localStorage.setItem('member', JSON.stringify(whichMember))
        props.setMAuth(true)
        props.history.push(`/courses/${props.mId}`, { from: '從登入頁來' })
    }

    const MLogoutSuccessCallback = () => {
        alert('登出成功，跳回首頁')
        props.setMAuth(false)
        localStorage.clear()
        props.history.push('/coaches')
    }

    const displayForm = props.mAuth ? (
        ''
    ) : (
            <>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        value={props.mAccount}
                        onChange={(e) => { props.setMAccount(e.target.value) }}
                        type="text"
                        placeholder="Enter Account"
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
        </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        value={props.mPwd}
                        onChange={(e) => { props.setMPwd(e.target.value) }}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

            </>
        )

    const displayButton = props.mAuth ? (
        <Button
            variant="primary"
            onClick={() => { props.MLogoutProcess(MLogoutSuccessCallback) }}>
            登出
        </Button >
    ) : (
            <Button
                variant="primary"
                onClick={() => { props.MLoginProcess(MLoginSuccessCallback) }}>
                登入
            </Button >
        )

    useEffect(() => {
        // getData()
    }, [])

    return (
        <>
            <div className="container">
                <div className="formContainer">
                    <Form name="login" method="post">
                        {displayForm}
                        {displayButton}
                    </Form>
                </div>
            </div>
        </>
    )
}

export default withRouter(MLogin)