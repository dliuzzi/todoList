import { Citta } from "./citta"

const lista = <HTMLUListElement>document.getElementById("lista")

let tasks = new Map()
let taskId = 0

export function addTask(text: string) {
    const citta = new Citta(text, false)
    tasks.set(taskId, citta)
    taskId++
}

export function removeTask(id: number) {
    tasks.delete(id)
}

export function toggleComplete(id: number, isComplete: boolean) {
    const task = tasks.get(id)
    task.toggleComplete(isComplete)
}

export function markAllAsComplete() {
    for (const task of tasks.values()) {
        task.toggleComplete(true)
    }
}

export function removeCompleted() {
    for (const [id, task] of tasks.entries()) {
        if (task.complete) {
            removeTask(id)
        }
    }
}

export function clearTasks() {
    tasks = new Map()
}

export function render(completeOnly = false) {
    while (lista.lastChild) {
        lista.removeChild(lista.lastChild);
    }
    
    for (const [id, task] of tasks.entries()) {
        if (completeOnly && !task.isComplete()) {
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
        checkbox.checked = task.isComplete()
        checkbox.addEventListener("change", (_ev) => {
            task.toggleComplete(checkbox.checked)
        })

        element.appendChild(checkbox)

        element.append(task.getText())
        lista.appendChild(element)
    }
}