import React, {useEffect} from "react";
import { connect } from "react-redux";
import MainElement from "../components/UI/MainElement";
import { Link } from "react-router-dom";
import AuthForm from "../components/loginAndSignup/AuthForm";
import { startLogInWithEmailAndPassword, startSignInWithGooglePopUp } from "../actions/auth";
import { selectAuthError, selectAuthLoading, resetErrorAndLoading } from "../slices/auth";

const LoginPage = ({ resetErrorAndLoading, startLogInWithEmailAndPassword, authLoading, authError, startSignInWithGooglePopUp }) => {

  useEffect(() => {
    // to remove any errors we may have left from signup page.
    resetErrorAndLoading()
  } ,[resetErrorAndLoading])
  const onAuthFormSubmittion = (loginData) => {
    startLogInWithEmailAndPassword(loginData);
  };

  const onGoogleLogin = () => {
    startSignInWithGooglePopUp();
  }
  return (
    <div className="app-login">
      <header className="app-login__header">
        <h1 className="app-login__title">
          <Link className="app-login__title-link" to="/">
            Budmoney
          </Link>
        </h1>
      </header>
      <MainElement>
        <AuthForm
          authLoading={authLoading}
          authError={authError}
          onAuthFormSubmittion={onAuthFormSubmittion}
          onGoogleLogin = {onGoogleLogin}
        />
      </MainElement>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    authLoading: selectAuthLoading(state),
    authError: selectAuthError(state),
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    startLogInWithEmailAndPassword: (loginData) => dispatch(startLogInWithEmailAndPassword(loginData)),
    resetErrorAndLoading : () => dispatch(resetErrorAndLoading()),
    startSignInWithGooglePopUp : () => dispatch(startSignInWithGooglePopUp())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
