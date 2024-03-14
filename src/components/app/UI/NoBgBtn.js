import React from "react";

const NoBgBtn = ({ children, className, ...rest}) => {
  const customClassNamesModifiers = className ? className : "";
  return (
    <button
      className={`button-no-background${
        customClassNamesModifiers ? " " + customClassNamesModifiers : ""
      }`}
    {...rest}>
      {children}
    </button>
  );
};

export default NoBgBtn;
