import * as Model from "./model.js";
import programs from './view/buttonPrograms.js'


//Функция сработает, когда вся страница будет прогружена
window.onload = function() {
    const getData = Model.getData;
    
    //Инициализируем программы и передаем в них данные
    programs(getData); 

    //Прослушка пользовательского события
    document.addEventListener('updateForm', (e) => {
        Model.setData(e.detail);
    });

}