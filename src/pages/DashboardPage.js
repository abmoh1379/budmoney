import React, { useMemo, useCallback } from "react";
import { connect } from "react-redux";
import ExpensesFilters from "../components/app/ExpensesFilters";
import ExpensesList from "../components/app/ExpensesList";
import MainElement from "../components/UI/MainElement";
import AppNavigation from "../components/app/AppNavigation";
import { selectAllFilteredExpenses } from "../slices/expenses";
import expensesSummary from "../selector/expensesSummary";
import ExpenseAmountFormat from "../components/app/UI/ExpenseAmountFormat";

const DashboardPage = ({ expenses }) => {
  const { numberOfExpenses, totalAmountOfExpenses } = useMemo(() => {
    return expensesSummary(expenses);
  }, [expenses]);

  const calculateAmountValueFunc = useCallback((value) => {
    return value / 100;
  }, []);

  // why we need navTitle like this ? because we need to call ExpenseAmountFormat to format the amount, and as a result we modified the code
  // so that we can use it her,e we create this text node and pass this text node to AppNavigation which therefore uses it in its h2.
  const navTitle = (
    <React.Fragment>
      Viewing <span className="app-nav__bold">{numberOfExpenses}</span>{" "}
      {numberOfExpenses === 1 ? "expense" : "expenses"} totalling{" "}
      {
        <span className="app-nav__bold">
          <ExpenseAmountFormat
            value={totalAmountOfExpenses}
            calculateAmountValueFunc={calculateAmountValueFunc}
          />
        </span>
      }
    </React.Fragment>
  );
  return (
    <MainElement>
      <AppNavigation
        navTitle={navTitle}
        linksArray={useMemo(() => {
          return [
            {
              to: "/expense/add",
              text: "Create",
            },
          ];
        }, [])}
      />
      <article className="app-expense-dashboard">
        <ExpensesFilters />
        <ExpensesList />
      </article>
    </MainElement>
  );
};

const mapStateToProps = (state, props) => {
  return {
    expenses: selectAllFilteredExpenses(state),
  };
};
export default connect(mapStateToProps)(DashboardPage);
