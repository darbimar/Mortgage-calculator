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

    //Order form
    const orderFormBtn = document.querySelector('#orderFormBtn');
    const orderForm = document.querySelector('#orderForm');
    const submitFormBtn = document.querySelector('#submitFormBtn');

    orderFormBtn.addEventListener('click', () => {
        orderForm.classList.remove('none');
        orderFormBtn.classList.add('none');
    });

    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        //Собираем данные с формы
        const formData = new FormData(orderForm); //Чтобы получить доступ к данным, у них должен быть атрибут name

        //Disable для кнопки и инпутов
        submitFormBtn.setAttribute('disabled', true);
        submitFormBtn.innerHTML = 'Заявка отправляется...';

        orderForm.querySelectorAll('input').forEach( function(input){
            input.setAttribute('disabled', true);
        });

        
        fetchData();

        async function fetchData() {
            const data = Model.getData();
            const results = Model.getResults();

            let url = checkOnUrl(document.location.href);
            console.log(url);

            // checkOnUrl(document.location.href);

            //Формируем URL, куда будем отправлять запрос
            function checkOnUrl(url) {
                let urlArrayDot = url.split('.');

                if(urlArrayDot[urlArrayDot.length - 1] === 'html') {
                    urlArrayDot.pop();
                    let newUrl = urlArrayDot.join('.');
                    let urlArraySlash = newUrl.split('-');
                    urlArraySlash.pop();
                    newUrl = urlArraySlash.join('/');
                    return newUrl;
                } else {
                    return urlArrayDot = String(urlArrayDot);
                }
            }

            const response = await fetch(url + 'mail.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    form: {
                        name: formData.get('name'),
                        email: formData.get('email'),
                        phone: formData.get('phone'),
                    },
                    data,
                    results
                })
            });

            const result = await response.text();
            console.log(result);

            submitFormBtn.removeAttribute('disabled', true);
            submitFormBtn.innerHTML = 'Оформить заявку';

            orderForm.querySelectorAll('input').forEach((input) => {
                input.removeAttribute('disabled', true);
            });

            //Очищаем поля формы
            orderForm.reset();
            orderForm.classList.add('none');

            if (result === 'SUCCESS') {
                document.querySelector('#success').classList.remove('none');
            } else {
                document.querySelector('#error').classList.remove('none');
            }
        }
    })



}
