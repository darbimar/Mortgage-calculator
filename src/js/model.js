let data = {
    selectedProgram: 0.1,
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
