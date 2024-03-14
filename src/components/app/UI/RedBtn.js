import React from "react";

const RedBtn = ({ children, className, ...rest}) => {
  const customClassNamesModifiers = className ? className : "";
  return (
    <button
      className={`button button--red${
        customClassNamesModifiers ? " " + customClassNamesModifiers : ""
      }`}
    {...rest}>
      {children}
    </button>
  );
};

export default RedBtn;
