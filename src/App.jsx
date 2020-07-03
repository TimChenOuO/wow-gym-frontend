import React, { lazy, Suspense, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./component/header/Header";

// Component------
import LoadingSpinner from "./component/loading-spinner/LoadingSpinner";
import ErrorBoundary from "./component/error-boundary/ErrorBoundary";

// Redux
import { userListStart } from "./redux/user/user-action";
import { employeeListStart } from "./redux/employee/employee-action";

import "./App.scss";

// React lazy -------------------------
const SignInOutPage = lazy(() =>
  import("./pages/sign-in-out-page/Sign-in-out-page")
);
const ShopPage = lazy(() => import("./pages/shop-page/ShopPage"));
const ShopCollectionPage = lazy(() =>
  import("./pages/shop-collection-page/ShopCollectionPage")
);
const ShopItemPage = lazy(() => import("./pages/shop-item-page/ShopItemPage"));
const CheckOutPage = lazy(() => import("./pages/checkout-page/Checkout-page"));

// Zora employee Page
const EmployeeFormPage = lazy(() =>
  import("./pages/employee-form-page/EmployeeFormPage")
);
const EmployeeCenterPage = lazy(() =>
  import("./pages/employee-center-page/EmployeeCenterPage")
);
const EmployeeSignInOutPage = lazy(() =>
  import("./pages/employee-sign-in-out-page/employee-sign-in-out-page")
);
// -----------
const HomePage = () => <div>HomePage</div>;

// APP component
const App = ({ userListStart, employeeListStart }) => {
  useEffect(() => {
    userListStart();
    employeeListStart();
  }, [userListStart, employeeListStart]);

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
              <Route path="/employeeform" component={EmployeeFormPage} />
              <Route
                path={`/employeecenter/:employeeId`}
                component={EmployeeCenterPage}
              />
              <Route path="/employeelogin" component={EmployeeSignInOutPage} />
              <Route exact path="/checkout" component={CheckOutPage} />
              <Route path="/login" component={SignInOutPage} />
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </main>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  userListStart: () => dispatch(userListStart()),
  employeeListStart: () => dispatch(employeeListStart()),
});

export default connect(null, mapDispatchToProps)(App);
