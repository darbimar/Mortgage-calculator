function switchButton() {
    const button = document.querySelector('.switch-btn');
    
    button.addEventListener('click', () => {
        button.classList.toggle('switch-on');
    })
}

export default switchButton;