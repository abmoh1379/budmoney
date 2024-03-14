import React from "react";

const LayoutContainer = ({ children, className }) => {
  const customClassName = className ? className : "";
  return (
    <div className={`container${customClassName && (" " + customClassName)}`}>
      {children}
    </div>
  );
};

export default LayoutContainer;
