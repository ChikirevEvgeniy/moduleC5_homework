let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
console.log('1: ', localStorage.getItem('items'));
if (localStorage.getItem('items')) {
    useRequest(JSON.parse(localStorage.getItem('items')), displayResult);
};

/**
  * Функция-обертка над XMLHttpRequest, осуществляющая запрос
  * url - урл, по которому будет осуществляться запрос
  * callback - функция, которая вызовется при успешном выполнении
  * и первым параметром получит объект-результат запроса
  */
function useRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
        if (xhr.status != 200) {
            console.log('Статус ответа: ', xhr.status);
        } else {
            const result = JSON.parse(xhr.response);
            if (callback) {
                callback(result);
            }
        }
    };
    
    xhr.onerror = function() {
        console.log('Ошибка! Статус ответа: ', xhr.status);
    };
    
    xhr.send();
};

// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.result');
// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.btn');

/**
  * Функция обработки полученного результата
  * apiData - объект с результатом запроса
  */
function displayResult(apiData) {
    let cards = '';
    
    apiData.forEach(item => {
    const cardBlock = `
        <div class="card">
            <img
                src="${item.download_url}"
                class="card-image"
            />
            <p>${item.author}</p>
        </div>
    `;
    cards = cards + cardBlock;
    });
    
    resultNode.innerHTML = cards;
}

localStorage.removeItem('items');
//console.log('2: ', localStorage.getItem('items'));

// Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', () => {
    const value1 = Number(document.getElementById('number1').value);
    const value2 = Number(document.getElementById('number2').value);
    if ((value1>0 && value1<11) && (value2>0 && value2<11)) {
        //console.log(`Число правильное: ${value}`);
        let urlRequest = `https://picsum.photos/v2/list?page=${value1}&limit=${value2}`
        
        localStorage.clear();
        //console.log('3: ', localStorage.getItem('items'));
        itemsArray.push(urlRequest);
        localStorage.setItem('items', JSON.stringify(itemsArray));
            
        useRequest(urlRequest, displayResult);
    
    } else if (!(value1>0 && value1<11) && !(value2>0 && value2<11)) {
        resultNode.innerHTML = 'Номер страницы и лимит вне диапазона от 1 до 10';
    } else if (!(value1>0 && value1<11)) {
        resultNode.innerHTML = 'Номер страницы вне диапазона от 1 до 10';
    } else {
        resultNode.innerHTML = 'Лимит вне диапазона от 1 до 10';
    }
});