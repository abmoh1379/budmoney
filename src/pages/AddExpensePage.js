import React, { useState, useMemo } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startAddExpense } from "../actions/expenses";
import LayoutContainer from "../components/UI/LayoutContainer";
import ExpenseForm from "../components/app/ExpenseForm";
import MainElement from "../components/UI/MainElement";
import AppNavigation from "../components/app/AppNavigation";


const AddExpensePage = ({ startAddExpense }) => {
  const [requestStatus, setRequestStatus] = useState({
    loading: false,
    error: null,
    operation: null,
  });

  const navigate = useNavigate();
  const onExpenseFormSubmit = async (expenseData) => {
    // we use prevState function to avoid unwanted results due to batching
    try {
      setRequestStatus((prevState) => {
        return {
          error: null,
          loading: true,
          operation: "add",
        };
      });

      await startAddExpense(expenseData);
      navigate("/dashboard", {
        replace: true,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setRequestStatus((prevState) => {
        return {
          ...prevState,
          loading: false,
          operation: null,
        };
      });
    }
  };

  return (
    <MainElement>
      <AppNavigation
        navTitle="Add Expense"
        linksArray={useMemo(() => {
          return [
            {
              to: "/dashboard",
              text: "Expenses List",
            },
          ];
        }, [])}
      />
      <section className="app-expense-add">
        <LayoutContainer className= 'container--app-add-expense'>
          {/* we pass expense = {} to expenseForm for not failing in destructuring on props destructuring*/}
          <ExpenseForm
            onExpenseFormSubmit={onExpenseFormSubmit}
            requestStatus={requestStatus}
          />
        </LayoutContainer>
      </section>
    </MainElement>
  );
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    startAddExpense: (expense) => dispatch(startAddExpense(expense)),
  };
};

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
