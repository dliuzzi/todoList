const lista = document.getElementById("lista")

let tasks = []

export function addTask(text) {
    tasks.push({
        text,
        complete: false
    })
}

export function removeTask(id) {
    tasks.splice(id, 1)
}

export function toggleComplete(id, isComplete) {
    tasks[id].complete = isComplete
}

export function markAllAsComplete() {
    for (const task of tasks.values()) {
        task.complete = true
    }
}

export function removeCompleted() {
    tasks = tasks.filter((task, _idx, _array) => !task.complete)
}

export function clearTasks() {
    tasks = []
}

export function render(completeOnly = false) {
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