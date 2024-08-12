//getting input field value
function getInputField(inputFieldId) {
    const inputFieldText = document.getElementById(inputFieldId + '-field');
    const inputAmount = parseFloat(inputFieldText.value);
    if (isNaN(inputAmount)) {
        alert('Enter a valid amount for ' + inputFieldId.toUpperCase());

    }
    else if (inputAmount < 0) {
        alert('Enter a positive amount for ' + inputFieldId.toUpperCase());

    }
    else {
        return inputAmount;
    }
}
// settings value for initial output
function getInitial(firstId, secondId) {
    document.getElementById('show-' + firstId).innerText = '';
    document.getElementById('show-' + secondId).innerText = '';
}

//handling calculate button
document.getElementById('calculate-button').addEventListener('click', function () {
    getInitial('expenses', 'balance');
    getInitial('savings', 'remaining');

    const incomeAmount = getInputField('income');
    if (isNaN(incomeAmount)) return;
    const foodAmount = getInputField('food');
    if (isNaN(foodAmount)) return;
    const rentAmount = getInputField('rent');
    if (isNaN(rentAmount)) return;
    const clothAmount = getInputField('cloth');
    if (isNaN(clothAmount)) return;

    const totalExpenses = foodAmount + rentAmount + clothAmount;
    const newBalance = incomeAmount - totalExpenses;

    if (totalExpenses > incomeAmount) {
        alert('Sorry! You do not have enough balace to spend.');
    }
    else {
        document.getElementById('show-expenses').innerText = totalExpenses;
        document.getElementById('show-balance').innerText = newBalance;
    }
})

//handling savings button
document.getElementById('savings-button').addEventListener('click', function () {
    getInitial('savings', 'remaining');
    const savingsPercentage = getInputField('savings');
    const incomeAmount = getInputField('income');
    const currentBalanceText = document.getElementById('show-balance').innerText;
    const currentBalance = parseFloat(currentBalanceText);
    const savingsAmount = incomeAmount * (savingsPercentage / 100);
    const remainingBalance = currentBalance - savingsAmount;
    if (isNaN(currentBalance) || isNaN(savingsAmount)) return 0;
    if (savingsAmount > currentBalance) {
        alert('You do not have enough balance for savings');
        return 0;
    }
    else {
        document.getElementById('show-savings').innerText = savingsAmount;
        document.getElementById('show-remaining').innerText = remainingBalance;
    }

})