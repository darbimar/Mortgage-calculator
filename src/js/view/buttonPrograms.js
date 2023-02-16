import updateModal from "./../utils/updateModal.js";


function init(getData) {
    const buttons = document.querySelectorAll('button[name="program"]');
    const switchButton = document.querySelector('.switch-btn');

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


    const removeAllActive = async () => {
        return buttons.forEach(button  =>  {
            button.classList.remove('button_active');
            switchButton.classList.remove('switch-on');
        });

    };

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {            
            removeAllActive();
            button.className = 'button button_active';
            updateModal(this, {
                selectedProgram: parseFloat(this.value),
                onUpdate: 'buttonProgram',
                id: this.id,
            });
        });

        //Настройка работы переключателя
        switchButton.addEventListener('click', () => {
            if (button.className === 'button button_active') {
                if (switchButton.className === 'switch-btn switch-on') {
                switchButton.classList.remove('switch-on');
                updateModal(button, {
                    selectedProgram: parseFloat(button.value),
                    onUpdate: 'buttonProgram',
                    });
                } else if (switchButton.className !== 'switch-btn switch-on') {
                    switchButton.classList.add('switch-on');
                    updateModal(button, {
                        selectedProgram: parseFloat(button.value) - 0.01,
                        onUpdate: 'buttonProgram',
                    });
                }                    
            }
        });
        
    })

}

export default init;