import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
    text : '',
    startDate : moment().startOf('month'),
    endDate : moment().endOf('month'),
    type : 'All categories',
    sortBy : 'date'
}

const filters = createSlice({
    name : 'filters',
    initialState,
    reducers : {
        setText : {
            reducer : (state, {payload}) => {
                state.text = payload;
            },prepare : (text) => {
                return {
                    payload : text
                }
            }
        },
        setStartDate : {
            reducer : (state , {payload}) => {
                state.startDate = payload;
            }, prepare : (startDate) => {
                return {
                    payload : startDate
                }
            }
        },
        setEndDate : {
            reducer : (state, {payload}) => {
                state.endDate = payload;
            }, prepare : (endDate) => {
                return {
                    payload : endDate
                }
            }
        },
        setSortByDate : (state, action) => {
            state.sortBy = 'date'
        },
        setSortByAmount : (state, action) => {
            state.sortBy = 'amount'
        },
        setType : {
            reducer : (state, {payload}) => {
                state.type = payload;
            },
            prepare : (type) => {
                return {
                    payload : type
                }
            }
        }
    }
})

export const selectAllFilters = (state) => state.filters;
export const {setText, setStartDate, setEndDate, setSortByAmount, setSortByDate, setType} = filters.actions;
export default filters.reducer;