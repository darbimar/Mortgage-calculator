import updateModal from '../utils/updateModal.js'

function init(getData) {
    const input = document.querySelector('#input-term'); 
    const data = getData();

    // Инициализаци плагина правильного отображения срока
    const cleaveInput = new Cleave(input, { 
        numeral: true,
        numeralThousandsGroupStyle: 'thousand',
        delimiter: ' '
    });

    cleaveInput.setRawValue(data.term); //Устанавливаем начальное срока

    input.addEventListener('input', function() {
        const value = +cleaveInput.getRawValue(); //Получаем введенное значение

        //Проверка на максимальный срок
        if (value < data.minTerm || value > data.maxTerm) {
            input.closest('.param__details').classList.add('param__details--error');
        } else {
            input.closest('.param__details').classList.remove('param__details--error');
        }

        //Обновляем текущее значение инпута в модели
        updateModal(input, {
            term: value,
            onUpdate: 'inputTerm',
        })
    })

    //При выходе из инпута
    input.addEventListener('blur', function() {
        const value = +cleaveInput.getRawValue(); //Получаем введенное значение
        if (value > data.maxTerm) {
            input.closest('.param__details').classList.remove('param__details--error');
            cleaveInput.setRawValue(data.maxTerm);
        } else if (value < data.minTerm) {
            input.closest('.param__details').classList.remove('param__details--error');
            cleaveInput.setRawValue(data.minTerm);
        }

        //Обновляем текущее значение инпута в модели
        updateModal(input, {
            term: +cleaveInput.getRawValue(),
            onUpdate: 'inputTerm',
        })
    })

    return cleaveInput;
}


export default init;