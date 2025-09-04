const lista = document.getElementById("lista")

let tasks = new Map()
let taskId = 0

function addTask(text) {
    tasks.set(taskId, {
        text,
        complete: false
    })
    taskId++
}

function removeTask(id) {
    tasks.delete(id)
}

function toggleComplete(id, isComplete) {
    const task = tasks.get(id)
    task.complete = isComplete
}

function markAllAsComplete() {
    for (const task of tasks.values()) {
        task.complete = true
    }
}

function removeCompleted() {
    for (const [id, task] of tasks.entries()) {
        if (task.complete) {
            removeTask(id)
        }
    }
}

function clearTasks() {
    tasks = new Map()
}

function render(completeOnly = false) {
    while (lista.lastChild) {
        lista.removeChild(lista.lastChild);
    }
    
    for (const [id, task] of tasks.entries()) {
        if (completeOnly && !task.complete) {
            continue
        }
        
        const element = document.createElement("li")

        const deleteButton = document.createElement("i")
        deleteButton.classList = "fa-solid fa-xmark delete"
        deleteButton.addEventListener("click", (_ev) => {
            removeTask(id)
            render()
        })

        element.appendChild(deleteButton)

        const checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.checked = task.complete
        checkbox.addEventListener("change", (_ev) => {
            toggleComplete(id, checkbox.checked)
        })

        element.appendChild(checkbox)

        element.append(task.text)
        lista.appendChild(element)
    }
}