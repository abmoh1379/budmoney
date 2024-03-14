import React from "react";
import LayoutContainer from "../UI/LayoutContainer";
import FooterSocials from "./FooterSocials";
import { Link } from "react-router-dom";
import FooterNav from "./FooterNav";
const Footer = () => {
  return (
    <footer className="landing-footer">
      <LayoutContainer className="container--landing-footer">
        <FooterSocials />
        <section className="landing-footer__contacts">
          <h3 className="landing-footer__contact-title">Contact</h3>
          <address className="landing-footer__address">
            Iran, Isfahan, Najaf Abad University, Computer Department
          </address>
          <Link className="landing-footer__contact-link" to="tel:+3131234567890">123-456-7890</Link>
          <Link className="landing-footer__contact-link" to="mailto:hello@Budmoney.com">hello@Budmoney.com</Link>
        </section>
        <FooterNav />
      </LayoutContainer>
    </footer>
  );
};

export default Footer;
