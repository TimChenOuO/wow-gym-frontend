import React from 'react'
import { withRouter } from 'react-router'
import './EmployeeLoginPage.scss'

function EmployeeLogin(props) {
    // console.log(props)
    // console.log(localStorage.getItem('employee'))

    const { eAccount, setEAccount, ePwd, setEPwd, eData, eId, setEId, setEAuth, ELoginProcess } = props

    //登入後存入localStorage
    const ELoginSuccessCallback = () => {
        const a = eAccount
        const n =
            eData &&
            eData.filter((e) => e.Eaccount === a).map((e) => (e = { e }))
        localStorage.setItem('employee', JSON.stringify(n))
        //擷取localStorage的id字串
        setEId(
            localStorage.getItem('employee').split(',', 1).join('').match(/\d+/)
        )
        setEAuth(true)
        props.history.push(`/employeecenter/${eId}`, { from: '從登入頁來' })
        console.log('e:',setEAuth)
    }

    return (
        <>
        <div className="eLoginContainer">
        <div className="eLoginForm">
            <input
                type="text"
                placeholder="請輸入帳號"
                value={eAccount}
                onChange={(e) => {
                    setEAccount(e.target.value)
                }}/>
            <input
                type="text"
                placeholder="請輸入密碼"
                value={ePwd}
                onChange={(e) => {
                    setEPwd(e.target.value)
                }}
            />
            <button
                onClick={() => {
                    ELoginProcess(ELoginSuccessCallback)
                }}
            >
                登入
      </button>
      </div>
      </div>
        </>
    )
}
export default withRouter(EmployeeLogin);