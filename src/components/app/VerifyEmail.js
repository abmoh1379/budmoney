import React, { useEffect, useReducer, useRef } from "react";
import { connect } from "react-redux";
import { selectUserEmail } from "../../slices/auth";
import { startSendEmailVerification } from "../../actions/auth";
import Loader from "../UI/Loader";
import PrimaryBtn from "./UI/PrimaryBtn";

const verificationReducer = (state, action) => {
  switch (action.type) {
    case "EMAIL_VERIFICATION_PENDING": {
      return {
        status: "pending",
        error: null,
        reSendBtnTimer: -1,
      };
    }
    case "SENDING_EMAIL_VERIFICATION_FAILURE": {
      return {
        status: "rejected",
        error: action.payload,
        reSendBtnTimer: -1,
      };
    }
    case "EMAIL_VERIFICATION_SUCCESS": {
      return {
        status: "fulfilled",
        error: null,
        reSendBtnTimer: 120,
      };
    }
    case "REDUCE_RESEND_EMAIL_BTN_TIMER_BY_1": {
      return {
        status: "fulfilled",
        error: null,
        reSendBtnTimer: state.reSendBtnTimer - 1,
      };
    }
    default:
      return state;
  }
};

const verificationInitialState = {
  status: "idle", // idle, fulfilled, rejected, pending
  error: null,
  reSendBtnTimer: -1,
};

const VerifyEmail = ({
  userEmail,
  startSendEmailVerification
}) => {
  const resendBtnIntervalRef = useRef();
  // we are not using loading and error global state for email verification process due to overlap of it with logout process.
  const [{ status, error, reSendBtnTimer }, verificationDispatcher] =
    useReducer(verificationReducer, verificationInitialState);

  const onSendEmailVerificationClick = async () => {
    try {
      verificationDispatcher({ type: "EMAIL_VERIFICATION_PENDING" });
      await startSendEmailVerification();
      verificationDispatcher({ type: "EMAIL_VERIFICATION_SUCCESS" });
      resendBtnIntervalRef.current = setInterval(() => {
        verificationDispatcher({ type: "REDUCE_RESEND_EMAIL_BTN_TIMER_BY_1" });
      }, 1000);
    } catch (e) {
      // not returing the error to slice, instead handling it here!
      verificationDispatcher({ type: "SENDING_EMAIL_VERIFICATION_FAILURE" });
    }
  };

  // we have this useEffect to disable=false the reSend verification email after 60s ended
  useEffect(() => {
    if (reSendBtnTimer === -1) {
      clearInterval(resendBtnIntervalRef.current);
    }
  }, [reSendBtnTimer]);

  // we have this useEffect to clear the interval of btn countdown for resubmitting the request just in case of things breaking down
  useEffect(() => {
    return () => {
      clearInterval(resendBtnIntervalRef.current);
    };
  }, []);

  let verificationParagraph;
  let resendBtnText;
  let fulfilledLogoutText = <p></p>;
  let resendBtnDisableValue = reSendBtnTimer === -1 ? false : true;
  let content;

  if (status === "idle") {
    verificationParagraph = (
      <p className="app-verify-content__msg">
        Please, verify{" "}
        <span className="app-verify-content__bold-text">{userEmail}</span> by
        clicking the link below.
      </p>
    );
    resendBtnText = "Send Verification Email";
  } else if (status === "rejected") {
    verificationParagraph = <p className="app-verify-content__msg"></p>;
    resendBtnText = "Resend Verification Email";
  } else if (status === "fulfilled") {
    verificationParagraph = (
      <p className="app-verify-content__msg">
        Verification email has been sent to{" "}
        <span className="app-verify-content__bold-text">{userEmail}</span>{" "}
        successfully. Please click the link in the received email to verify your
        account.{" "}
      </p>
    );
    fulfilledLogoutText = (
      <p className="app-verify-content__msg">
        If you successfully verified your email address, you need to{" "}
        <span className="app-verify-content__bold-text">
          logout and login again
        </span>{" "}
        into the application.
      </p>
    );
    if (reSendBtnTimer === -1) {
      resendBtnText = "Resend Verification Email";
    } else {
      resendBtnText = `Resend in ${reSendBtnTimer} seconds`;
    }
  }

  if (status === "pending") {
    content = (
      <article className="app-verify-loader-container">
        <Loader />
        <p className="app-verify-content__loading-msg">
          Sending verification email...
        </p>
      </article>
    );
  } else {
    content = (
      <React.Fragment>
        <article className="app-verify-content">
          <h2 className="app-verify-content__title">Verify your email</h2>
          {error && <p className="app-verify-content__error">some Error</p>}
          {verificationParagraph}
          {fulfilledLogoutText}
          <PrimaryBtn
            onClick={onSendEmailVerificationClick}
            disabled={resendBtnDisableValue}
          >
            {resendBtnText}
          </PrimaryBtn>
        </article>
      </React.Fragment>
    );
  }
  return content;
};

const mapStateToProps = (state, props) => {
  return {
    userEmail: selectUserEmail(state),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    startSendEmailVerification: () => dispatch(startSendEmailVerification())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
