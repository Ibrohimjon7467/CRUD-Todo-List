const formCreate = document.getElementById('form-create')
const formEdit = document.getElementById('form-edit')
const listGroupTodo = document.getElementById('list-group-todo')
// const messageCreate = document.getElementById('message-create')
const time = document.getElementById('time')
const modal = document.getElementById('modal')
const overlay = document.getElementById('overlay')
/* time elements */
const fullDay = document.getElementById('full-day')
const hourEl = document.getElementById('hour')
const minuteEl = document.getElementById('minute')
const secondEl = document.getElementById('second')
const closeEl = document.getElementById('close')

// werible
let editId;

// show eror
function showMessage(where, message) {
    document.getElementById(`${where}`).textContent = message
    setTimeout(() => {
        document.getElementById(`${where}`).textContent = ''
    }, 2500);
}

// a.length

// time

function TimeFunc() {
    let month = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    let dax = new Date();
    let soat = String(dax.getHours()).padStart(2, "0")
    let year = dax.getFullYear()
    let min = String(dax.getMinutes()).padStart(2, "0")
    let second = String(dax.getSeconds()).padStart(2, "0")
    let Moth = dax.getMonth()
    let day =  String(dax.getDate()).padStart(2, "0")


    fullDay.textContent = `${day} ${month[Moth]} ${year}`


    hourEl.textContent = soat
    minuteEl.textContent = min
    secondEl.textContent = second

    return `${soat}:${min} ${day}.${Moth.toString().padStart(2, "0")}.${year}`

}


setInterval(() => {
    TimeFunc()
}, 1000)
//  time end

// get Todos

let todos = JSON.parse(localStorage.getItem("list")) ? JSON.parse(localStorage.getItem("list")) : []
if (todos.length) showTodos()

// localStorage.clear()
// set local
function setTodos() {
    localStorage.setItem('list', JSON.stringify(todos))
}

// show todos
function showTodos() {
    JSON.parse(localStorage.getItem("list"))
    listGroupTodo.innerHTML = ''
    todos.forEach((item, i) => {
        listGroupTodo.innerHTML += `
        <li ondblclick="setCompleted(${i})" class="list-group-item d-flex justify-content-between 
         ${item.complited == true ? 'complated' : ''} 
        
        ">
            ${item.text}
        <div class="todo-icons">
          <span class="opacity-50 me-2 ">${item.time}</span>
          <img onclick="editTodo(${i})"src="./img/edit.svg" alt="edit-img" width="25" height="25">
          <img onclick="deleteTodo(${i})" src="./img/delete.svg" alt="delete-img" width="25" height="25">
        </div>
      </li>
        
        `
    });
}

// get Todos
formCreate.addEventListener("submit", (e) => {
    e.preventDefault()
    const todoText = formCreate["input-create"].value.trim()
    if (todoText.length) {
        todos.push({
            text: todoText, time: TimeFunc(), complited: false
        })
        formCreate.reset()
        setTodos()
        showTodos()
    } else {
        showMessage('message-create', "Please, enter some text... ")
    }

})

// onclick="deleteTodo(id)"
function deleteTodo(id) {
    const deleteTodos = todos.filter((item, i) => {
        return i != id

    })
    todos = deleteTodos

    setTodos()
    showTodos()
}

// setcompleted(i)
function setCompleted(id) {
    const CompletedTodos = todos.map((item, i) => {
        if (id == i) {
            return { ...item, complited: item.complited == true ? false : true };
        } else {
            return { ...item }
        }
    })

    todos = CompletedTodos
    setTodos()
    showTodos()
}
// edit form
formEdit.addEventListener("submit", (e) => {
    e.preventDefault()
    const todoText = formEdit["input-edit"].value.trim()
    if (todoText.length) {
        todos.splice(editId, 1, {
            text: todoText, time: TimeFunc(), complited: false
        })
        formEdit.reset()
        setTodos()
        showTodos()
        close()
    } else {
        showMessage('message-edit', "Please, enter some text... ")
    }

})


// Edit todo

function editTodo(id) {
    open()
    editId = id
}

// open 
function open() {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}
// Close 
function close() {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

closeEl.addEventListener("click", close)
overlay.addEventListener("click", close)

document.addEventListener('keydown', (e) => {
    if (e.code == "Escape") {
        close()
    }
})
