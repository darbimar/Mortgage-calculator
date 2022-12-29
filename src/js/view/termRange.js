import updateModal from "../utils/updateModal.js";

function init(getData) {
    const slider = document.querySelector('#slider-term');
    const data = getData();

    noUiSlider.create(slider, {
        start: data.term,
        connect: 'lower',
        tooltips: false, //Подсказки
        step: 1,
        range: {
            min: data.minTerm,
            max: data.maxTerm,
        }
    });


    //Следить за событиями
    slider.noUiSlider.on('slide', function() {
        //Получаем значение из слайдера
        let sliderValue = slider.noUiSlider.get();
        sliderValue = sliderValue.split('.')[0]; //Возвращаем число без знаков после запятой
        console.log(sliderValue);

        updateModal(slider, {
            term: sliderValue, 
            onUpdate: 'termSlider' //"Элемент, который привел к изменениям
        })
    })

    return slider;
}

export default init;