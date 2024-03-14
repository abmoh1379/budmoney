import React, { useState, useEffect, useRef, useCallback } from "react";
import LayoutContainer from "../UI/LayoutContainer";
import controlCostsSvg from "../../resources/landingPage/svgs/controlCostsSvg.svg";
import expensesPieChartSvg from "../../resources/landingPage/svgs/pieChartSvg.svg";
import expensesFilterSvg from "../../resources/landingPage/svgs/filterSvg.svg";
import useIntersectionObs from "../../hooks/useIntersectionObs";

const Services = () => {
  // handling observation animation for services cards section
  const [cardsAreIntersected, setCardsAreIntersected] = useState({
    card1: false,
    card2: false,
    card3: false,
  });

  const card1IntersectionFunc = useCallback((entries, observer) => {
    const element = entries[0];
    if (element.isIntersecting) {
      setCardsAreIntersected((prevState) => ({
        ...prevState,
        card1: true,
      }));
    }
  }, []);
  const card2IntersectionFunc = useCallback((entries, observer) => {
    const element = entries[0];
    if (element.isIntersecting) {
      setCardsAreIntersected((prevState) => ({
        ...prevState,
        card2: true,
      }));
    }
  }, []);
  const card3IntersectionFunc = useCallback((entries, observer) => {
    const element = entries[0];
    if (element.isIntersecting) {
      setCardsAreIntersected((prevState) => ({
        ...prevState,
        card3: true,
      }));
    }
  }, []);
  const { targetRef: card1Ref, observerRef: card1Observer } =
    useIntersectionObs(
      { root: null, rootMargin: "0px", threshold: 0.8 },
      card1IntersectionFunc
    );
  const { targetRef: card2Ref, observerRef: card2Observer } =
    useIntersectionObs(
      { root: null, rootMargin: "0px", threshold: 0.8 },
      card2IntersectionFunc
    );
  const { targetRef: card3Ref, observerRef: card3Observer } =
    useIntersectionObs(
      { root: null, rootMargin: "0px", threshold: 0.8 },
      card3IntersectionFunc
    );
  useEffect(() => {
    card1Observer.current.observe(card1Ref.current);

    card2Observer.current.observe(card2Ref.current);

    card3Observer.current.observe(card3Ref.current);
  }, [
    card1Observer,
    card1Ref,
    card2Observer,
    card2Ref,
    card3Observer,
    card3Ref,
  ]);
  return (
    <article className="landing-services" id="services">
      <LayoutContainer className="container--landing-services">
        <h3 className="landing-services__title">Services</h3>
        <section className="landing-services__cards">
          <div
            className={`landing-services__card${
              !cardsAreIntersected.card1
                ? " landing-services__card--not-obsereved"
                : " landing-services__card--obsereved"
            }`}
            ref={card1Ref}
          >
            <figure className="landing-services__svg-fig">
              <img
                loading="lazy"
                className="landing-services__svg"
                src={expensesFilterSvg}
                alt="Expenses Filtering"
                title="Expenses Filtering"
                width="643"
                height="447.57029"
              />
            </figure>
            <h2 className="landing-services__card-title">Expenses Filtering</h2>
            <p className="landing-services__card-paragraph">
              You can search, sort, and filter expenses by their categories or
              within a time period.
            </p>
          </div>
          <div
            className={`landing-services__card${
              !cardsAreIntersected.card2
                ? " landing-services__card--not-obsereved"
                : " landing-services__card--obsereved"
            }`}
            ref={card2Ref}
          >
            <figure className="landing-services__svg-fig">
              <img
                loading="lazy"
                className="landing-services__svg"
                src={expensesPieChartSvg}
                alt="Expenses Pie Chart"
                title="Expenses Pie Chart"
                width="837.47998"
                height="673"
              />
            </figure>
            <h2 className="landing-services__card-title">Expenses Pie Chart</h2>
            <p className="landing-services__card-paragraph">
              You can view your expenses in a pie chart that helps you undrstand
              it much better.
            </p>
          </div>
          <div
            className={`landing-services__card${
              !cardsAreIntersected.card3
                ? " landing-services__card--not-obsereved"
                : " landing-services__card--obsereved"
            }`}
            ref={card3Ref}
          >
            <figure className="landing-services__svg-fig">
              <img
                loading="lazy"
                className="landing-services__svg"
                src={controlCostsSvg}
                alt="Control Your Costs"
                title="Control Your Costs"
                width="676.65833"
                height="577.34774"
              />
            </figure>
            <h2 className="landing-services__card-title">Control Your Costs</h2>
            <p className="landing-services__card-paragraph">
              You can bring your expenses under control and improve your
              financial status.
            </p>
          </div>
        </section>
      </LayoutContainer>
    </article>
  );
};

export default Services;
