import React, { useState } from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import {
  selectAllFilters,
  setText,
  setStartDate,
  setEndDate,
  setType,
  setSortByAmount,
  setSortByDate,
} from "../../slices/filters";
import LayoutContainer from "../UI/LayoutContainer";

const ExpensesFilters = ({
  filters: { text, sortBy, startDate, endDate, type },
  setText,
  setType,
  setSortByDate,
  setSortByAmount,
  setStartDate,
  setEndDate,
}) => {
  // focusState needed for DateRangePicker
  const [focusedInput, setFocusedInput] = useState(null);
  const onTextChange = (e) => {
    setText(e.target.value);
  };

  const onTypeChange = (e) => {
    setType(e.target.value);
  };

  const onSortByChange = (e) => {
    if (e.target.value === "date") {
      setSortByDate();
    } else {
      setSortByAmount();
    }
  };

  const onDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };
  const onFocusChange = (focusedInput) => {
    setFocusedInput(focusedInput);
  };

  return (
    <section className="app-filters">
      <LayoutContainer className= 'container--expenses-filters'>
        <input
          className="app-filters__input"
          type="text"
          id="text"
          placeholder="Search expenses ..."
          autoComplete="on"
          value={text}
          onChange={onTextChange}
        />
        <select
          className="app-filters__input"
          value={type}
          onChange={onTypeChange}
        >
          <option value="All categories">All categories</option>
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
        <select
          className="app-filters__input"
          value={sortBy}
          onChange={onSortByChange}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <DateRangePicker
          startDate={startDate}
          startDateId="start of the month"
          endDate={endDate}
          endDateId="end of the month"
          focusedInput={focusedInput}
          onDatesChange={onDatesChange}
          onFocusChange={onFocusChange}
          hideKeyboardShortcutsPanel={true}
          numberOfMonths={1}
          small={true}
          showClearDates={true}
          isOutsideRange={() => {}}
        />
      </LayoutContainer>
    </section>
  );
};

const mapStateToProps = (state, props) => {
  return {
    filters: selectAllFilters(state),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    setText: (text) => dispatch(setText(text)),
    setType: (type) => dispatch(setType(type)),
    setSortByDate: () => dispatch(setSortByDate()),
    setSortByAmount: () => dispatch(setSortByAmount()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ExpensesFilters);
