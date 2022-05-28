var todos = [], update_id = 0, del_id = 0, id_track = 0, patch = 0,
mappedList = [];

const 
url = 'https://jsonplaceholder.typicode.com/todos',
table = document.querySelector('#t-body'),
addTodo = document.querySelector('#put'),
newTodoBox = document.querySelector('#newTodo'),
editTodoBox = document.querySelector('#editTodo'),
closeBtnNew = document.querySelector('#close-btn-add'),
closeBtnEdit = document.querySelector('#close-btn-edit'),
EditTodoInput = document.querySelector('#edit-todo'),
AddTodoInput = document.querySelector('#new-todo'),
postNewTodo = document.querySelector('#postTodo'),
putExistingTodo = document.querySelector('#putTodo')

// fetch todos
const  fetchTodo = (url)=> {
    fetch(url)
    .then((res)=> res.json())
    .then((json) => {
        json.forEach((todo) => {
            todos.push(todo)
            let = info = `<tr>
                <td>${todo.id}</td>
                <td>${todo.title}</td>
                <td>${mapIcons(todo.completed)}</td>
                <td> <i class="fa fa-edit fa-1x edit" id="${todo.id}" onclick="popEditTodo(this.id)"> </i> </td>
                <td> <i class="fa fa-times fa-1x del" id="${todo.id}" onclick="deleteTodo(this.id)"> </i> </td>
                </tr>`
            mappedList.push(info)
            table.innerHTML += info
        })
    })
    .catch((err)=> console.log("Error in fetching endpoint"))
}


const mapTodoList = () => {
    todos.forEach((todo) => {
        let = info = `<tr>
                <td>${todo.id}</td>
                <td>${todo.title}</td>
                <td>${mapIcons(todo.completed)}</td>
                <td> <i class="fa fa-edit fa-1x edit" id="${todo.id}" onclick="popEditTodo(this.id)"> </i> </td>
                <td> <i class="fa fa-times fa-1x del" id="${todo.id}" onclick="deleteTodo(this.id)"> </i> </td>
                </tr>`
        mappedList.push(info)
    })
}

const renderTodoList = ()=> {
    mappedList.forEach((todo) => {
        table.innerHTML += todo
    })
}

const mapIcons = (bool) =>{
    return (bool) ? '<i class="fa fa-check fa-1x" id="true">' : '<i class="fa fa-times fa-1x" id="false">'  
}

const clearInputs = () => {
    EditTodoInput.value =  "";
    AddTodoInput.value = "";
}

const closeEditBtn = () => {
    editTodoBox.style.display = "none"
}

const CloseAddBtn = () => {
    newTodoBox.style.display= "none"
}


const addNewTodo = () =>{
    newTodoBox.style.display = "block"
}

const postTodo = () =>{
    val = AddTodoInput.value
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            title: val,
            completed: false,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((json) => {
        todos.push(json)
        id_track = (id_track < 1)? json.id : id_track
        // fake adding process for todos enpoint since it does return continuous id for saved todos
        id_redo = (json.id > todos.length-1) ? json.id : id_track+=1 
        console.log(id_track);
        info = `<tr>
                <td>${id_redo}</td>
                <td>${json.title}</td>
                <td>${mapIcons(json.completed)}</td>
                <td> <i class="fa fa-edit fa-1x edit" id="${id_redo}" onclick="popEditTodo(this.id)"> </i> </td>
                <td> <i class="fa fa-times fa-1x del" id="${json.id}" onclick="deleteTodo(this.id)"> </i> </td>
                </tr>`
        mappedList.push(info)
        table.innerHTML += info
        closeBtnNew.click()
        clearInputs()
    })
    
}



const popEditTodo = (id) => {
    EditTodoInput.value = todos[id - 1].title 
    editTodoBox.style.display = "block"
    update_id = id
}

const putEditTodo = ()=>{
    val = EditTodoInput.value
    id = update_id

    fetch(url+`/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: val,
            completed: true,
            userId: '1',
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            todos[id - 1].id = json.id
            todos[id - 1].title = json.title
            todos[id - 1].userId = json.userId
            todos[id - 1].completed = json.completed
            mapTodoList()

            // relace node instead of re-rendering all data
            tablehash = document.getElementsByTagName("tbody")[0].rows
            rowTarget = tablehash[id-1]
            rowTarget.innerHTML = `
            <td>${json.id}</td>
                <td>${json.title}</td>
                <td>${mapIcons(json.completed)}</td>
                <td> <i class="fa fa-edit fa-1x" id="${json.id}" onclick="popEditTodo(this.id)"> </i> </td>
                <td> <i class="fa fa-times fa-1x" id="${json.id}" onclick="deleteTodo(this.id)"> </i> </td>
                </tr>
            `

            closeBtnEdit.click()
        })

}


// delete todo
const deleteTodo = (id) => {
    del_id = id
    updated_todo = todos.filter(drop_id => drop_id!==del_id)
    todos = updated_todo
    mapTodoList()
    // remove element from DOM
    tablehash = document.getElementsByTagName("tbody")[0]
    rowTarget = tablehash.rows[del_id - 1]
    tablehash.removeChild(rowTarget)
}


// get todo list onload
fetchTodo(url);


addTodo.addEventListener('click',addNewTodo)

closeBtnNew.addEventListener('click', CloseAddBtn)
closeBtnEdit.addEventListener('click', closeEditBtn)

putExistingTodo.addEventListener('click', putEditTodo)
postNewTodo.addEventListener('click', postTodo)