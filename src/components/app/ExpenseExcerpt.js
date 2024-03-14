import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import ExpenseAmountFormat from "./UI/ExpenseAmountFormat";
import typeColorClassName from "../../selector/typeColorClassName";


const ExpenseExcerpt = ({
  expense: { id, description, note, createdAt, amount, type },
}) => {

    // func for formatting currencyFormat
    const calculateAmountValueFunc = useCallback((value) => {
        return value / 100;
    },[]);

    const typeClassName = typeColorClassName(type);
  return (
    <li className="app-expense__list-item">
      <Link
        className="app-expense__item-link"
        to={`/expense/edit/${id}`}
      >
        <div className="app-expense__text-details">
            <p className="app-expense__description">
                {description}
            </p>
            <p className={`app-expense__type ${typeClassName}`}>{type}</p>
            <p className="app-expense__date">{moment(createdAt).format('YYYY MMMM, Do')}</p>
            {/* not showing note content in excerpt*/}
        </div>
        <p className="app-expense__item-amount">
            <ExpenseAmountFormat value = {amount} calculateAmountValueFunc = {calculateAmountValueFunc}/>
        </p>
      </Link>
    </li>
  );
};

export default ExpenseExcerpt;
