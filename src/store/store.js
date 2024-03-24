import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "../slices/filters";
import expensesReducer from "../slices/expenses";
import authReducer from '../slices/auth';


const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    filters: filtersReducer,
    auth : authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    devTools : false   // disabling dev tools for production
});

export default store;
