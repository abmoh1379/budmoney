import React, { useCallback, useEffect, useReducer, useState } from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import useInput from "../../hooks/useInput";
import PrimaryBtn from "./UI/PrimaryBtn";
import RedBtn from "./UI/RedBtn";
import Loader from "../UI/Loader";

const expenseFormReducer = (state, action) => {
  switch (action.type) {
    case "ON_AMOUNT_CHANGE":
      return {
        ...state,
        amountValue: action.value,
      };

    case "ON_NOTE_CHANGE":
      {
        return {
          ...state,
          noteValue: action.value,
        };
      }
    case "ON_CREATED_AT_DATE_CHANGE": {
      return {
        ...state,
        createdAtValue: action.value,
      };
    }
    default:
      return state;
  }
};

const ExpenseForm = ({
  onExpenseFormSubmit,
  onExpenseRemove,
  openConfirmRemoveExpenseModal,
  confirmDeleteExpenseValue,
  requestStatus: { error, loading, operation },
  expense = undefined,
}) => {
  //   required state for SingleDatePicker
  const [focused, setFocused] = useState(false);

  // creating a reducer for states that are not needed to be used in useInput hook (i/e are not required!)
  const expenseFormInitialState = {
    amountValue: !expense ? "0" : (expense.amount / 100).toString(),
    noteValue: !expense ? "" : expense.note,
    createdAtValue: !expense ? moment() : moment(expense.createdAt),
  };

  const [{ amountValue, noteValue, createdAtValue }, formDispatcher] =
    useReducer(expenseFormReducer, expenseFormInitialState);

  const onAmountChange = (e) => {
    if (/^\d{0,}\.?\d{0,2}$/.test(e.target.value)) {
      formDispatcher({ type: "ON_AMOUNT_CHANGE", value: e.target.value });
    }
  };
  const onFocusChange = ({ focused }) => {
    setFocused(focused);
  };
  const onDateChange = (date) => {
    formDispatcher({ type: "ON_CREATED_AT_DATE_CHANGE", value: date });
  };
  const onNoteChange = (e) => {
    formDispatcher({ type: "ON_NOTE_CHANGE", value: e.target.value });
  };

  // useInput hook for description input
  //   description input has no regxValidator func
  const descriptionValidatorFunc = useCallback((value) => {
    if (!value) {
      return "Description is required!";
    }
    return "";
  }, []);

  const {
    inputValue: descriptionValue,
    error: descriptionError,
    inputDispatcher: descriptionDispatcher,
    isInputValid: isDescriptionValid,
    onInputBlur: onDescriptionBlur,
    onInputChange: onDescriptionChange,
  } = useInput(!expense ? "" : expense.description, descriptionValidatorFunc);

  // useInput hook for type select input
  //   type select input has a validator func but has no regxValidatorFunc
  const typeValidatorFunc = useCallback((value) => {
    if (value === "Choose one of the options") {
      return "Choosing an option is required!";
    } else if (!value) {
      // this else-if will never occure due to input being a select box
      return "Type is required!";
    }
    return "";
  }, []);
  const {
    inputValue: typeValue,
    error: typeError,
    inputDispatcher: typeDispatcher,
    isInputValid: isTypeValid,
    onInputBlur: onTypeBlur,
    onInputChange: onTypeChange,
  } = useInput(
    !expense ? "Choose one of the options" : expense.type,
    typeValidatorFunc
  );

  // for disabling the form btn on form validation
  let isFormValid = false;
  if (isDescriptionValid && isTypeValid) {
    isFormValid = true;
  }

  // handling submit form button text
  let submitBtnText;
  if (operation === "edit" || operation === "add") {
    if (loading) {
      submitBtnText = (
        <Loader spinerColor="#fff" spinnerWidth="27" spinnerHeight="20.7" />
      );
    }
  } else {
    submitBtnText = expense ? "Edit Expense" : "Add Expense";
  }

  const onExpenseRemoveClick = () => {
    openConfirmRemoveExpenseModal();
  };

  // this useEffect is needed for deleteing the expense on user clicking confirm in confirmation expense removal modal.
  useEffect(() => {
    if (confirmDeleteExpenseValue) {
      onExpenseRemove();
    }
  }, [confirmDeleteExpenseValue, onExpenseRemove]);

  const onFormSubmit = (e) => {
    e.preventDefault();

    descriptionDispatcher({ type: "INPUT_TOUCHED_TRUE" });
    typeDispatcher({ type: "INPUT_TOUCHED_TRUE" });

    if (isFormValid) {
      onExpenseFormSubmit({
        description: descriptionValue.trim(),
        note: noteValue.trim(),
        createdAt: moment(createdAtValue).valueOf(),
        type: typeValue,
        amount: !amountValue ? 0 : parseFloat(amountValue) * 100,
      });
    }
  };
  return (
    <form className="app-expense-form" onSubmit={onFormSubmit}>
      <div className="app-expense-form__input-container">
        <input
          className={`app-expense-form__input${
            descriptionError ? " app-expense-form--invalid-input" : ""
          }`}
          type="text"
          placeholder="Description ..."
          autoComplete="off"
          value={descriptionValue}
          onChange={onDescriptionChange}
          onBlur={onDescriptionBlur}
        />
        {/* for screen readers, we dont remove the p with no error available.*/}
        <p className="app-expense-form__input-error">{descriptionError}</p>
      </div>
      <input
        className="app-expense-form__input"
        type="text"
        placeholder="Amount ..."
        autoComplete="off"
        value={amountValue}
        onChange={onAmountChange}
      />
      <div className="app-expense-form__input-container">
        <select
          className={`app-expense-form__input${
            typeError ? " app-expense-form--invalid-input" : ""
          }`}
          value={typeValue}
          onChange={onTypeChange}
          onBlur={onTypeBlur}
        >
          <option value="Choose one of the options">
            Choose one of the options
          </option>
          <option value="Housing">Housing</option>
          <option value="Transportation">Transportation</option>
          <option value="Health care">Health care</option>
          <option value="Grocery">Grocery</option>
          <option value="Utility">Utility</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Product">Product</option>
          <option value="Service">Service</option>
          <option value="Others">Others</option>
        </select>
        <p className="app-expense-form__input-error">{typeError}</p>
      </div>
      <SingleDatePicker
        date={createdAtValue}
        id="expense date"
        focused={focused}
        onFocusChange={onFocusChange}
        onDateChange={onDateChange}
        isOutsideRange={() => {}}
        hideKeyboardShortcutsPanel={true}
        numberOfMonths={1}
        small={true}
        readOnly={true}
      />
      <textarea
        className="app-expense-form__textarea"
        placeholder="Write a note for your expense ..."
        autoComplete="off"
        rows={5}
        cols={40}
        value={noteValue}
        onChange={onNoteChange}
      ></textarea>
      <div className="app-expense-form__btn-container">
        <PrimaryBtn type="submit">{submitBtnText}</PrimaryBtn>
        {/* we use description to compare if we are comming from addExpensePage or EditExpensePage, since we cannot use expense object as a whole.*/}
        {expense && (
          <RedBtn onClick={onExpenseRemoveClick} type="button">
            Remove Expense
          </RedBtn>
        )}
      </div>
    </form>
  );
};

export default ExpenseForm;
