function updateMinPercents(data) {
    document.querySelector('#percents-from').innerHTML = data.minPaymentPercent * 100 + '%';
}

export {updateMinPercents};