function updateResultsView(results) {
    document.querySelector('#total_percent').innerHTML = results.rate * 100 + '%';
}

export default updateResultsView;