// Виконується після завантаження вікна
window.onload = () => {

    // Отримуємо перший елемент тега body
    let elementBody = document.getElementsByTagName('body')[0];

    // Створюємо новий елемент div
    let newElement = document.createElement('div');

    // Додаємо текст до нового елемента
    newElement.innerHTML = "This is a new element";

    // Додаємо клас "panel" до новоствореного елемента
    newElement.className += "panel";

    // Встановлюємо стиль позиціювання елемента
    newElement.style.position = "absolute"; // Робимо елемент абсолютно позиціонованим

    // Розміщуємо елемент внизу праворуч
    newElement.style.bottom = "20px";
    newElement.style.right = "20px";

    // Встановлюємо початкові розміри елемента
    newElement.style.height = "120px";
    newElement.style.width = "120px";

    // Задаємо фоновий колір і колір тексту
    newElement.style.backgroundColor = "black";
    newElement.style.color = "white";

    // Додаємо обробник події onclick, що змінює розміри елемента
    newElement.onclick = changeNewElement;

    // Присвоюємо ідентифікатор елементу, щоб пізніше до нього звертатися
    newElement.id = "newElement";

    // Додаємо новий елемент на початок body (вставляється перед усіма іншими елементами)
    elementBody.prepend(newElement);
}

// Перемикач ВКЛ/ВИКЛ для зміни розміру елемента
let onOff = false;

// Функція для зміни розміру елемента
function changeNewElement() {
    // Отримуємо елемент за його ID
    let el = document.getElementById('newElement');

    // Якщо перемикач увімкнений, встановлюємо початкові розміри, інакше розширюємо елемент
    el.style.height = onOff ? "120px" : "400px";
    el.style.width = onOff ? "120px" : "400px";

    // Міняємо стан перемикача
    onOff = !onOff;
}
