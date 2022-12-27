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

function getData() {
    return {...data} //Передача не самой ссылки на объект, а его копии
}

function setData(newData) { //Принимает новые данные и обновляет объект data
    console.log('New data', newData);
    data = {
        ...data, 
        ...newData //Если есть новые данные, то они перезапишут старые
    }

    console.log('Updated data', data);
}

export {getData, setData}
