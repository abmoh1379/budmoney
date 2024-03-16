import { createSlice } from "@reduxjs/toolkit";
import {
  startSignUpWithEmailAndPassword,
  startLogInWithEmailAndPassword,
  startLogout,
  startSignInWithGooglePopUp,
  startSendEmailVerification,
  startSendPasswordResetEmail,
} from "../actions/auth";

const initialState = {
  uid: null,
  loading: false,
  error: null,
  emailVerified: false,
  email: null,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: {
      reducer: (state, { payload: { uid, emailVerified, email } }) => {
        state.uid = uid;
        state.emailVerified = emailVerified;
        state.email = email;
      },
      prepare: ({ uid, emailVerified, email }) => {
        return {
          payload: {
            uid,
            emailVerified,
            email,
          },
        };
      },
    },
    logout: (state, action) => {
      state.uid = null;
      state.emailVerified = false;
      state.email = null;
    },
    resetErrorAndLoading: (state, action) => {
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startSignInWithGooglePopUp.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startSignInWithGooglePopUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        switch (payload) {
          case "auth/operation-not-allowed":
            state.error = "Email/password accounts are not enabled!";
            break;
          case "auth/operation-not-supported-in-this-environment":
            state.error = "HTTP protocol is not supported. Please use HTTPS!";
            break;
          case "auth/popup-blocked":
            state.error =
              "Popup has been blocked by the browser. Please allow popups for this website!";
            break;
          case "auth/popup-closed-by-user":
            state.error =
              "Popup has been closed by the user before finalizing the operation. Please try again!";
            break;
          // the payload could only come from catch of asyncThunkFunction, so if the case does not exist, the payload is still some error with some code. we display the error code that firebase sends us.
          default:
            state.error = payload;
        }
      })
      .addCase(startSignInWithGooglePopUp.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(startSignUpWithEmailAndPassword.pending, (state, action) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(
        startSignUpWithEmailAndPassword.fulfilled,
        (state, { payload }) => {
          // in signUp and signIn, we dont need to take any payload, the onAuthStateChange will automatically set the uid of user in auth state after login and logout due to actions created in reducers.
          state.loading = false;
          switch (payload) {
            case "auth/email-already-in-use":
              state.error = "Email address is already in use!";
              break;
            case "auth/weak-password":
              state.error = "Weak password!";
              break;
            case "auth/network-request-failed":
              state.error =
                "A network request has failed. Please check your network connection!";
              break;
            case "auth/internal-error":
              state.error = "An internal error has occurred.";
              break;
            case "auth/invalid-email":
              state.error = "Email format is incorrect!";
              break;
            case "auth/app-deleted":
              state.error = "The authentication module has been deleted!";
              break;
            case "auth/no-auth-event":
              state.error = "No authentication event!";
              break;
            case "auth/popup-blocked":
              state.error = "Popup blocked by the browser!";
              break;
            case "auth/timeout":
              state.error = "A timeout has occurred!";
              break;
            case "auth/too-many-requests":
              state.error = "Too many attempts. Please try again later!";
              break;
            case "auth/unverified-email":
              state.error = "Unverified email address!";
              break;
            case "auth/user-cancelled":
              state.error = "User cancelled authentication!";
              break;
            case "auth/user-disabled":
              state.error = "User account is disabled!";
              break;
            // the payload could only come from catch of asyncThunkFunction, so if the case does not exist, the payload is still some error with some code. we display the error code that firebase sends us.
            default:
              state.error = payload;
          }
        }
      )
      .addCase(startSignUpWithEmailAndPassword.rejected, (state, action) => {
        state.loading = false;
        // in firebase, even if we get an error, we are still fulfilling, so we need to handle errors in .fulfilled addCase
      })
      .addCase(startLogInWithEmailAndPassword.pending, (state, action) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(
        startLogInWithEmailAndPassword.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          // in signUp and signIn, we dont need to take any payload, the onAuthStateChange will automatically set the uid of user in auth state after login and logout due to actions created in reducers.
          switch (payload) {
            case "auth/invalid-credential":
              state.error = "Password is incorrect!";
              break;
            case "auth/user-not-found":
              state.error = "No user found with the provided email address!";
              break;
            case "auth/invalid-email":
              state.error = "Email format is incorrect!";
              break;
            case "auth/internal-error":
              state.error = "An internal error has occurred!";
              break;
            case "auth/network-request-failed":
              state.error =
                "A network request has failed. Please check your network connection!";
              break;
            case "auth/app-deleted":
              state.error = "The authentication module has been deleted!";
              break;
            case "auth/no-auth-event":
              state.error = "No authentication event!";
              break;
            case "auth/popup-blocked":
              state.error = "Popup blocked by the browser!";
              break;
            case "auth/timeout":
              state.error = "A timeout has occurred!";
              break;
            case "auth/too-many-requests":
              state.error = "Too many attempts. Please try again later!";
              break;
            case "auth/unverified-email":
              state.error = "Unverified email address!";
              break;
            case "auth/user-cancelled":
              state.error = "User cancelled authentication!";
              break;
            case "auth/user-disabled":
              state.error = "User account is disabled!";
              break;
            // the payload could only come from catch of asyncThunkFunction, so if the case does not exist, the payload is still some error with some code. we display the error code that firebase sends us.
            default:
              state.error = payload;
          }
        }
      )
      .addCase(startLogInWithEmailAndPassword.rejected, (state, action) => {
        state.loading = false;
        // in firebase, even if we get an error, we are still fulfilling, so we need to handle errors in .fulfilled addCase
      })
      .addCase(startLogout.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startLogout.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(startLogout.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(startSendEmailVerification.pending, (state, action) => {})
      .addCase(startSendEmailVerification.fulfilled, (state, action) => {})
      .addCase(startSendEmailVerification.rejected, (state, action) => {})
      .addCase(startSendPasswordResetEmail.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(startSendPasswordResetEmail.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          switch (payload) {
            case "auth/network-request-failed":
              state.error =
                "A network request has failed. Please check your network connection!";
              break;
            default:
              state.error = payload;
          }
        }
      })
      .addCase(startSendPasswordResetEmail.rejected, (state, action) => {});
  },
});

export const selectUserId = (state) => state.auth.uid;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectEmailVerified = (state) => state.auth.emailVerified;
export const selectUserEmail = (state) => state.auth.email;
export const { login, logout, resetErrorAndLoading } = auth.actions;
export default auth.reducer;
