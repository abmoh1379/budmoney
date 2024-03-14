import React, {useEffect} from "react";
import { connect } from "react-redux";
import MainElement from "../components/UI/MainElement";
import { Link } from "react-router-dom";
import AuthForm from "../components/loginAndSignup/AuthForm";
import { startSignUpWithEmailAndPassword, startSignInWithGooglePopUp } from "../actions/auth";
import { selectAuthError, selectAuthLoading, resetErrorAndLoading } from "../slices/auth";

const SignUpPage = ({ startSignUpWithEmailAndPassword, resetErrorAndLoading, authLoading, authError, startSignInWithGooglePopUp }) => {
  
  useEffect(() => {
        // to remove any errors we may have left from login page.
    resetErrorAndLoading();
  } , [resetErrorAndLoading])
  const onAuthFormSubmittion = (signUpData) => {
    startSignUpWithEmailAndPassword(signUpData);
  };

  const onGoogleSignUp = () => {
    startSignInWithGooglePopUp();
  }
  return (
    <div className="app-sign-up">
      <header className="app-sign-up__header">
        <h1 className="app-sign-up__title">
          <Link className="app-sign-up__title-link" to="/">
            Budmoney
          </Link>
        </h1>
      </header>
      <MainElement>
        <AuthForm
          authLoading={authLoading}
          authError={authError}
          onAuthFormSubmittion={onAuthFormSubmittion}
          onGoogleSignUp = {onGoogleSignUp}
        />
      </MainElement>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    authLoading: selectAuthLoading(state),
    authError: selectAuthError(state),
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    startSignUpWithEmailAndPassword: (signUpData) => dispatch(startSignUpWithEmailAndPassword(signUpData)),
    resetErrorAndLoading :() => dispatch(resetErrorAndLoading()),
    startSignInWithGooglePopUp : () => dispatch(startSignInWithGooglePopUp())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
