import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, push, update, remove, get, child} from "firebase/database";
import moment from "moment";
import { database } from "../firebase/firebase";

export const startAddExpense = createAsyncThunk(
  "expenses/startAddExpense",
  async (expenseData, { getState, dispatch }) => {
    const {auth : { uid }} = getState();
    try {
      // destructring expenseData and putting default values
      const {
        description = "",
        note = "",
        amount = 0,
        type = "Others",
        createdAt = moment().valueOf(),
      } = expenseData;
      const databaseRef = ref(database, `${uid}/expenses`);
      const result = await push(databaseRef, {
        description,
        note,
        amount,
        type,
        createdAt,
      });

      return {
        id: result.key,
        description,
        note,
        amount,
        type,
        createdAt,
      };
    } catch (e) {
    }
  }
);

export const startEditExpense = createAsyncThunk(
  "expenses/startEditExpense",
  async (expenseData, { getState, dispatch }) => {
    const {auth : { uid }} = getState();
    try {
      const { id, description, note, amount, createdAt, type } =
      expenseData;
      const databaseRef = ref(database, `${uid}/expenses/${id}`);
      await update(databaseRef, {
        description,
        note,
        amount,
        createdAt,
        type,
      });

      return expenseData;
    } catch (e) {
      
    }
  }
);


export const startRemoveExpense = createAsyncThunk('expenses/startRemoveExpense', async (expenseId, {getState, dispatch}) => {
  const {auth : { uid }} = getState();
  try {
    const databaseRef = ref(database, `${uid}/expenses/${expenseId}`);
    await remove(databaseRef);
    return expenseId;
  } catch(e) {
    
  } finally {

  }
})


export const startFetchUserExpenses = createAsyncThunk('expenses/startFetchUserExpenses', async (undefined, {getState, dispatch}) => {
  const {auth : { uid }}= getState();
  try {
    const expenses = [];
    const userExpensesRef = ref(database);
    const dataSnapShot = await get(child(userExpensesRef, `${uid}/expenses`));
    if(dataSnapShot.exists()) {
      dataSnapShot.forEach((snapShot) => {
        const expense = {
          id : snapShot.key,
          ...snapShot.val()
        };
        expenses.push(expense);
      })
    };
    return expenses;
  } catch (e) {

  } finally {

  }
})