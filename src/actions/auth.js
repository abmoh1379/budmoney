import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  sendEmailVerification
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";

export const startSignInWithGooglePopUp = createAsyncThunk(
  "auth/startSignInWithGooglePopUp",
  async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      // we handle the switch case statement for different e.codes in auth slice.
      return e.code;
    } finally {
    }
  }
);

export const startSignUpWithEmailAndPassword = createAsyncThunk(
  "auth/startSignUpWithEmailAndPassword",
  async ({ email, password }, { getState, dispatch }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      // we handle the switch case statement for different e.codes in auth slice.
      return e.code;
    } finally {
    }
  }
);


export const startLogInWithEmailAndPassword = createAsyncThunk(
  "auth/startLogInWithEmailAndPassword",
  async ({ email, password }, { getState, dispatch }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      // we handle the switch case statement for different e.codes in auth slice.
      return e.code;
    } finally {
    }
  }
);


export const startLogout = createAsyncThunk("auth/startLogout", async () => {
  try {
    await signOut(auth);
  } catch (e) {
    // we handle the switch case statement for different e.codes in auth slice.
    return e.code;
  } finally {
  }
});


export const startSendEmailVerification = createAsyncThunk('auth/startSendEmailVerification', async (undefined, {getState, dispatch}) => {
  try {
    // the res = undefined!
    await sendEmailVerification(auth.currentUser);
  } catch (e) {
    
  } finally {

  }
})