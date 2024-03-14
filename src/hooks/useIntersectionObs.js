import React, { useRef } from "react";

const useIntersectionObs = (intersectionConfigObj, IntersectionFunction) => {
  const targetRef = useRef();
  const observerRef = useRef();

  observerRef.current = new IntersectionObserver(
    (entries, observer) => {
      IntersectionFunction(entries, observer);
    },
    {
      root: intersectionConfigObj.root ? intersectionConfigObj.root : null,
      rootMargin: intersectionConfigObj.rootMargin
        ? intersectionConfigObj.rootMargin
        : "0px",
      threshold: intersectionConfigObj.threshold
        ? intersectionConfigObj.threshold
        : 0.0,
    }
  );

  return {
    targetRef,
    observerRef,
  };
};

export default useIntersectionObs;
