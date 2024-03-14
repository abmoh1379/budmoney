import React, { useCallback, useMemo, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import LayoutContainer from "../components/UI/LayoutContainer";
import ExpenseForm from "../components/app/ExpenseForm";
import { startEditExpense, startRemoveExpense } from "../actions/expenses";
import { selectExpenseById } from "../slices/expenses";
import MainElement from "../components/UI/MainElement";
import AppNavigation from "../components/app/AppNavigation";
import AppModal from "../components/app/UI/AppModal";

const EditExpensePage = ({ startEditExpense, startRemoveExpense }) => {
  // state to handle a confirmation delete process for expense
  const [removeExpenseModal, setRemoveExpenseModal] = useState({
    showModal: false,
    confirmDelete: false,
  });
  const [requestStatus, setRequestStatus] = useState({
    loading: false,
    error: null,
    operation: null,
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const expense = useSelector((state) => {
    return selectExpenseById(state, id);
  });

  // we make this function an async func due to need to handle loading and error in the component and not as a global error loading state.
  const onExpenseFormSubmit = useCallback(async (expenseData) => {
    // we use prevState function to avoid unwanted results due to batching
    try {
      // making sure to send a request to server and edit, only if user actually changed any of the expense properties
      const { description, note, type, createdAt, amount } = expenseData;
      if (
        description !== expense.description ||
        note !== expense.note ||
        type !== expense.type ||
        createdAt !== expense.createdAt ||
        amount !== expense.amount
      ) {
        setRequestStatus((prevState) => {
          return {
            loading: true,
            error: null,
            operation: "edit",
          };
        });
        await startEditExpense({
          id: id,
          ...expenseData,
        });
      }
      navigate("/dashboard");
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
  }, []);

  // we make this function an async func due to need to handle loading and error in the component and not as a global error loading state.
  // this func is dangerous, but we use useEffect where we call it properly, so we dont run into a lot of re-rendering.
  const onExpenseRemove = useCallback(async () => {
    try {
      setRequestStatus((prevState) => {
        return {
          error: null,
          loading: true,
          operation: "remove",
        };
      });
      await startRemoveExpense(expense.id);
      navigate("/dashboard", { replace: true });
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
  }, []);

  const confirmRemoveExpense = () => {
    setRemoveExpenseModal((prevState) => {
      return {
        ...prevState,
        confirmDelete: true,
      };
    });
  };

  const openConfirmRemoveExpenseModal = () => {
    setRemoveExpenseModal((prevState) => {
      return {
        ...prevState,
        showModal: true,
      };
    });
  };
  const closeModalOnCancelRemove = () => {
    setRemoveExpenseModal((prevState) => {
      return {
        ...prevState,
        showModal: false,
      };
    });
  };
  return (
    <MainElement>
      <AppNavigation
        navTitle="Edit Expense"
        linksArray={useMemo(() => {
          return [
            {
              to: "/dashboard",
              text: "Expenses List",
            },
          ];
        }, [])}
      />
      <section className="app-expense-edit">
        <LayoutContainer className= 'container--app-edit-expense'>
          <ExpenseForm
            openConfirmRemoveExpenseModal={openConfirmRemoveExpenseModal}
            onExpenseFormSubmit={onExpenseFormSubmit}
            requestStatus={requestStatus}
            expense={expense}
            onExpenseRemove={onExpenseRemove}
            confirmDeleteExpenseValue={removeExpenseModal.confirmDelete}
          />
        </LayoutContainer>
      </section>
      {/* not conditionally rendering modal for accessibility and transition effect of the modal to work.*/}
      <AppModal
        isOpen={removeExpenseModal.showModal}
        confirmRemoveExpenseFunc={confirmRemoveExpense}
        closeModalOnCancelRemove={closeModalOnCancelRemove}
        operationType="remove expense confirmation"
        requestStatus={requestStatus}
      />
    </MainElement>
  );
};

const mapStateToProps = (state, props) => {
  return {
    // IN THIS SCENARIO, WE USE USESELECTOR, BECAUSE THE ID OF EXPENSE IS ONLY ACCESSIBLE VIA USEPARAMS HOOK
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    startEditExpense: (expense) => dispatch(startEditExpense(expense)),
    startRemoveExpense: (expenseId) => dispatch(startRemoveExpense(expenseId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
