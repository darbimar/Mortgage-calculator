let data = {
    selectedProgram: 0.1,
    cost: 12000000,
    minPrice: 375000,
    maxPrice: 100000000,
    programs: {
        base: 0.104,
        it: 0.047,
        gov: 0.067,
        fam: 0.057,
        east: 0.02,
        mil: 0.098,
        zero: 0.107
    },
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
    console.log('New data', newData);

    if (newData.onUpdate === 'inputCost') {
        //Обновляем цену при стоимости меньше минимума
        if(newData.cost < data.minPrice) {
            newData.cost = data.minPrice; 
        } else if (newData.cost > data.maxPrice) { //Обновляем цену при стоимости больше максимума
            newData.cost = data.maxPrice;
        }
    } 

    data = {
        ...data, 
        ...newData //Если есть новые данные, то они перезапишут старые
    }

    console.log('Updated data', data);
    results = {
        rate: data.selectedProgram,
    }

    console.log('New results', data);
}

export {getData, getResults, setData}
