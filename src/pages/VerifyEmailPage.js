import React from "react";
import MainElement from "../components/UI/MainElement";
import LayoutContainer from "../components/UI/LayoutContainer";
import VerifyEmail from "../components/app/VerifyEmail";

const VerifyEmailPage = () => {
  return (
    <MainElement>
      <LayoutContainer className="container--verify-email">
        <VerifyEmail />
      </LayoutContainer>
    </MainElement>
  );
};

export default VerifyEmailPage;
