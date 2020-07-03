import React, { lazy, Suspense, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

// Pages----------
import Header from "./component/header/Header";

//課程----------
import Courses from "./pages/courses-page/Courses";
import Coaches from "./pages/coaches-page/Coaches";

//會員中心
import UserCenter from "./pages/user-center-page/user-center-page"

// Component------
import LoadingSpinner from "./component/loading-spinner/LoadingSpinner";
import ErrorBoundary from "./component/error-boundary/ErrorBoundary";

// Redux
import { userListStart } from "./redux/user/user-action";
import { employeeListStart } from "./redux/employee/employee-action";

import "./App.scss";

// react lazy
const SignInOutPage = lazy(() =>
  import("./pages/sign-in-out-page/Sign-in-out-page")
);
const ShopPage = lazy(() => import("./pages/shop-page/ShopPage"));
const ShopCollectionPage = lazy(() =>
  import("./pages/shop-collection-page/ShopCollectionPage")
);
const ShopItemPage = lazy(() => import("./pages/shop-item-page/ShopItemPage"));
const CheckOutPage = lazy(() => import("./pages/checkout-page/Checkout-page"));
// -----------

// APP component
const App = ({ userListStart, employeeListStart }) => {
  useEffect(() => {
    userListStart();
    // employeeListStart();
  }, [userListStart]);

  return (
    <div>
      <Header />
      <div className="space" />
      <main>
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Route exact path="/" component={ShopPage} />
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
              <Route exact path="/checkout" component={CheckOutPage} />
              <Route path="/login" component={SignInOutPage} />

              {/* 育琳 */}
              <Route path="/courses" component={Courses} />
              <Route path="/coaches" component={Coaches} />

              {/* 會員 */}
              <Route path="/userCenter" component={UserCenter} />

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