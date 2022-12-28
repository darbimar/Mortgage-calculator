import updateModal from "./../utils/updateModal.js";

function init(getData) {
    const slider = document.querySelector('#slider-cost');
    const data = getData()

    noUiSlider.create(slider, {
        start: data.cost,
        connect: 'lower',
        tooltips: true, //Подсказки
        step: 100000,
        range: {
            min: data.minPrice,
            '1%': [400000, 100000],
            '50%': [12000000, 1000000],
            max: data.maxPrice,
        }
    });


    //Следить за событиями
    slider.noUiSlider.on('slide', function() {
        //Получаем значение из слайдера
        let sliderValue = slider.noUiSlider.get();
        sliderValue = sliderValue.split('.')[0]; //Возвращаем число без знаков после запятой
        console.log(sliderValue);

        updateModal(slider, {
            cost: sliderValue, 
            onUpdate: 'costSlider' //"Элемент, который привел к изменениям
        })
    })

    return slider;
}

export default init;