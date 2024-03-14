import React, { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../components/landing/Header";
import MainElement from "../components/UI/MainElement";
import Hero from "../components/landing/Hero";
import InfoSection from "../components/landing/InfoSection";
import Services from "../components/landing/Services";
import Footer from "../components/landing/Footer";
import landingInfoData from "../productionData/landingInfo";
import useIntersectionObs from "../hooks/useIntersectionObs";

const LandingPage = () => {
  const [sticky, setSticky] = useState(false);
  // to create 3 info sections that the infoSections are reusable this way.!
  const landingInfoArray = landingInfoData.map((infoSection, index) => {
    return <InfoSection key={index} {...infoSection} />;
  });

  const intersectionFunc = useCallback((entries, observer) => {
    if (entries[0].isIntersecting) {
      setSticky(false);
    } else {
      setSticky(true);
    }
  }, []);

  const { observerRef: heroObserver, targetRef: heroRef } = useIntersectionObs(
    useMemo(() => {
      return {
        root: null,
        rootMargin: "-100px",
        threshold: 0,
      };
    }, []),
    intersectionFunc
  );

  useEffect(() => {
    heroObserver.current.observe(heroRef.current);
  }, [heroObserver, heroRef]);
  return (
    <React.Fragment>
      <Header sticky={sticky} />
      <MainElement>
        <Hero ref={heroRef} />
        {landingInfoArray}
        <Services />
        <Footer />
      </MainElement>
    </React.Fragment>
  );
};

export default LandingPage;
