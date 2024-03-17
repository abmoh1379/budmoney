import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import store from "./store/store";
import { login, logout } from "./slices/auth";
import { startFetchUserExpenses } from "./actions/expenses";
import App from "./App";
import ErrorBoundry from "./components/ErrorBoundry";
import Loader from "./components/UI/Loader";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

const loading = (
  <div className="loader-container">
    <Loader />
  </div>
);

const jsx = (
  <React.Fragment>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route element={<ErrorBoundry />}>
            <Route path="/*" element={<App />} />
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.Fragment>
);

root.render(loading);

let appHasRendered = false;
const renderApp = () => {
  if (!appHasRendered) {
    appHasRendered = true;
    root.render(jsx);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    const { uid, email, emailVerified } = user;
    store.dispatch(
      login({
        uid,
        emailVerified,
        email,
      })
    );
    store
      .dispatch(startFetchUserExpenses())
      .unwrap()
      .then(() => {
        renderApp();
      });
    // we dont wait untill expenses are fetched and then move to login page, we want to show some loading in expensesList. this is the standard and what user expects.
    // the above mentioned is handeled only via privateRoute and publicRoute components. because when we update the client state
    // with dispatch(login), the publicRoute will automatically send us to /dashboard without waiting for startFetch... to finish.
  } else {
    renderApp();
    if (store.getState().auth.uid) {
      store.dispatch(logout());
    }
  }
});
