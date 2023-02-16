import {priceFormatter, priceFormatterDecimals} from './../utils/formatters.js';


function updateResultsView(results) {
    document.querySelector('#total_percent').innerHTML = (results.rate * 100).toFixed(1) + '%';
    document.querySelector('#month_payment').innerHTML = priceFormatterDecimals.format(results.monthPayment);
    document.querySelector('#total_amount').innerHTML = priceFormatter.format(results.totalAmount);
    document.querySelector('#over_payment').innerHTML = priceFormatterDecimals.format(results.overPayment);
    document.querySelector('#necessary_income').innerHTML = priceFormatterDecimals.format(results.necessaryIncome);
}

export default updateResultsView;