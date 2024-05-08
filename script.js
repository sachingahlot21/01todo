

function createTodo() {
    var mainDiv = document.createElement('div')
    mainDiv.id = 'mainDiv'
    mainDiv.className = 'mainDiv'
    document.body.appendChild(mainDiv)

    var heading = document.createElement('div')
    heading.id = 'heading'
    heading.className = 'heading'
    heading.innerHTML = 'TODO'

    var inputDiv = document.createElement('div')
    inputDiv.id = 'inputDiv'
    inputDiv.className = 'inputDiv'

    var inputBox = document.createElement('input')
    inputBox.id = 'inputBox'
    inputBox.className = 'inputBox'
    inputBox.placeholder = 'Enter todo...'
    inputBox.type = 'text'

    var addBtn = document.createElement('button')
    addBtn.id = 'addBtn'
    addBtn.innerText = 'Add'
    addBtn.className = 'addBTn'
    addBtn.addEventListener('click', function () {
        var inputBox = document.getElementById('inputBox');
        var task = inputBox.value.trim();
        if (task !== '') {

            var newTodo = {
                id: todos.length + 1,
                task: task,
                completed: false
            };

            todos.push(newTodo);

            localStorage.setItem('todos', JSON.stringify(todos));

            inputBox.value = '';

            showTodos();
        } else {
            alert('Please enter a task!');
        }
    });

    inputBox.addEventListener('keypress', function (event) {

        if(event.key === 'Enter'){

       event.preventDefault();
        var inputBox = document.getElementById('inputBox');
        var task = inputBox.value.trim();
        if (task !== '') {

            var newTodo = {
                id: todos.length + 1,
                task: task,
                completed: false
            };

            todos.push(newTodo);

            localStorage.setItem('todos', JSON.stringify(todos));

            inputBox.value = '';

            showTodos();
        } else {
            alert('Please enter a task!');
        }
    }});
    
    inputBox.addEventListener('keypress', function(event) {
      
        if (event.key === 'Enter') {
            event.preventDefault();
            addTodo();
        }
    });

    inputDiv.appendChild(inputBox)
    inputDiv.appendChild(addBtn)



    var todoListDiv = document.createElement('div')
    todoListDiv.id = 'todoListDiv'
    todoListDiv.className = 'todoListDiv'


    function showTodos() {

        todoListDiv.innerHTML = '';
        todos.map((todo, index) => {

            var todoHead = document.createElement('div')
            todoHead.id = 'todoHead' + index;
            todoHead.className = 'todoHead'

            var todoHeadPara = document.createElement('h1')
            todoHeadPara.id = 'todoHeadPara' + index;
            todoHeadPara.className = 'todoHeadPara'
            todoHeadPara.innerText = `>  ${todo.task}`

            var todoDeleteBtn = document.createElement('button')
            todoDeleteBtn.id = 'todoDeleteBtn' + index;
            todoDeleteBtn.className = 'todoDeleteBtn'
            todoDeleteBtn.innerText = '❌'
            todoDeleteBtn.addEventListener('click', function () {
                handleDeleteTodo(index);
            });

            var todoEditBtn = document.createElement('button')
            todoEditBtn.id = 'todoEditBtn' + index;
            todoEditBtn.className = 'todoEditBtn'
            todoEditBtn.innerText = '✏️'
            todoEditBtn.addEventListener('click', function () {
                handleEditTodo(index);
            });

            var todoBtnsDiv = document.createElement('div')
            todoBtnsDiv.className = 'todoBtnsDiv'
            todoBtnsDiv.id = 'todoBtnsDiv'


            todoHead.appendChild(todoHeadPara)
            todoHead.appendChild(todoBtnsDiv)

            todoBtnsDiv.appendChild(todoDeleteBtn)
            todoBtnsDiv.appendChild(todoEditBtn)

            todoListDiv.appendChild(todoHead)
        })

    }

    function handleDeleteTodo(index) {
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        showTodos();
    }

    function handleEditTodo(index) {
        var todoToEdit = todos[index];
        var newTask = prompt('Enter the new task:', todoToEdit.task);
        if (newTask !== null && newTask.trim() !== '') {
            todoToEdit.task = newTask.trim();
            localStorage.setItem('todos', JSON.stringify(todos));
            showTodos();
        }
    }

    showTodos()

    mainDiv.appendChild(heading)
    mainDiv.appendChild(inputDiv)
    mainDiv.appendChild(todoListDiv)

}





window.onload = function () {
    todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    createTodo()
}