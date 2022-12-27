import * as Model from "./model.js";
import updateResultsView from './view/resultsView.js'
import programs from './view/buttonPrograms.js';


//Функция сработает, когда вся страница будет прогружена
window.onload = function() {
    const getData = Model.getData;
    
    //Инициализируем программы и передаем в них данные
    programs(getData); 

    //Прослушка пользовательского события
    document.addEventListener('updateForm', (e) => {
        Model.setData(e.detail); //Обновляется модель, устанавливаются новые выбранные % ставки

        const data = Model.getData();
        const results = Model.getResults();

        //Добавление результатов на страницу

        updateResultsView(results);

    });

}