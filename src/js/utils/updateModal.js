function updateModal(element, data) {
    element.dispatchEvent( // Отправка события в общую систему событий
        new CustomEvent('updateForm', { //Генерируем пользовательское событие
            bubbles: true, // всплывает
            detail: {...data},
        })
    );
}

export default updateModal;


