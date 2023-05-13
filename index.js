class Task {
    constructor(desc, status) {
        this.desc = desc
        this.status = status
    }

    html(pos) {
        return `
        <div class="task">
         <i id="borrar" class="fa-solid fa-x" onclick="deleteTask(${pos})"></i>
            <p>${this.desc}</p>
            <button id="azul" onclick="updateTask(${pos})">+</button>
            <button id="rojo" onclick="rojoTask(${pos})">-</button>
        </div>
        `
    }
}


function addTask() {
    const taskValue = document.getElementById("addtext").value
    const task = new Task(taskValue, "TODO")
    let list = localStorage.getItem("list")
    if (list === null) {
        list = [task]
        const listStr = JSON.stringify(list)
        localStorage.setItem("list", listStr)
    } else {
        let listJson = JSON.parse(list)
        let taskList = []
        for (let i = 0; i < listJson.length; i++) {
            const obj = listJson[i]
            const objTask = new Task(obj.desc, obj.status)
            taskList.push(objTask)
        }
        taskList.push(task)
        const listStr = JSON.stringify(taskList)
        localStorage.setItem("list", listStr)
    }
    addtext.value = ""
    renderAll()
}

function renderAll() {
    const divTodo = document.getElementById("todosection")
    const divDoing = document.getElementById("doingSection")
    const divDone = document.getElementById("doneSection")

    divTodo.innerHTML = ""
    divDoing.innerHTML = ""
    divDone.innerHTML = ""
    let list = localStorage.getItem("list")
    if (list !== null) {
        let listJson = JSON.parse(list)
        for (let i = 0; i < listJson.length; i++) {
            const obj = listJson[i]
            const objTask = new Task(obj.desc, obj.status)
            if (objTask.status === "TODO") {
                divTodo.innerHTML += objTask.html(i)
            } else if (objTask.status === "DOING") {
                divDoing.innerHTML += objTask.html(i)
            } else{
                divDone.innerHTML += objTask.html(i)
            }
        }
    }

}

function deleteTask(index) {
    let list = localStorage.getItem("list");
    if (list !== null) {
        let listJson = JSON.parse(list);
        listJson.splice(index, 1); // Elimina la tarea del arreglo
        const listStr = JSON.stringify(listJson);
        localStorage.setItem("list", listStr);
        renderAll(); // Vuelve a renderizar la lista actualizada
    }
}

function updateTask(pos) {
    let list = localStorage.getItem("list")
    let listJson = JSON.parse(list)
    let task = listJson[pos]
    if (task.status === "TODO") {
        task.status = "DOING"
    } else if (task.status === "DOING") {
        task.status = "DONE"
    }

    let taskList = []
    for (let i = 0; i < listJson.length; i++) {
        const obj = listJson[i]
        const objTask = new Task(obj.desc, obj.status)
        taskList.push(objTask)
    }
    const listStr = JSON.stringify(taskList)
    localStorage.setItem("list", listStr)
    renderAll()
}

function rojoTask(pos) {
    let list = localStorage.getItem("list")
    let listJson = JSON.parse(list)
    let task = listJson[pos]
    if (task.status === "DONE") {
        task.status = "DOING"
    } else if (task.status === "DOING") {
        task.status = "TODO"
    }

    let taskList = []
    for (let i = 0; i < listJson.length; i++) {
        const obj = listJson[i]
        const objTask = new Task(obj.desc, obj.status)
        taskList.push(objTask)
    }
    const listStr = JSON.stringify(taskList)
    localStorage.setItem("list", listStr)
    renderAll()
}

renderAll()



