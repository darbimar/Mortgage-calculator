import * as Model from "./model.js";
import updateResultsView from './view/resultsView.js'
import programs from './view/buttonPrograms.js';
import { updateMinPercents } from "./view/utils.js";

import purposeChoice from './view/purposeChoice.js';
import switchButton from './view/switchButton.js';

import costInput from './view/costInput.js';
import costRange from './view/costRange.js';
import paymentInput from './view/paymentInput.js';
import paymentRange from './view/paymentRange.js';
import termInput from './view/termInput.js';
import termRange from './view/termRange.js';


//Функция сработает, когда вся страница будет прогружена
window.onload = function() {
    const getData = Model.getData; //Получение данных из модели
    
    //Инициализируем программы и передаем в них данные
    programs(getData); 

    const cleaveCost = costInput(getData);
    const sliderCost = costRange(getData);

    const cleavePayment = paymentInput(getData);
    const sliderPayment = paymentRange(getData);

    const cleaveTerm = termInput(getData);
    const sliderTerm = termRange(getData);

    const purpose = purposeChoice();
    const buttonSwitch = switchButton();

    //Запуск пересчета ипотеки
    Model.setData({});
    const results = Model.getResults(); 
    updateResultsView(results);


    //Прослушка пользовательского события
    document.addEventListener('updateForm', (e) => {
        Model.setData(e.detail); //Обновляется модель, устанавливаются новые выбранные % ставки

        const data = Model.getData();
        const results = Model.getResults();

        //Обновление всех форм на экране на основе модели
        updateFormAndSlider(data);

        //Добавление результатов на страницу
        updateResultsView(results);

    });

    function updateFormAndSlider(data) {
        //Обновляем подпись слайдера с первоначальным взносом в зависимости от выбранной программы
        if (data.onUpdate === 'buttonProgram') {
            updateMinPercents(data);

            //Обновляем значение минимального процента в зависимости от выбранной программы
            sliderPayment.noUiSlider.updateOptions({
                range: {
                    min: data.minPaymentPercent * 100,
                    max: data.maxPaymentPercent * 100,
                },
            });
        }

        
        //Обновляем costInput 
        if (data.onUpdate !== 'inputCost') {
            cleaveCost.setRawValue(data.cost); //Устанавливаем инпут
        } 

        //Обновляем costSlider
        if (data.onUpdate !== 'costSlider') {
            sliderCost.noUiSlider.set(data.cost); //Устанавливаем слайдер
        }
        //Обновляем paymentInput
        if (data.onUpdate !== 'inputPayment') {
            cleavePayment.setRawValue(data.payment);
        }

        //Обновляем paymentSlider
        if (data.onUpdate !== 'paymentSlider') {
            sliderPayment.noUiSlider.set(data.paymentPercent * 100); //Устанавливаем слайдер
        }

        //Обновляем termInput
        if (data.onUpdate !== 'inputTerm') {
            cleaveTerm.setRawValue(data.term);
        }

        //Обновляем termSlider
        if (data.onUpdate !== 'termSlider') {
            sliderTerm.noUiSlider.set(data.term); //Устанавливаем слайдер
        }

    }

}