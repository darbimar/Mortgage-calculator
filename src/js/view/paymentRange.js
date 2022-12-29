import updateModal from "../utils/updateModal.js";

function init(getData) {
    const slider = document.querySelector('#slider-downpayment');

    noUiSlider.create(slider, {
        start: getData().paymentPercent * 100,
        connect: 'lower',
        tooltips: false, //Подсказки
        step: 1,
        range: {
            min: getData().minPaymentPercent * 100,
            max: getData().maxPaymentPercent * 100,
        }
    });


    //Следить за событиями
    slider.noUiSlider.on('slide', function() {
        //Получаем значение из слайдера
        let sliderValue = slider.noUiSlider.get();
        sliderValue = sliderValue.split('.')[0]; //Возвращаем число без знаков после запятой
        console.log(sliderValue);

        updateModal(slider, {
            paymentPercent: sliderValue, 
            onUpdate: 'paymentSlider' //"Элемент, который привел к изменениям
        })
    })

    return slider;
}

export default init;