import React from "react";
import CurrencyFormat from "react-currency-format";

const ExpenseAmountFormat = ({ value, calculateAmountValueFunc = null }) => {
  const resultedValue =
    calculateAmountValueFunc === null ? value : calculateAmountValueFunc(value);

  return (
    <CurrencyFormat
      className="app-currency-bold"
      value={resultedValue}
      prefix="$"
      allowNegative={false}
      decimalSeparator="."
      thousandSeparator={true}
      thousandSpacing="3"
      displayType="text"
      fixedDecimalScale={true}
      decimalScale={2}
    />
  );
};

export default ExpenseAmountFormat;
