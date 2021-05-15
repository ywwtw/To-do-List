const input = document.getElementById("addInput"),
        btn = document.getElementById("addBtn"),
        todoList = document.getElementById("todos");

btn.addEventListener("click",function(e){
    e.preventDefault();
    const todo= input.value;
    new TodoItem(todo);
    updateToLocalStorage(todo);
});

let todos;
todos=JSON.parse(localStorage.getItem("todos"))||[];
todos.forEach(function(todo){
    new TodoItem(todo);
})     

function TodoItem(todo){
    if(todo!=""){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        todoList.appendChild(todoDiv);

        const newTodo = document.createElement("li");
        newTodo.classList.add("new");
        newTodo.innerText=todo;
        todoDiv.appendChild(newTodo);

        const completeBtn = document.createElement("button");
        completeBtn.innerHTML = '<i class="fas fa-check"></i>';
        completeBtn.classList.add("complete");
        todoDiv.appendChild(completeBtn);

        const trashBtn = document.createElement("button");
        trashBtn.innerHTML = '<i class="fas fa-times"></i>';
        trashBtn.classList.add("trash");
        todoDiv.appendChild(trashBtn);
    }
    input.value="";
}

todoList.addEventListener("click",function(e){ 
    const item =e.target;
    const todoE = item.parentElement;
    if(item.classList[0]==="trash"){
        todoE.classList.add("right");
        todoE.addEventListener("transitionend",function(){
        todoE.remove();
        });
    if(todos.indexOf(todoE.innerText)>-1){
        todos.splice(todos.indexOf(todoE.innerText),1);
        localStorage.setItem("todos",JSON.stringify(todos));
    }}      
    if(item.classList[0]==="complete"){
        todoE.classList.toggle("completed");
    }
})

function updateToLocalStorage(todo){
    if(localStorage.getItem("todos")==null){
        todos=[];}     
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function filterTodo(x) {
    let todoStatus=document.querySelectorAll("label input");
    const alltodo = todoList.childNodes;
    switch(x) {
        case 'all':
            alltodo.forEach(function(todo){
            todo.style.display="flex";
            })
            break;
        case 'completed':
            alltodo.forEach(function(todo){
                if(todo.classList.contains("completed")){
                    todo.style.display="flex";
                }else{
                    todo.style.display="none";
                }})
                break;
        case 'unCompleted':
            alltodo.forEach(function(todo){
            if(!todo.classList.contains("completed")){
                todo.style.display="flex";
            }else{
                todo.style.display="none";
            }
        })
    }
}