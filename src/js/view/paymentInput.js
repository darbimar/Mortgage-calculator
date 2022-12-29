import updateModal from '../utils/updateModal.js'

function init(getData) {
    const input = document.querySelector('#input-downpayment'); 

    // Инициализаци плагина правильного отображения первоначального платежа
    const cleaveInput = new Cleave(input, { 
        numeral: true,
        numeralThousandsGroupStyle: 'thousand',
        delimiter: ' '
    });

    cleaveInput.setRawValue(getData().payment); //Устанавливаем начальное значение первоначального платежа

    input.addEventListener('input', function() {
        const value = +cleaveInput.getRawValue(); //Получаем введенное значение

        //Проверка на минимальный или максимальный первоначальный взнос
        if (value < getData().getMinPayment() || value > getData().getMaxPayment()) {
            input.closest('.param__details').classList.add('param__details--error');
        } else {
            input.closest('.param__details').classList.remove('param__details--error');
        }

        //Обновляем текущее значение инпута в модели
        updateModal(input, {
            payment: value,
            onUpdate: 'inputPayment',
        })
    })

    //При выходе из инпута
    input.addEventListener('blur', function() {
        const value = +cleaveInput.getRawValue(); //Получаем введенное значение
        if (value < getData().getMinPayment()) {
            input.closest('.param__details').classList.remove('param__details--error');
            cleaveInput.setRawValue(getData().getMinPayment());
        } else if (value > getData().getMaxPayment()) {
            input.closest('.param__details').classList.remove('param__details--error');
            cleaveInput.setRawValue(getData().getMaxPayment());
        }

        //Обновляем текущее значение инпута в модели
        updateModal(input, {
            payment: +cleaveInput.getRawValue(),
            onUpdate: 'inputPayment',
        })
    })

    return cleaveInput;
}


export default init;