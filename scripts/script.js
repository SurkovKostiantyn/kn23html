// Змінні:
// Вказуэмо в масиві елементи, якими будемо керувати за допомогою JS
const elementsForEditing = ['p','a','li','div', 'section'];
// В цю змінну запишемо всі знайдені на сторінці елементи
let elementsList = [];
// Стилі для панелі
const panelStyles = {
    position: "absolute",
    bottom: "20px",
    right: "20px",
    height: "120px",
    width: "120px",
    backgroundColor: "black",
    color: "white",
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    padding: '8px'
};
// Стилі для кнопки
const buttonStyles = {
    padding: '4px 6px',
    backgroundColor: 'white',
    border: 'none',
    outline: 'none'
};
// Стилі для select
const selectStyles = {
    border: 'none',
    outline: 'none',
    padding: '4px 6px',
    backgroundColor: 'white',
    display: 'none'
};

// Функції:
// Ця функція виконується після завантаження вікна/сторінки
window.onload = () => {
    findElements(); // Шукаємо всі елементи
    createPanel(); // Створюємо панель
    // console.log(elementsList); - можна вивести в консоль подивитись.
}

// Функція для пошуку всіх елементів зі списку elementsForEditing через querySelectorAll
const findElements = () => {
    elementsForEditing.forEach(tag => {
        // Використовуємо querySelectorAll для пошуку
        elementsList.push(...document.querySelectorAll(tag));

        // Пояснення з прикладом:
        //  Якщо querySelectorAll('p') повертає NodeList із трьох елементів <p>,
        //  оператор ... розпаковує їх, і в результаті:
        //  elementsList.push(...[p1, p2, p3]); // додає p1, p2, p3 до elementsList
    });
}

// Функція для створення панелі:
const createPanel = () => {
    // Шукаємо тег BODY,
    const elementBody = document.body; // Отримуємо елемент body
    if (!elementBody) return; // Перевіряємо, чи існує body

    const panel = document.createElement('div'); // Створюємо новий елемент div
    panel.dataset.panelState = 'false'; // Використовуємо dataset для встановлення стану
    panel.classList.add('panel'); // Додаємо клас "panel"
    Object.assign(panel.style, panelStyles); // додаємо стилі до панелі

    const button = document.createElement('button'); // Створюємо кнопку
    button.id = 'panelButton'; // Додаємо id
    Object.assign(button.style, buttonStyles); // Додаємо стилі до кнопки
    button.innerHTML = "Показати"; // Текст кнопки
    button.addEventListener('click', changePanel); // Додаємо обробник події

    panel.appendChild(button); // Додаємо кнопку до панелі
    panel.id = "panel"; // Додаємо id для панелі
    elementBody.prepend(panel); // Додаємо панель до body
    showList(); // Показуємо список елементів
}

const showList = () => {
    const panel = document.getElementById('panel'); // Отримуємо панель
    if (!panel) return; // Перевірка існування панелі

    const select = document.createElement('select'); // Створюємо елемент select
    Object.assign(select.style, selectStyles); // Додаємо стилі до кнопки
    select.id = 'panelSelect'; // Додаємо id для select
    // Слідкуємо за діями з елементом select
    select.addEventListener('change', event => {
        const selectedIndex = event.target.value; // Отримуємо індекс вибраного елемента
        // Очищуємо outline для всіх елементів у списку
        elementsList.forEach(el => {
            el.style.outline = 'none';
        });
        // Отримуємо вибраний елемент за індексом
        const selectedElement = elementsList[selectedIndex];
        if (selectedElement) {
            selectedElement.style.outline = '4px solid red'; // виділяємо вибраний елемент
        }
    });

    const resetButton = document.createElement('button'); // Створюємо кнопку Очистити
    resetButton.textContent = 'Очистити'; // Встановлюємо текст кнопки
    resetButton.id = 'resetButton';
    Object.assign(resetButton.style, buttonStyles); // Додаємо стилі до кнопки
    resetButton.addEventListener('click', () => { // Додаємо обробник кліку
        elementsList.forEach(el => {
            el.style.outline = 'none'; // Очищаємо outline для всіх елементів
        });
        select.value = ''; // Скидаємо вибір у select
    });

    panel.appendChild(select); // Додаємо select до панелі
    panel.appendChild(select); // Додаємо select до панелі
    panel.appendChild(resetButton); // Додаємо кнопку для скидання до панелі

    elementsList.forEach((tag, index) => { // Ітеруємо знайдені елементи з індексом
        const option = document.createElement('option'); // Створюємо опцію для select
        option.value = index.toString(); // Встановлюємо індекс як значення (це буде унікальне значення)
        let textContent = tag.textContent.trim(); // Отримуємо текстовий контент
        let optionText = textContent.length > 20 ? textContent.substring(0, 20) + " ..." : textContent; // Обрізаємо текст
        option.innerHTML = `${tag.tagName.toLowerCase()} ${optionText}`; // Встановлюємо текст опції
        select.appendChild(option); // Додаємо опцію до select
    });
}

// Функція для зміни розміру панелі
const changePanel = () => {
    const panel = document.getElementById('panel'); // Отримуємо панель
    if (!panel) return; // Перевірка існування панелі

    const panelState = panel.dataset.panelState === 'true'; // Поточний стан панелі
    panel.style.height = panelState ? "120px" : "400px"; // Встановлюємо новий розмір
    panel.style.width = panelState ? "120px" : "400px";

    const button = document.getElementById('panelButton'); // Отримуємо кнопку
    if (button) button.innerHTML = panelState ? "Показати" : "Приховати"; // Зміна тексту кнопки

    const select = document.getElementById('panelSelect'); // Отримуємо select
    if (select) select.style.display = panelState ? 'none' : 'block'; // Показуємо/ховаємо select

    panel.dataset.panelState = (!panelState).toString(); // Оновлюємо стан панелі
}
