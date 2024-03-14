import React from "react";
import Modal from "react-modal";
import RedBtn from "./RedBtn";
import NoBgBtn from "./NoBgBtn";
import Loader from "../../UI/Loader";

// to fix the accesibility of our root app and is recommanded by the react-modal docs
Modal.setAppElement("#root");

const AppModal = ({
  operationType,
  isOpen,
  confirmRemoveExpenseFunc,
  closeModalOnCancelRemove,
  requestStatus: deleteExpenseRequestStatus, // this requestStatus object is needed to handle loading and errors for the delete expense operation.
  // we rename it for reusability, its specefic to editExpensePage loading process.
}) => {
  const onCancelDeleteExpenseConfirm = () => {
    closeModalOnCancelRemove();
  };
  const onConfirmDeleteExpense = () => {
    confirmRemoveExpenseFunc();
  };
  let content;
  let deleteExpenseBtnText;
  if (deleteExpenseRequestStatus.loading) {
    deleteExpenseBtnText = (
      <Loader spinerColor="#fff" spinnerWidth="27" spinnerHeight="18.4" />
    );
  } else {
    deleteExpenseBtnText = "Delete";
  }
  if (operationType === "remove expense confirmation") {
    content = (
      <article className="app-modal__content">
        <header className="app-modal__header">
          <h2 className="app-modal__title">Delete Expense</h2>
        </header>
        <section className="app-modal__body">
          <p className="app-modal__error-paragraph">
            {!deleteExpenseRequestStatus.loading
              ? `After you delete an expense, It's permanently deleted. Expenses
          cannot be undeleted.`
              : `Loading...`}
          </p>
        </section>
        <footer className="app-modal__buttons">
          <NoBgBtn onClick={onCancelDeleteExpenseConfirm}>Cancel</NoBgBtn>
          <RedBtn onClick={onConfirmDeleteExpense}>
            {deleteExpenseBtnText}
          </RedBtn>
        </footer>
      </article>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Remove Expense Modal"
      onRequestClose={closeModalOnCancelRemove}
      closeTimeoutMS={1000}
      className="app-modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        },
      }}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={false}
    >
      {content}
    </Modal>
  );
};

export default AppModal;
