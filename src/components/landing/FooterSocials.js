import React from "react";
import { Link } from "react-router-dom";
import facebookSvg from "../../resources/landingPage/svgs/logoFacebookSvg.svg";
import instagramSvg from "../../resources/landingPage/svgs/logoInstagramSvg.svg";
import twitterSvg from "../../resources/landingPage/svgs/logoTwitterSvg.svg";

const FooterSocials = () => {
  return (
    <section className="landing-footer__socials-content">
      <div className="landing-footer__socials-svgs">
        <Link className="landing-footer__social-link" to= 'https://www.facebook.com/'>
          <figure className="landing-footer__social-svg-fig">
            <img
              className="landing-footer__social-svg"
              src={facebookSvg}
              alt="facebook icon"
              title="facebook icon"
            />
          </figure>
        </Link>
        <Link className="landing-footer__social-link" to= 'https://www.instagram.com/'>
          <figure className="landing-footer__social-svg-fig">
            <img
              className="landing-footer__social-svg"
              src={instagramSvg}
              alt="instagram icon"
              title="instagram icon"
            />
          </figure>
        </Link>
        <Link className="landing-footer__social-link" to= 'https://www.twitter.com/'>
          <figure className="landing-footer__social-svg-fig">
            <img
              className="landing-footer__social-svg"
              src={twitterSvg}
              alt="twitter icon"
              title="twitter icon"
            />
          </figure>
        </Link>
      </div>
      <p className="landing-footer__copy-text">
        Copyright © 2022 by Budmoney, Inc. All rights reserved.
      </p>
    </section>
  );
};

export default FooterSocials;
