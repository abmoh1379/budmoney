import moment from "moment";
const expensesFilters = (expenses, { text , startDate, endDate, type, sortBy}) => {
    return expenses.filter((expense, index) => {
        let textMatch = expense.description.toLowerCase().trim().includes(text.toLowerCase().trim());
        let startDateMatch = (startDate) ? startDate.isSameOrBefore(moment(expense.createdAt), 'day') : true;
        let endDateMatch = (endDate) ? endDate.isSameOrAfter(moment(expense.createdAt), 'day') : true;
        let typeMatch = (type !== 'All categories') ? ((expense.type === type) ? true : false) : true;

        return textMatch && startDateMatch && endDateMatch && typeMatch;
    }).sort((a, b) => {
        if(sortBy === 'date') {
            return a.createdAt - b.createdAt;
        } else {
            return b.amount - a.amount;
        }
    })
};


export default expensesFilters;