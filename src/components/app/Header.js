import React from "react";
import { connect } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import LayoutContainer from "../UI/LayoutContainer";
import PrimaryBtn from "./UI/PrimaryBtn";
import { startLogout } from "../../actions/auth";
import { selectAuthLoading } from "../../slices/auth";
import Loader from "../UI/Loader";

const Header = ({ authLoading, startLogout}) => {
  const onLogOutClick = () => {
    startLogout();
  };

  let logoutBtnText;
  if (authLoading) {
    logoutBtnText = <Loader spinerColor= '#fff' spinnerHeight='' spinnerWidth= '20.7'/>;
  } else {
    logoutBtnText = "Logout";
  }

  
  return (
    <React.Fragment>
      <header className="app-header">
        <LayoutContainer className="container--app-header">
          <h1 className="app-header__title">
            <Link className="app-header__title-link" to="/dashboard">
              Budmoney
            </Link>
          </h1>
          <PrimaryBtn onClick={onLogOutClick}>{logoutBtnText}</PrimaryBtn>
        </LayoutContainer>
      </header>
      <Outlet />
    </React.Fragment>
  );
};

const mapStateToProps = (state, props) => {
  return {
    authLoading: selectAuthLoading(state),
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    startLogout: () => dispatch(startLogout())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
