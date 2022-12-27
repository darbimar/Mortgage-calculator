function init(getData) {
    const buttons = document.querySelectorAll('button[name="program"]');

    const {base, it, gov, fam, east, mil, zero} = getData().programs; // Деструктуризация копии объекта data

    //Устанавливаем процентные ставки для каждой кнопки
    document.querySelector('#base-value').value = base;
    document.querySelector('#it-value').value = it;
    document.querySelector('#gov-value').value = gov;
    document.querySelector('#fam-value').value = fam;
    document.querySelector('#east-value').value = east;
    document.querySelector('#mil-value').value = mil;
    document.querySelector('#zero-value').value = zero;

    //Вносим процентные ставки на страницу
    document.querySelector('#base-text').innerHTML = base * 100 + '%';
    document.querySelector('#it-text').innerHTML = it * 100 + '%';
    document.querySelector('#gov-text').innerHTML = gov * 100 + '%';
    document.querySelector('#fam-text').innerHTML = fam * 100 + '%';
    document.querySelector('#east-text').innerHTML = east * 100 + '%';
    document.querySelector('#mil-text').innerHTML = mil * 100 + '%';
    document.querySelector('#zero-text').innerHTML = zero * 100 + '%';

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {

            this.dispatchEvent( // Отправка события в общую систему событий
                new CustomEvent('updateForm', { //Генерируем пользовательское событие
                    bubbles: true, // всплывает
                    detail: {
                        selectedProgram: parseFloat(this.value),
                        onUpdate: 'buttonProgram',
                        id: this.id,
                    },
                })
            )
        })
    })


}

export default init;