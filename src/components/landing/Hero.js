import React, { useMemo, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LayoutContainer from "../UI/LayoutContainer";
import backGroundVideo from "../../resources/landingPage/heroVideoSmallSize.mp4";
import useIntersectionObs from "../../hooks/useIntersectionObs";

const Hero = React.forwardRef((props, ref) => {
  // handling observation animation for hero content section
  const [isHeroContentIntersected, setIsHeroContentIntersected] =
    useState(false);
  const heroContentFunc = useCallback((entries, observer) => {
    const element = entries[0];
    if (element.isIntersecting) {
      setIsHeroContentIntersected(true);
    }
  }, []);
  const { targetRef: heroContent, observerRef: heroContentObserver } =
    useIntersectionObs(
      useMemo(() => ({ root: null, rootMargin: "0px", threshold: 0.5 }), []),
      heroContentFunc
    );

  useEffect(() => {
    heroContentObserver.current.observe(heroContent.current);
  }, [heroContentObserver, heroContent]);
  return (
    <article className="landing-hero" ref={ref}>
      <LayoutContainer className="container--landing-hero">
        <video className="landing-hero__video" autoPlay muted loop>
          <source src={backGroundVideo} type="video/mp4"></source>
        </video>
        <section
          className={`landing-hero__content${
            !isHeroContentIntersected
              ? " landing-hero__content--not-obsereved"
              : " landing-hero__content--obsereved"
          }`}
          ref={heroContent}
        >
          <h1 className="landing-hero__title">Managing Expenses Made Easy</h1>
          <p className="landing-hero__paragraph">
            Sign up for a new account today and bring your expenses under
            control
          </p>
          <Link className="link link--primary link--medium" to="/sign-up">
            Get started
          </Link>
        </section>
      </LayoutContainer>
    </article>
  );
});

export default Hero;
