import Task from './Task.js';
let tasks = [
    {
        id: 1,
        title: "tache test 1",
        description: "desc test 1",
        state: false
    },
    {
        id: 2,
        title: "tache test 2",
        description: "desc test 2",
        state: true
    },
    {
        id: 3,
        title: "tache test 3",
        description: "desc test 3",
        state: true
    }
];
const addTask = (e) => {
    e.preventDefault();

    const taskTitle = document.querySelector('#taskTitle');
    const taskDescription = document.querySelector('#taskDescription');

    console.log(taskTitle);
    if (taskTitle) {
        let inputValue = taskTitle.value;
        let descriptionValue = taskDescription.value;
        const errorZone = document.querySelector('#errorZone');
        taskTitle.setAttribute("required", true);
        
        if (inputValue && inputValue.length > 0) {
            console.log("Repo", inputValue);
            let task = new Task();
            task.title = inputValue;
            descriptionValue ? task.description = descriptionValue : '';
            tasks.push(task);
            inputValue = "";
            descriptionValue = "";
            storeTasks();

        }
    }
}

const storeTasks = function(){
    let taskToStore = JSON.stringify(tasks);
    localStorage.setItem('tasksArray', JSON.stringify(taskToStore));
}

const setTaskDone = function(e){
    // const taskCheckbox = document.querySelector("input[type=checkbox]");
    console.log('task !! ');
    console.log("event",e);
    console.log(e.target.checked);

    // tasks[ind].state = e.target.checked;

    // else {
    //    tasks[ind].state = false;
    // }
    // console.log(tasks[ind].state);
}


const taskForm = document.getElementById('taskForm');
    // const taskInput = document.getElementById(id);
    // const taskDescription = document.getElementById(id);
    // const taskState = document.getElementById(id);

const getLocalStorage =  ()=>{
    try {
            // console.log(JSON.parse(localStorage.getItem('tasksArray')));
            let data =  JSON.parse(localStorage.getItem('tasksArray'));
            json_tasks =  JSON.parse(data);
            tasks.push([...json_tasks]);
            console.log(tasks)
    } catch (error) {
        console.log(error);
    }
}

import {router} from './router.js';

async function addTaskToDom(){
    console.log("Add")
    
    await getLocalStorage();

}


const HomeComponent = {
    render: ()=>{

        return (`
            <section class="mt-5 container">
                <div class="row">
                    <div class="col-lg-6 mb-4">
                        <h2 class="text-center my-4 border border-secondary text-secondary p-3">Création d'une nouvelle tâche</h2>
                        <form methods="GET" id="taskForm" class="w-100 mx-auto">
                            <div class="form-group">
                                <label for="task_title">Titre</label>
                                <input type="text"
                                class="form-control" 
                                name="task_title" 
                                id="taskTitle" 
                                placeholder="Renseignez une tâche">
                                <div id="errorZone">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="task_description">Description</label>
                                <textarea class="form-control" name="task_description" id="taskDescription" rows="3" placeholder="Description de la tâche"></textarea>
                            </div>
                            <button id="addFormBtn" class="btn btn-success mt-3">Ajouter</button>
                        </form>
                    </div>

                    <div class="col-lg-6">
                        <div id="tasksContainer">
                            <h2 class="text-center my-4 border border-secondary text-secondary p-3">Liste des tâches</h2>
                            ${addTaskToDom()}
                            ${tasks.map((task, index)=>{
                                return `
                                <div class="row">
                                    <div class="col-7 px-3">${task.title}</div>
                                    <div class="col-1">
                                        <input onclick="${setTaskDone})" 
                                            class="taskCheckbox" 
                                            name="checkbox" 
                                            type="checkbox" 
                                            class="form-check-input" 
                                            ${task.state ? "checked" : ''}
                                        >
                                    </div>
                                    <div class="col-1" id="taskEditBtn">
                                        <button onclick="editTask(${event}, ${index})" class="btn btn-warning task_edit_btn">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                    </div>
                                    <div class="col-1 taskDelBtn" >
                                        <button  onclick="delTask(${event},${index})" class="task_del_btn btn btn-danger"><i class="fas fa-trash"></i></button>
                                    </div>
                                </div><hr/>`
                            }).join('')}
                        </div>
                    </div>
                </div>
            </section>
        `)
    }
}

const Page1Component = {
    render: ()=>{
        return `
            <section>
                <h1>Page 1</h1>
                <p>Just a test</p>
            </section>
        `;
    }
}

const Page2Component = {
  render: () => {
    return `
      <section>
        <h1>Page 2</h1>
        <p>This is just a test</p>
      </section>
    `;
  }
} 

const ErrorComponent = {
  render: () => {
    return `
      <section>
        <h1>Error</h1>
        <p>An error occured</p>
      </section>
    `;
  }
}


export {
    HomeComponent,
    ErrorComponent,
    Page1Component,
    Page2Component,
    addTask
}