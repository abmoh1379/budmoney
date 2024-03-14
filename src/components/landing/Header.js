import React, { useState } from "react";
import LayoutContainer from "../UI/LayoutContainer";
import { Link as LinkR } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { Link as LinkS } from "react-scroll";

const Header = ({ sticky }) => {
  const [hamburger, setHamburger] = useState(false);
  const onHamburgerClick = () => {
    setHamburger(true);
  };

  const onCrossClick = () => {
    setHamburger(false);
  };
  return (
    <header
      className={`landing-header${sticky ? " sticky" : ""}${
        hamburger ? " show-list" : ""
      }`}
    >
      <LayoutContainer className="container--landing-header">
        <p className="landing-header__title">
          <LinkR className="landing-header__title-link" to="/">
            Budmoney
          </LinkR>
        </p>
        {/* using button for semantic action meaning*/}
        <button
          className="landing-header__hamburger-btn"
          onClick={onHamburgerClick}
        >
          <GiHamburgerMenu className="landing-header__hamburger-svg" />
        </button>
        <ul className="landing-header__list">
          {/* using button for semantic action meaning*/}
          {hamburger && (
            <button
              className="landing-header__cross-btn"
              onClick={onCrossClick}
            >
              <ImCross className="landing-header__cross-svg" />
            </button>
          )}
          <div className="landing-header__list-nav-links">
            <li className="landing-header__list-item">
              <LinkS
                activeClass="landing-header__list-item-link--active"
                className="landing-header__list-item-link"
                to="about"
                spy={true}
                smooth={true}
                offset={-65}
                duration={500}
                onClick={onCrossClick} /* to close the hamburger menu list upon click*/
              >
                About
              </LinkS>
            </li>
            <li className="landing-header__list-item">
              <LinkS
                activeClass="landing-header__list-item-link--active"
                className="landing-header__list-item-link"
                to="discover"
                spy={true}
                smooth={true}
                offset={-64}
                duration={500}
                onClick={onCrossClick} /* to close the hamburger menu list upon click*/
              >
                Discover
              </LinkS>
            </li>
            <li className="landing-header__list-item">
              <LinkS
                activeClass="landing-header__list-item-link--active"
                className="landing-header__list-item-link"
                to="signUp"
                spy={true}
                smooth={true}
                offset={-63}
                duration={500}
                onClick={onCrossClick} /* to close the hamburger menu list upon click*/
              >
                Sign up
              </LinkS>
            </li>
            <li className="landing-header__list-item">
              <LinkS
                activeClass="landing-header__list-item-link--active"
                className="landing-header__list-item-link"
                to="services"
                spy={true}
                smooth={true}
                offset={-62}
                duration={500}
                onClick={onCrossClick} /* to close the hamburger menu list upon click*/
              >
                Services
              </LinkS>
            </li>
          </div>
          <li className="landing-header__list-item">
            <LinkR className="link link--primary link--medium" to="/login">
              Sign in
            </LinkR>
          </li>
        </ul>
      </LayoutContainer>
    </header>
  );
};

export default Header;
