import React from "react";

const PrimaryBtn = ({ children, className, ...rest}) => {
  const customClassNamesModifiers = className ? className : "";
  return (
    <button
      className={`button button--primary${
        customClassNamesModifiers ? " " + customClassNamesModifiers : ""
      }`}
    {...rest}>
      {children}
    </button>
  );
};

export default PrimaryBtn;
