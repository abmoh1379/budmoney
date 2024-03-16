import React, { useEffect, useReducer, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  selectAuthError,
  selectAuthLoading,
  resetErrorAndLoading,
} from "../slices/auth";
import { startSendPasswordResetEmail } from "../actions/auth";
import AuthForm from "../components/loginAndSignup/AuthForm";
import MainElement from "../components/UI/MainElement";

const resetPassReducer = (state, action) => {
  switch (action.type) {
    case "SET_SUCCESS_MSG": {
      return {
        ...state,
        resetPassEmailSuccessMsg: action.payload,
      };
    }
    case "START_BTN_TIMER": {
      return {
        ...state,
        sendResetPassEmailTimer: 60,
      };
    }
    case "REDUCE_TIMER_BY_1": {
      return {
        ...state,
        sendResetPassEmailTimer: state.sendResetPassEmailTimer - 1,
      };
    }
    default:
      return state;
  }
};

const resetPassInitialState = {
  resetPassEmailSuccessMsg: "",
  sendResetPassEmailTimer: -1,
};

const ForgotPassword = ({
  authError,
  authLoading,
  startSendPasswordResetEmail,
  resetErrorAndLoading,
}) => {
  // this useRef is used to stop the interval
  const resetPassIntervalRef = useRef();
  const [
    { resetPassEmailSuccessMsg, sendResetPassEmailTimer },
    resetPassDispatcher,
  ] = useReducer(resetPassReducer, resetPassInitialState);
  const onAuthFormSubmittion = async (userEmail) => {
    resetPassDispatcher({ type: "SET_SUCCESS_MSG", payload: "" });
    try {
      await startSendPasswordResetEmail(userEmail);
      resetPassDispatcher({
        type: "SET_SUCCESS_MSG",
        payload: `Reset password email has been succesfully sent to ${userEmail}`,
      });
      resetPassDispatcher({ type: "START_BTN_TIMER" });
      resetPassIntervalRef.current = setInterval(() => {
        resetPassDispatcher({ type: "REDUCE_TIMER_BY_1" });
      }, 1000);
    } catch (e) {
    } finally {
    }
  };

  useEffect(() => {
    if (sendResetPassEmailTimer < 0) {
       clearInterval(resetPassIntervalRef.current);
    }
  }, [sendResetPassEmailTimer]);
  //   to remove any potential error and loadings we might have from login and signup page.
  useEffect(() => {
    resetErrorAndLoading();
  }, [resetErrorAndLoading]);
  return (
    <div className="app-reset-pass">
      <header className="app-reset-pass__header">
        <h1 className="app-reset-pass__header-title">
          <Link className="app-reset-pass__header-link" to="/">
            Budmoney
          </Link>
        </h1>
      </header>
      <MainElement>
        <AuthForm
          authError={authError}
          authLoading={authLoading}
          onAuthFormSubmittion={onAuthFormSubmittion}
          setResetPassEmailSuccessMsg={resetPassEmailSuccessMsg}
          sendResetPassEmailTimer = {sendResetPassEmailTimer}
        />
      </MainElement>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    authError: selectAuthError(state),
    authLoading: selectAuthLoading(state),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    startSendPasswordResetEmail: (userEmail) =>
      dispatch(startSendPasswordResetEmail(userEmail)),
    resetErrorAndLoading: () => dispatch(resetErrorAndLoading()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
