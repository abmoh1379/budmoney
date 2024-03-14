import React, { useMemo } from "react";
import { connect } from "react-redux";
import {
  selectExpensesError,
  selectExpensesLoading,
} from "../../slices/expenses";
import { selectAllFilteredExpenses } from "../../slices/expenses";
import LayoutContainer from "../UI/LayoutContainer";
import ExpenseExcerpt from "./ExpenseExcerpt";
import Loader from "../UI/Loader";

const ExpensesList = ({ expenses, expensesLoading, expensesError }) => {
  const expensesArray = useMemo(() => {
    return expenses.map((expense) => {
      return <ExpenseExcerpt key={expense.id} expense={expense} />;
    });
  }, [expenses]);
  let content;
  if (expensesLoading) {
    content = (
      <div className="app-expenses__loader-container">
        <Loader spinnerHeight="40" spinnerWidth="40" />
        <p className="app-expenses__loader-paragraph">Loading expenses...</p>
      </div>
    );
  } else if (!expenses.length) {
    content = <p className="app-expenses__list-paragraph">No expenses yet.</p>;
  } else {
    content = <ul className="app-expenses__list">{expensesArray}</ul>;
  }
  return (
    <section className="app-expenses">
      <LayoutContainer className="container--app-expenses-list">
        <header className="app-expenses__header">
          <p className="app-expenses__header-title">Expenses</p>
          <p className="app-expenses__header-title">Amount</p>
        </header>
        {content}
      </LayoutContainer>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    expenses: selectAllFilteredExpenses(state),
    expensesLoading: selectExpensesLoading(state),
    expensesError: selectExpensesError(state),
  };
};

export default connect(mapStateToProps)(ExpensesList);
