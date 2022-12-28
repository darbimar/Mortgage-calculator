import updateModal from './../utils/updateModal.js'

function init(getData) {
    const input = document.querySelector('#input-cost'); 
    const data = getData();

    // Инициализаци плагина правильного отображения стоимости
    const cleaveInput = new Cleave(input, { 
        numeral: true,
        numeralThousandsGroupStyle: 'thousand',
        delimiter: ' '
    });

    cleaveInput.setRawValue(data.cost); //Устанавливаем начальное значение стоимости

    input.addEventListener('input', function() {
        const value = +cleaveInput.getRawValue(); //Получаем введенное значение

        //Проверка на манимальну. или максимальную цену
        if (value < data.minPrice || value > data.maxPrice) {
            input.closest('.param__details').classList.add('param__details--error');
        } else {
            input.closest('.param__details').classList.remove('param__details--error');
        }

        //Обновляем текущее значение инпута в модели
        updateModal(input, {
            cost: value,
            onUpdate: 'inputCost',
        })
    })

    //При выходе из инпута
    input.addEventListener('blur', function() {
        const value = +cleaveInput.getRawValue(); //Получаем введенное значение
        if (value < data.minPrice) {
            input.closest('.param__details').classList.remove('param__details--error');
            cleaveInput.setRawValue(data.minPrice);
        } else if (value > data.maxPrice) {
            input.closest('.param__details').classList.remove('param__details--error');
            cleaveInput.setRawValue(data.maxPrice);
        }

        //Обновляем текущее значение инпута в модели
        updateModal(input, {
            cost: +cleaveInput.getRawValue(),
            onUpdate: 'inputCost',
        })
    })

    return cleaveInput;
}


export default init;