const vm = Vue.createApp({})

vm.component("my-component",{
    template:`
    <div v-bind="$attrs">
        <header>
        <section>
            <h1>To-do List</h1>
            <form @submit.prevent="addTodo" id="add-todo-form" class="add-todo-form">
                <input type="text" v-model="newTodo" id="addInput" class="addInput" placeholder="請輸入代辦事項...">
                <button type="submit" class="addBtn"><i class="fas fa-plus"></i></button>
            </form>
        </section> 
        </header>
        <div class="select">
            <form class="radioform">
                <input type="radio" id="all" @click="filter='all'">
                <label for="all" :class="{active:filter==='all'}">全部</label>
                <input type="radio" id="completed" @click="filter='completed'">
                <label for="completed" :class="{active : filter==='completed'}">已完成</label>
                <input type="radio" id="incompleted" @click=" filter='incompleted'">     
                <label for="incompleted" :class="{active:filter==='incompleted'}">未完成</label>
            </form>
        </div>
        <div class="content">
            <h3 v-if="!todos.length" class="null">沒有待辦事項</h3>
            <ul id="todoList">
                <li v-for="todo in todosFiltered" class="todo">
                    <span :class="{completed:todo.done}">{{todo.title}}</span>
                    <input type="checkbox" v-model="todo.done"><i class="fas fa-check complete"></i>
                    <button @click="removeTodo(todo)" type="button" class="trash"><i class="fas fa-times"></i></button>
                </li>
            </ul>
        </div>
    </div> 
    `,
    data(){
        return{
            newTodo:"",
            todos:[],
            filter: 'all'
        }
    },
    mounted(){
        if(localStorage.todoList){
            this.todos=JSON.parse(localStorage.todoList)
        }
    },
    watch: {
        todos: {
        handler() {
            console.log('todoList changed')
            localStorage.setItem("todoList", JSON.stringify(this.todos))
          },
          deep: true
        },
    },
    computed: {
        todosFiltered () {
            if(this.filter ==='all'){
                return this.todos
            }else if(this.filter==='completed'){
                return this.todos.filter(todo=> todo.done)
            }else{
                return this.todos.filter(todo=> !todo.done)  
            }
        }
    },
    methods:{
        addTodo(){
            // this.keydown= true;
            if(this.newTodo.trim()!=""){
            this.todos.push({
                title:this.newTodo,
                done:false,
            })
            console.log(this.todos);
            this.newTodo=""}
        },
        removeTodo(index){
            this.todos.splice(index,1)
        }
    }
})
vm.mount('#app');