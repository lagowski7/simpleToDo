//SIMPLE TODO by Konrad Lagowski v1
const app = document.querySelector('.app');
const input = document.querySelector('.input');
const button = document.querySelector('.button');
const list = document.querySelector('.list');
const alert = document.querySelector('.alert');
const tasks = document.querySelector('.tasks');
const search = document.querySelector('.search');
const saveBtn = document.querySelector('.saveBtn');
const loadBtn = document.querySelector('.loadBtn');
const clearBtn = document.querySelector('.clearBtn');
let arr = [];
const today = new Date();
const time = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDate()}`;



const addTask = () => {
    const text = input.value;

    if (text.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === text) {
                alert.textContent = 'To wpis został dodany wcześniej! Wymyśl inny.';
                alert.style.color = 'red';
                input.value = '';
                return;
            }
        }
        arr.push(text);
        const element = document.createElement('li');
        element.innerHTML = arr[arr.indexOf(text)] + '<button class="editButton">...</button>' + '<button class="deleteButton">X</button>';
        const item = list.appendChild(element);
        input.value = '';
        search.value = '';
        alert.style.color = 'green';
        alert.innerHTML = time + '<br>' + 'Dodano wpis: ' + '<br>' + "'" + text + "'";
        //NUMBER OF TEXTS
        tasks.textContent = 'Ilość wpisów: ' + arr.length;
        tasks.style.color = 'blue';
        //NO TEXT MESSAGE
    } else if (!input.value) {
        alert.textContent = 'Nic nie wpisałeś/aś...';
        alert.style.color = 'red';
    }
    const deleteBtn = [...document.querySelectorAll('.deleteButton')];
    deleteBtn.forEach(element => {
        element.addEventListener('click', removeTask);
    })
    const editBtn = [...document.querySelectorAll('.editButton')];
    editBtn.forEach(element => {
        element.addEventListener('click', editTask);
    })
    const inputAlert = () => {
        input.addEventListener('change', () => {
            if (text.length > 20) {
                alert.textContent = 'Maksymalna ilość znaków to 20.';
                alert.style.color = 'red';
            }
        })
    }
    inputAlert();
    clicked();

}
button.addEventListener('click', addTask);

//CONFIRM CLICKED ELEMENT
const clicked = () => {
    const items = [...list.children];
    items.forEach(li => {
        li.onclick = () => {
            li.classList.toggle('clicked');
            if (li.classList.contains('clicked')) {
                alert.textContent = 'Kliknij na wpis by anulować, bądź X by potwierdzić i usunąć.';
                alert.style.color = 'red';
            } else alert.textContent = '';
        }

    })
}

//USE ENTER AS SUBMIT
window.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        addTask();
    }
});


const removeTask = (e) => {
    if (e.target.parentNode.classList.contains('clicked')) {
        e.target.parentNode.remove();
        const removed = arr.splice(arr.indexOf(e.target.parentNode), 1);
        search.value = '';
        tasks.innerHTML = 'Ilość wpisów: ' + arr.length + '<br>' + '<br>' + time + '<br>' + 'Usunięto wpis: ' + '<br>' + "'" + removed + "'";
        tasks.style.color = 'blue';
    }
};

const searchTask = () => {
    if (search.value === 0 || search.value === '') {
        list.innerHTML = '';

        for (let i = 0; i < arr.length; i++) {
            const element = document.createElement('li');
            element.innerHTML = arr[i] + '<button class="editButton">...</button>' + '<button class="deleteButton">X</button>';
            list.appendChild(element)
        }

    } else {
        const searchText = search.value.toLowerCase();
        const filtered = arr.filter(li => li.toLowerCase().includes(searchText));
        list.textContent = '';
        const element = document.createElement('li');
        element.innerHTML = arr[arr.indexOf(filtered[0])] + '<button class="editButton">...</button>' + '<button class="deleteButton">X</button>';
        filtered.forEach(li => list.appendChild(element));
    }
    clicked();

    const deleteBtn = [...document.querySelectorAll('.deleteButton')];
    deleteBtn.forEach(element => {
        element.addEventListener('click', removeTask);
    })
    const editBtn = [...document.querySelectorAll('.editButton')];
    editBtn.forEach(element => {
        element.addEventListener('click', editTask);
    })
}
search.addEventListener('input', searchTask);

const editTask = (e) => {
    const changedText = prompt('Wpisz nową nazwę zadania.');
    const content = e.target.parentNode.textContent.slice(0, -4);
    arr[arr.indexOf(content)] = changedText;
    e.target.parentNode.classList.toggle('clicked');
    e.target.parentNode.innerHTML = changedText + '<button class="editButton">...</button>' + '<button class="deleteButton">X</button>';

    const deleteBtn = [...document.querySelectorAll('.deleteButton')];
    deleteBtn.forEach(element => {
        element.addEventListener('click', removeTask);
    })
    const editBtn = [...document.querySelectorAll('.editButton')];
    editBtn.forEach(element => {
        element.addEventListener('click', editTask);
    })
}

//LOCAL STORAGE OPTIONS
const storage = () => {
    const saveStorage = () => {
        saveBtn.addEventListener('click', () => {
            localStorage.setItem('lagowskiTodo', list.innerHTML);
            const arrToString = JSON.stringify(arr);
            localStorage.setItem('lagowskiTodoArr', arrToString);
        });
    }
    saveStorage();

    const loadStorage = () => {
        loadBtn.addEventListener('click', () => {
            const savedItem = localStorage.getItem('lagowskiTodo');
            const savedArr = localStorage.getItem('lagowskiTodoArr');
            const parsedArr = JSON.parse(savedArr);
            list.innerHTML = savedItem;
            arr = parsedArr;

            const deleteBtn = [...document.querySelectorAll('.deleteButton')];
            deleteBtn.forEach(element => {
                element.addEventListener('click', removeTask);
            })
            const editBtn = [...document.querySelectorAll('.editButton')];
            editBtn.forEach(element => {
                element.addEventListener('click', editTask);
            })
            clicked();
        })


    }
    loadStorage();

    const clearStorage = () => {
        clearBtn.addEventListener('click', () => {
            localStorage.removeItem('lagowskiTodo');
            location.reload();
        })
    }
    clearStorage();
}
storage();