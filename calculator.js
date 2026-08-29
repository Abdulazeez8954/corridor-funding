// Corridor Funding - Loan Calculator Logic
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('calculate-btn');
    if (btn) {
        btn.addEventListener('click', calculateLoan);
    }
});

function calculateLoan() {
    const amount = parseFloat(document.getElementById('calc-amount').value);
    const apr = parseFloat(document.getElementById('calc-rate').value) / 100;
    const term = parseFloat(document.getElementById('calc-term').value);

    if (isNaN(amount) || isNaN(apr) || isNaN(term) || amount <= 0) {
        alert("Please enter valid numbers");
        return;
    }

    const monthlyRate = apr / 12;
    const x = Math.pow(1 + monthlyRate, term);
    const monthly = (amount * x * monthlyRate) / (x - 1);

    document.getElementById('monthly-payment').innerText = 
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(monthly);
}