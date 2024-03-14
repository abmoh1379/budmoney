import React from "react";
import { Link } from "react-router-dom";

const FooterNav = () => {
  return (
    <nav className="landing-footer__nav">
      <ul className="landing-footer__list">
        <div className="landing-footer__indivisual-lists-container">
          <li className="landing-footer__list-title">Account</li>
          <li className="landing-footer__list-item">
            <Link className="landing-footer__list-link" to="/sign-up">
              Create account
            </Link>
          </li>
          <li className="landing-footer__list-item">
            <Link className="landing-footer__list-link" to="/login">
              Sign in
            </Link>
          </li>
          <li className="landing-footer__list-item">
            <Link className="landing-footer__list-link">iOS app</Link>
          </li>
          <li className="landing-footer__list-item">
            <Link className="landing-footer__list-link">Android app</Link>
          </li>
        </div>
        <div className="landing-footer__indivisual-lists-container">
          <li className="landing-footer__list-title">Company</li>
          <li className="landing-footer__list-item">
            <Link className="landing-footer__list-link">About Budmoney</Link>
          </li>
          <li className="landing-footer__list-item">
            <Link className="landing-footer__list-link">For Business</Link>
          </li>
          <li className="landing-footer__list-item">
            <Link className="landing-footer__list-link">Careers</Link>
          </li>
        </div>
        <div className="landing-footer__indivisual-lists-container">
          <li className="landing-footer__list-title">Resources</li>
          <li className="landing-footer__list-item">
            <Link className="landing-footer__list-link">Help center</Link>
          </li>
          <li className="landing-footer__list-item">
            <Link className="landing-footer__list-link">Privacy & terms</Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default FooterNav;
