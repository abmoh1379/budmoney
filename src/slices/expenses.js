import {
  createSlice,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { selectAllFilters } from "./filters";
import expensesFilters from "../selector/expensesFilters";

import {
  startAddExpense,
  startEditExpense,
  startRemoveExpense,
  startFetchUserExpenses,
} from "../actions/expenses";

const expensesAdaptor = createEntityAdapter({});
const initialState = expensesAdaptor.getInitialState({
  loading: false,
  //   // loading and error are only for expensesList and dashboardPage. we use our own loading and error for other actions related to expenses.
  error: null,
});
const expenses = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(startAddExpense.pending, (state, action) => {})
      .addCase(startAddExpense.fulfilled, (state, { payload }) => {
        expensesAdaptor.addOne(state, payload);
      })
      .addCase(startAddExpense.rejected, (state, action) => {})
      .addCase(startEditExpense.pending, (state, action) => {})
      .addCase(startEditExpense.fulfilled, (state, { payload }) => {
        expensesAdaptor.upsertOne(state, payload);
      })
      .addCase(startEditExpense.rejected, (state, action) => {})
      .addCase(startRemoveExpense.pending, (state, action) => {})
      .addCase(startRemoveExpense.fulfilled, (state, { payload }) => {
        expensesAdaptor.removeOne(state, payload);
      })
      .addCase(startRemoveExpense.rejected, (state, action) => {})
      .addCase(startFetchUserExpenses.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startFetchUserExpenses.fulfilled, (state, { payload }) => {
        // if user simply log out and dont refresh the page, in login again, we should empty the array and fetch again, otherwise the expenses list will be duplicated
        expensesAdaptor.removeAll(state);
        if (payload.length) {
          expensesAdaptor.upsertMany(state, payload);
        }
        state.loading = false;
      })
      .addCase(startFetchUserExpenses.rejected, (state, action) => {
        state.error = false;
      });
  },
});

export const {
  selectById: selectExpenseById,
  selectAll: selectAllExpenses,
  selectIds: selectExpensesIds,
  selectTotal : selectTotalExpenses,
  selectEntities : selectAllExpensesEntites

} = expensesAdaptor.getSelectors((state) => state.expenses);

// why we need this createSelector? because in the expensesList component, we are using expensesFilters selector function on expenses state
// as the result of this, everytime this expenses Object state changes, even though the expenses might not change, because we are using a
// filtering function that returns the filtered expenses everytime, we are re-rendering the full expenses array. to memoize this array
// and avoid this re-rendering while the expenses array really doesnt change at all, we use this createSelector to create a
// memozied inputs to this filtered function
export const selectAllFilteredExpenses = createSelector(
  [selectAllExpenses, selectAllFilters],
  (expensesInput, filters) => expensesFilters(expensesInput, filters)
);

export const selectExpensesLoading = (state) => state.expenses.loading;
export const selectExpensesError = (state) => state.expenses.error;

export default expenses.reducer;
