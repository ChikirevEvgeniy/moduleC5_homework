const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
    const num1 = +document.getElementById('number1').value;
    const num2 = +document.getElementById('number2').value;

    let res = document.getElementById('j-result');
    res.textContent = '';
    
    if (num1 < 100 || num1 > 300 || num2 < 100 || num2 > 300) {
        res.textContent = "Одно из чисел вне диапазона от 100 до 300";
        return;
    };
    
    fetch(`https://picsum.photos/${num1}/${num2}`)
    .then((response) => {
        document.getElementById('result').src = response.url;
    });
});