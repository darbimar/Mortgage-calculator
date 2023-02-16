let data = {
    selectedProgram: 0.104,
    cost: 12000000,
    minPrice: 375000,
    maxPrice: 100000000,
    minPaymentPercent: 0.15,
    maxPaymentPercent: 0.9,
    paymentPercent: 0.5,
    payment: 6000000,
    getMinPayment: function() {
        return this.cost * this.minPaymentPercent;
    },
    getMaxPayment: function() {
        return this.cost * this.maxPaymentPercent;
    },
    programs: {
        base: 0.104,
        it: 0.047,
        gov: 0.067,
        fam: 0.057,
        east: 0.02,
        mil: 0.098,
        zero: 0.107
    },
    term: 10,
    minTerm: 1,
    maxTerm: 30,
};

let results = {
    rate: data.selectedProgram
}


function getData() {
    return {...data} //Передача не самой ссылки на объект, а его копии
}

function getResults() {
    return {...results} //Передача копии объекта result
}

function setData(newData) { //Принимает новые данные и обновляет объект data

    if(newData.onUpdate === 'buttonProgram') {
        if (newData.id === 'zero-value') {
            data.minPaymentPercent = 0;
        } else {
            data.minPaymentPercent = 0.15;
        }
    }

    if (newData.onUpdate === 'inputCost' || newData.onUpdate === 'costSlider') {
        //Обновляем цену при стоимости меньше минимума
        if(newData.cost < data.minPrice) {
            newData.cost = data.minPrice; 
        } else if (newData.cost > data.maxPrice) { //Обновляем цену при стоимости больше максимума
            newData.cost = data.maxPrice;
        }
        data.payment = data.getMinPayment(); //Изменение первоначального взноса при изменении стомиости недвижимости, фикс на минимальный % ПВ
    } 

    if (newData.onUpdate === 'inputPayment') {
        newData.paymentPercent = (newData.payment * 100) / data.cost / 100;
    }


    if (newData.onUpdate === 'paymentSlider') {
        newData.paymentPercent = newData.paymentPercent / 100;
        data.payment = data.cost * newData.paymentPercent;
    }

    if (newData.onUpdate === 'inputTerm') {
        if (newData.term < data.minTerm) {
            newData.term = data.minTerm;
        } else if (newData.term > data.maxTerm) {
            newData.term = data.maxTerm;
        }
    }

    data = {
        ...data, 
        ...newData //Если есть новые данные, то они перезапишут старые
    }

    //Расчет ипотеки
    
    const month = data.term * 12;
    const totalAmount = data.cost - data.payment;
    const monthRate = data.selectedProgram / 12;
    const generalRate = (1 + monthRate) ** month;
    const monthPayment = (totalAmount * monthRate * generalRate)/(generalRate - 1);
    const overPayment = monthPayment * month - totalAmount;
    const necessaryIncome = monthPayment * 2;

    results = {
        rate: data.selectedProgram,
        totalAmount,
        monthPayment,
        overPayment,
        necessaryIncome

    }

}

export {getData, getResults, setData}
