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
            if (arr[i].textContent.slice(0, -1) === text) {
                alert.textContent = 'To wpis został dodany wcześniej! Wymyśl inny.';
                alert.style.color = 'red';
                input.value = '';
                return;
            }
        }
        const element = document.createElement('li');
        element.innerHTML = text + '<button class="deleteButton">X</button>';
        const item = list.appendChild(element);
        arr.push(item);
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
    //CONFIRM CLICKED ELEMENT
    arr.forEach(li => {
        li.onclick = () => {
            li.classList.toggle('clicked');
            if (li.classList.contains('clicked')) {
                alert.textContent = 'Kliknij na wpis by anulować, bądź X by potwierdzić i usunąć.';
                alert.style.color = 'red';
            } else alert.textContent = '';
        }

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
}
button.addEventListener('click', addTask);

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
        tasks.innerHTML = 'Ilość wpisów: ' + arr.length + '<br>' + '<br>' + time + '<br>' + 'Usunięto wpis: ' + '<br>' + "'" + removed[0].textContent.slice(0, -1) + "'";
        tasks.style.color = 'blue';
    }
};

const searchTask = () => {
    const searchText = search.value.toLowerCase();
    const filtered = arr.filter(li => li.textContent.toLowerCase().includes(searchText));
    list.textContent = '';
    filtered.forEach(li => list.appendChild(li));
}
search.addEventListener('input', searchTask);

//LOCAL STORAGE OPTIONS
const storage = () => {
    const saveStorage = () => {
        saveBtn.addEventListener('click', () => {
            localStorage.setItem('lagowskiTodo', list.innerHTML);

            //SAVE ARR TO FILE
            console.log('Do wysłania aktualna zawartość zmiennej (tablicy) "arr" czyli to co poniżej');
            console.log(arr)
            /* W tym miejscu potrzebuje przesłać */
        });
    }
    saveStorage();

    const loadStorage = () => {
        loadBtn.addEventListener('click', () => {
            const savedItem = localStorage.getItem('lagowskiTodo');
            console.log(savedItem)
            list.innerHTML = savedItem;
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