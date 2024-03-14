import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import LayoutContainer from "../UI/LayoutContainer";

const AppNavigation = ({ navTitle, linksArray = [] }) => {      // we add = [] to avoid crash of application when there are no links in this navigation.
  const arrayOfLinks = useMemo(() => {
    return linksArray.map(({to, text}, index) => {
      return (
        <li key={index} className="app-nav__list-item">
          <Link className="app-nav__link" to={to}>{text}</Link>
        </li>
      );
    });
  }, [linksArray]);
  return (
    <nav className="app-nav">
      <LayoutContainer className= 'container--app-nav'>
        <h2 className="app-nav__title">{navTitle}</h2>
        <ul className="app-nav__list">{arrayOfLinks}</ul>
      </LayoutContainer>
    </nav>
  );
};

export default AppNavigation;
