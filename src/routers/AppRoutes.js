import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../components/UI/Loader";
import PrivateRoute from "../components/routes/PrivateRoute";
import VerifyEmailPage from "../pages/VerifyEmailPage";
import PublicRoute from "../components/routes/PublicRoute";
import DashboardPage from "../pages/DashboardPage";
import AddExpensePage from "../pages/AddExpensePage";
import EditExpensePage from "../pages/EditExpensePage";
import Header from "../components/app/Header";
import NotFoundPage from "../pages/NotFoundPage";

const LandingPageLazy = lazy(() => import("../pages/LandingPage"));
const LoginPageLazy = lazy(() => import("../pages/LoginPage"));
const SignUpLazy = lazy(() => import("../pages/SignUpPage"));
const ForgotPasswordLazy = lazy(() => import("../pages/ForgotPassword"));
const NotFoundLazy = lazy(() => import('../pages/NotFoundPage'));

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="loader-container">
          <Loader />
        </div>
      }
    >
      <Routes>
        {/* public routes*/}
        <Route element={<PublicRoute />}>
          <Route index element={<LandingPageLazy />} />
          <Route path="login" element={<LoginPageLazy />} />
          <Route path="sign-up" element={<SignUpLazy />} />
          <Route path="reset-password" element={<ForgotPasswordLazy />} />
        </Route>
        {/* protected routes*/}
        <Route element={<PrivateRoute />}>
          <Route element={<Header />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="email-verification" element={<VerifyEmailPage />} />
            <Route path="expense/add" element={<AddExpensePage />} />
            <Route path="expense/edit/:id" element={<EditExpensePage />} />
          </Route>
        </Route>
        {/* catch no routes*/}
        <Route path="*" element={<NotFoundLazy />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
