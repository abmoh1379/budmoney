import React, { useCallback, useEffect, useMemo, useState } from "react";
import LayoutContainer from "../UI/LayoutContainer";
import { Link } from "react-router-dom";
import useIntersectionObs from "../../hooks/useIntersectionObs";

const InfoSection = ({
  subtitle,
  title,
  paragraph,
  linkText,
  btnBackGroundColor,
  image,
  imgAlt,
  imgTitle,
  imgWidth,
  imgHeight,
  linkTo,
  sectionBackGround,
  scrollId,
}) => {
  // handling observation animation for infoSection content section
  const [isInfoSectionIntersected, setIsInfoSectionIntersected] =
    useState(false);
  const infoContentIntersectionFunc = useCallback((entries, obserer) => {
    const element = entries[0];
    if (element.isIntersecting) {
      setIsInfoSectionIntersected(true);
      // we dont need element.unobserver, since we are not removing the class anymore.
    }
  }, []);

  const { targetRef: infoContent, observerRef: infoContentObserver } =
    useIntersectionObs(
      useMemo(() => ({ root: null, rootMargin: "0px", threshold: 0.2 }), []),
      infoContentIntersectionFunc
    );

  useEffect(() => {
    infoContentObserver.current.observe(infoContent.current);
  }, [infoContentObserver, infoContent]);
  return (
    <article
      id={scrollId}
      className={`landing-info ${
        sectionBackGround === "black"
          ? "landing-info--black"
          : "landing-info--white"
      }`}
    >
      <LayoutContainer className="container--landing-info">
        <section
          className={`landing-info__content${
            !isInfoSectionIntersected
              ? " landing-info__content--not-obsereved"
              : " landing-info__content--obsereved"
          }`}
          ref={infoContent}
        >
          <h3 className="landing-info__subtitle">{subtitle}</h3>
          <h2 className="landing-info__title">{title}</h2>
          <p className="landing-info__paragraph">{paragraph}</p>
          <Link
            className={`link ${
              btnBackGroundColor === "black"
                ? "link--secondary--black"
                : "link--secondary--white"
            } link--small`}
            to={linkTo}
          >
            {linkText}
          </Link>
        </section>
        <figure className="landing-info__svg-fig">
          <img
            loading="lazy"
            className="landing-info__svg"
            src={image}
            alt={imgAlt}
            title={imgTitle}
            width={imgWidth}
            height={imgHeight}
          />
        </figure>
      </LayoutContainer>
    </article>
  );
};

export default InfoSection;
