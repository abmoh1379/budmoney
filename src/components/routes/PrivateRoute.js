import React from "react";
import { connect } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { selectUserId, selectEmailVerified } from "../../slices/auth";

const PrivateRoute = ({ uid, emailVerified }) => {
  const location = useLocation();
  let content;
  
  if(uid === null) {
    content = <Navigate to= '/login' replace = {true}/>;
  } else {
    if(!emailVerified) {
      content = <Navigate to= '/email-verification' />
    }

    if(emailVerified && location.pathname === '/email-verification') {
      content = <Navigate to= '/dashboard' replace = {true} />
    }

    if(emailVerified && location.pathname !== '/email-verification') {
      content = <Outlet />
    }
  }

  // this part exists, because, up above, we are Navigating to /email-verification page, so as the result, we need to Outlet it someway
  // and this if else statement is to do that.
  if (location.pathname === "/email-verification" && uid && !emailVerified) {
    return <Outlet />;
  } else {
    return content;
  }
};

const mapStateToProps = (state) => {
  return {
    uid: selectUserId(state),
    emailVerified: selectEmailVerified(state),
  };
};

export default connect(mapStateToProps)(PrivateRoute);
