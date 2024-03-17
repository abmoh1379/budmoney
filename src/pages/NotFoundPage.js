import React from "react";
import { Link } from "react-router-dom";
import LayoutContainer from "../components/UI/LayoutContainer";
import MainElement from "../components/UI/MainElement";
import NotFound from '../components/app/NotFound';

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <header className="not-found__header">
        <LayoutContainer className="container--not-found-header">
          <p className="not-found__title">
            <Link className="not-found__title-link" to="/" replace = {true}>
              Budmoney
            </Link>
          </p>
        </LayoutContainer>
      </header>
      <MainElement>
        <LayoutContainer className= 'container--not-found-main'>
          <NotFound />
        </LayoutContainer>
      </MainElement>
    </div>
  );
};

export default NotFoundPage;
