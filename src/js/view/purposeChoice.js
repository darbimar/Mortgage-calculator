function purposeChoice() {
    const select = document.querySelector('select');
    const base = document.querySelector('#base-value');
    const it = document.querySelector('#it-value');
    const gov = document.querySelector('#gov-value');
    const fam = document.querySelector('#fam-value');
    const east = document.querySelector('#east-value');
    const mil = document.querySelector('#mil-value');
    const zero = document.querySelector('#zero-value');

    if (select.value === "secondary") {
        base.style.display = 'block';
        east.style.display = 'block';
        mil.style.display = 'block';
        zero.style.display = 'block';
    }

    select.addEventListener('change', function() {
        if (select.value === "secondary") {
            base.style.display = 'block';
            it.style.display = 'none';
            gov.style.display = 'none';
            fam.style.display = 'none';
            east.style.display = 'block';
            mil.style.display = 'block';
            zero.style.display = 'block';
        } 
        
        if (select.value === "newbuilding" || select.value === "buy_house" || select.value === "build_house") {
            base.style.display = 'block';
            it.style.display = 'block';
            gov.style.display = 'block';
            fam.style.display = 'block';
            east.style.display = 'block';
            mil.style.display = 'block';
            zero.style.display = 'block';
        } 
        
        if (select.value === "refinance") {
            base.style.display = 'block';
            it.style.display = 'none';
            gov.style.display = 'none';
            fam.style.display = 'none';
            east.style.display = 'none';
            mil.style.display = 'none';
            zero.style.display = 'block';
        }
    });
}



export default purposeChoice;