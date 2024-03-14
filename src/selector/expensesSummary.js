const expensesSummary = (expenses) => {
    const summary = {
        numberOfExpenses : expenses.length,
        totalAmountOfExpenses : 0
    }   

    summary.totalAmountOfExpenses = expenses.map((expense) => {
        return expense.amount;
    }).reduce((sum, currentValue) => {
        return sum + currentValue;
    }, 0);

    return summary;
}


export default expensesSummary;