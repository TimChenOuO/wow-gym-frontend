import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'


// Pages----------
import Header from "./component/header/Header";

// Component------
import LoadingSpinner from "./component/loading-spinner/LoadingSpinner";

import "./App.scss";
import ErrorBoundary from "./component/error-boundary/ErrorBoundary";

//課程----------
import Courses from './pages/courses-page/Courses'
import Coaches from './pages/coaches-page/Coaches'
//會員登入-----------
import MLogin from './pages/MLogin-page/MLogin'
//教練中心-----------
import EmployeeFormPage from './pages/employee-form-page/EmployeeFormPage'
import EmployeeCenterPage from './pages/employee-center-page/EmployeeCenterPage'
import EmployeeLoginPage from './pages/employee-login-page/EmployeeLoginPage'


// react lazy
const ShopPage = lazy(() => import("./pages/shop-page/ShopPage"));
const ShopCollectionPage = lazy(() =>
  import("./pages/shop-collection-page/ShopCollectionPage")
);
const ShopItemPage = lazy(() => import("./pages/shop-item-page/ShopItemPage"));

const HomePage = () => <div>Hi</div>;
// APP component
const App = () => {

  //會員帳號
  const [mAccount, setMAccount] = useState('')
  //會員密碼
  const [mPwd, setMPwd] = useState('')
  //會員Id
  const [mId, setMId] = useState('')
  //會員登入狀態
  const [mAuth, setMAuth] = useState(false)
  //get會員API
  const [mData, setMData] = useState([])
  //教練
  const [eAccount, setEAccount] = useState('')
  const [ePwd, setEPwd] = useState('')
  const [eAuth, setEAuth] = useState(false)
  const [eData, setEData] = useState([])
  const [eId, setEId] = useState('')

  //fetch member api
  async function getMemberData() {
    const request = new Request('http://localhost:5000/api/member', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    setMData(data)

  }

  //會員登入判斷該帳號密碼是否存在以及相符
  const MLoginProcess = (MLoginSuccessCallback) => {
    //找帳號在資料庫中是否存在
    const dataAccount = mData.membersRow
      .map((item, index) => {
        return item.memberAccount
      })
      .indexOf(mAccount)
    //找密碼在資料庫中是否存在
    const dataPwd = mData.membersRow
      .map((item, index) => {
        return item.memberPwd
      })
      .indexOf(mPwd)
    if (dataAccount != -1 && dataPwd != -1) {
      alert('登入成功')
      // console.log(mData)
    } else {
      alert('輸入帳號密碼有誤')
    }
    MLoginSuccessCallback()
  }

  //登出時清空會員帳號、密碼的值
  const MLogoutProcess = (MLogoutSuccessCallback) => {
    setMAccount('')
    setMPwd('')
    MLogoutSuccessCallback()
  }
  //--------------教練-----------------
  //fetch employee data
  async function getEmployeeData() {
    const request = new Request('http://localhost:5000/api/employee', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    setEData(data)

    // console.log(edata)
  }

  const ELoginProcess = (ELoginSuccessCallback) => {
    const dataAccount = eData
      .map((item, index) => {
        return item.Eaccount
      })
      .indexOf(eAccount)

    const dataPwd = eData
      .map((item, index) => {
        return item.Epwd
      })
      .indexOf(ePwd)

    // console.log(dataAccount)
    // console.log(dataPwd)

    //判斷帳號密碼是否存在
    if (dataAccount !== -1 && dataPwd !== -1) {
      alert('登入成功')
    } else {
      alert('輸入帳號密碼有誤')
    }
    ELoginSuccessCallback()
  }

  //登出清空狀態
  const ELogoutProcess = (ELogoutSuccessCallback) => {
    setEAccount('')
    setEPwd('')
    setEId('')

    ELogoutSuccessCallback()
  }

  useEffect(() => {
    //每次render以localStorage有沒有member值以保持auth為true或false
    getMemberData()
    getEmployeeData()

    //--------會員---------
    // //每次render後都抓localStorage的值
    if (localStorage.getItem('member') !== null) {
      setMAuth(true)
      // //單獨存會員id
      setMId(localStorage.getItem('member').split(',', 1).join('').match(/\d+/))
    }
    //--------教練---------
    if (localStorage.getItem('employee') !== null) {
      setEAuth(true)
      setEId(localStorage.getItem('employee').split(',', 1).join('').match(/\d+/))
    }
  }, [])


  return (
    <div>
      <Header />
      <div className="space" />
      <main>
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/shopping" component={ShopPage} />
              <Route
                exact
                path="/shop/:collection?/:itemType?"
                component={ShopCollectionPage}
              />
              <Route
                path="/shopitem/:collection/:itemId"
                component={ShopItemPage}
              />
              <Route path="/mLogin">
                <MLogin
                  mAuth={mAuth}
                  setMAuth={setMAuth}
                  mAccount={mAccount}
                  setMAccount={setMAccount}
                  mPwd={mPwd}
                  setMPwd={setMPwd}
                  MLoginProcess={MLoginProcess}
                  MLogoutProcess={MLogoutProcess}
                  mData={mData}
                  setMData={setMData}
                  mId={mId}
                  setMId={setMId}
                />
              </Route>

              <Route path="/employeeform">
                <EmployeeFormPage eId={eId} setEId={setEId} />
              </Route>
              <Route path={`/employeecenter/${eId}`}>
                <EmployeeCenterPage
                  eAuth={eAuth}
                  setEAuth={setEAuth}
                  eId={eId}
                  setEId={setEId}
                />
              </Route>
              <Route path="/employeelogin">
                <EmployeeLoginPage
                  eAuth={eAuth}
                  setEAuth={setEAuth}
                  eAccount={eAccount}
                  setEAccount={setEAccount}
                  ePwd={ePwd}
                  setEPwd={setEPwd}
                  eData={eData}
                  ELoginProcess={ELoginProcess}
                  eId={eId}
                  setEId={setEId}
                />
              </Route>

              <Route path="/courses">
                <Courses
                  mAuth={mAuth}
                  setMAuth={setMAuth}
                  mId={mId}
                  setMId={setMId}
                />
              </Route>

              <Route path="/coaches">
                <Coaches
                  mId={mId}
                  setMId={setMId}
                />
              </Route>
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </main>
    </div>
  );
};

export default connect(null)(App);
