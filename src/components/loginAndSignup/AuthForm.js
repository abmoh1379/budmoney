import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import GoogleButton from "react-google-button";
import { useLocation } from "react-router-dom";
import useInput from "../../hooks/useInput";
import PrimaryBtn from "../app/UI/PrimaryBtn";
import Loader from "../UI/Loader";

const AuthForm = ({ authLoading, authError, onAuthFormSubmittion, onGoogleSignUp, onGoogleLogin }) => {
  const { pathname } = useLocation();
  const currentPage = pathname === "/sign-up" ? "sign-up" : "login";
  // Email useInput hook setup
  const emailInputValidator = useCallback((value) => {
    if (value.length === 0) {
      return "Email is required!";
    } else if (
      value.length &&
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)
    ) {
      return "Incorrect email format!";
    }
    return "";
  }, []);
  const {
    inputValue: emailValue,
    onInputChange: onEmailChange,
    onInputBlur: onEmailBlur,
    error: emailError,
    isInputValid: isEmailValid,
    inputDispatcher: emailDispatcher,
  } = useInput("", emailInputValidator);

  // Password useInput hook setup
  const passwordInputValidator = useCallback(
    (value) => {
      if (value.length === 0) {
        return "Password is required!";
      } else if (currentPage === "sign-up") {
        if (
          value.length &&
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$$/.test(
            value
          )
        ) {
          return "Password must be atleast 8 and maximum 15 characters long. It must also include atleast 1 lowercase and uppercase letters, 1 number and 1 special character. Spcecial characters allowed are @$!%*?&";
        }
      }
      return "";
    },
    [currentPage]
  );
  const {
    inputValue: passwordValue,
    onInputChange: onPasswordChange,
    onInputBlur: onPasswordBlur,
    error: passwordError,
    isInputValid: isPasswordValid,
    inputDispatcher: passwordDispatcher,
  } = useInput("", passwordInputValidator);

  // Password useInput hook setup
  const confirmPasswordInputValidator = useCallback(
    (value) => {
      if (!value.length) {
        return "Confirm password is required!";
      } else if (value !== passwordValue) {
        return "Passwords do not match!";
      }
      return "";
    },
    [passwordValue]
  );

  const {
    inputValue: confirmPasswordValue,
    onInputChange: onConfirmPasswordChange,
    onInputBlur: onConfirmPasswordBlur,
    error: confirmPasswordError,
    isInputValid: isConfirmPasswordValid,
    inputDispatcher: confirmPasswordDispatcher,
  } = useInput("", confirmPasswordInputValidator);

  //   checking if form is valid for enabling the btn and let submit happen
  let isFormValid = false;
  if (currentPage === "sign-up") {
    if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      isFormValid = true;
    }
  } else {
    if (isEmailValid && isPasswordValid) {
      isFormValid = true;
    }
  }

  const onFormSubmit = (e) => {
    e.preventDefault();

    emailDispatcher({ type: "INPUT_TOUCHED_TRUE" });
    passwordDispatcher({ type: "INPUT_TOUCHED_TRUE" });
    if (currentPage === "sign-up") {
      confirmPasswordDispatcher({ type: "INPUT_TOUCHED_TRUE" });
    }

    if (isFormValid) {
      onAuthFormSubmittion({
        email: emailValue.trim(),
        password: passwordValue.trim(),
      });
    }
  };

  const containerTitle =
    currentPage === "sign-up" ? "Create an account" : "Sign in to your account";

  let formSubmitBtnText;
  if (currentPage === "sign-up") {
    if (authLoading) {
      formSubmitBtnText = (
        <Loader spinerColor="#fff" spinnerWidth="27" spinnerHeight="27" />
      );
    } else {
      formSubmitBtnText = "Sign up";
    }
  } else {
    if (authLoading) {
      formSubmitBtnText = (
        <Loader spinerColor="#fff" spinnerWidth="27" spinnerHeight="27" />
      );
    } else {
      formSubmitBtnText = "Login";
    }
  }

  const formParagraph =
    currentPage === "sign-up"
      ? "Already have an account? "
      : `Doesn't have an account? `;
  const formParagraphLink =
    currentPage === "sign-up" ? "Login here!" : "Sign up here!";
  const googleBtnLabel =
    currentPage === "sign-up" ? "Sign up with google" : "Sign in with google";
  const formParagraphLinkTo = currentPage === "sign-up" ? "/login" : "/sign-up";

  return (
    <article className="form-container">
      <h2 className="form-container__title">{containerTitle}</h2>
      <p className="form-container__error-message">{authError}</p>
      <form className="form-container__form" onSubmit={onFormSubmit}>
        <section className="form-container__input-container">
          {/* we need this input-label-container for the effect of label we need.*/}
          <div className="form-container__input-label-container">
            <input
              className={`form-container__input${
                emailError ? " form-container__input--invalid" : ""
              }`}
              type="text"
              placeholder=""
              id="email"
              autoComplete="on"
              value={emailValue}
              onChange={onEmailChange}
              onBlur={onEmailBlur}
            />
            <label className="form-container__input-label" htmlFor="email">
              Email
            </label>
          </div>
          <p className="form-container__input-error">{emailError}</p>
        </section>
        <section className="form-container__input-container">
          {/* we need this input-label-container for the effect of label we need.*/}
          <div className="form-container__input-label-container">
            <input
              className={`form-container__input${
                passwordError ?" form-container__input--invalid" : ""
              }`}
              type="password"
              placeholder=""
              id="password"
              autoComplete="off"
              value={passwordValue}
              onChange={onPasswordChange}
              onBlur={onPasswordBlur}
            />
            <label className="form-container__input-label" htmlFor="password">
              Password
            </label>
          </div>
          <p className="form-container__input-error">{passwordError}</p>
        </section>
        {/* we are allowed to conditionally render this due to login absolutely should not have the confirm password input*/}
        {currentPage === "sign-up" && (
          <section className="form-container__input-container">
            {/* we need this input-label-container for the effect of label we need.*/}
            <div className="form-container__input-label-container">
              <input
                className={`form-container__input${
                  confirmPasswordError
                    ? " form-container__input--invalid"
                    : ""
                }`}
                type="password"
                placeholder=""
                id="confirmPassword"
                autoComplete="off"
                value={confirmPasswordValue}
                onChange={onConfirmPasswordChange}
                onBlur={onConfirmPasswordBlur}
              />
              <label
                className="form-container__input-label"
                htmlFor="confirmPassword"
              >
                Confirm password
              </label>
            </div>
            <p className="form-container__input-error">
              {confirmPasswordError}
            </p>
          </section>
        )}
        <PrimaryBtn className="button--flex-align-stretch" type="submit">
          {formSubmitBtnText}
        </PrimaryBtn>
        <GoogleButton
          label={googleBtnLabel}
          type="dark"
          onClick={() => {
            if(currentPage === 'sign-up') {
              onGoogleSignUp();
            } else {
              onGoogleLogin();
            }
          }}
        />
      </form>
      <p className="form-container__paragraph">
        {formParagraph}
        <Link
          className="form-container__prargraph-link"
          to={formParagraphLinkTo}
        >
          {formParagraphLink}
        </Link>
      </p>
    </article>
  );
};

export default AuthForm;
