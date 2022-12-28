import * as Model from "./model.js";
import updateResultsView from './view/resultsView.js'
import programs from './view/buttonPrograms.js';
import costInput from './view/costInput.js'
import costRange from './view/costRange.js'


//Функция сработает, когда вся страница будет прогружена
window.onload = function() {
    const getData = Model.getData; //Получение данных из модели
    
    //Инициализируем программы и передаем в них данные
    programs(getData); 

    const cleaveCost = costInput(getData);

    const sliderCost = costRange(getData);

    //Прослушка пользовательского события
    document.addEventListener('updateForm', (e) => {
        Model.setData(e.detail); //Обновляется модель, устанавливаются новые выбранные % ставки

        const data = Model.getData();
        const results = Model.getResults();

        //Обновление всех форм на экране на основе модели
        updateFormAndSlider(data);

        //Добавление результатов на страницу
        updateResultsView(results)

    });

    function updateFormAndSlider(data) {
        //costInput 
        if (data.onUpdate !== 'inputCost') {
            cleaveCost.setRawValue(data.cost); //Устанавливаем инпут
        } 


        //costInput

        if (data.onUpdate !== 'costSlider') {
            sliderCost.noUiSlider.set(data.cost); //Устанавливаем слайдер
        }
    }

}