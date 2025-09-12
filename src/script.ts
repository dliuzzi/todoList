import { addTask, clearTasks, markAllAsComplete, removeCompleted, render } from "./tasks_map"

const input = <HTMLInputElement>document.getElementById("text")
const form = <HTMLFormElement>document.getElementById("form")
const clearButton = <HTMLButtonElement>document.getElementById("clear")
const markAllCompleteButton = <HTMLButtonElement>document.getElementById("markAllComplete")
const removeCompleteButton = <HTMLButtonElement>document.getElementById("removeComplete")
const showCompleteCheckbox = <HTMLInputElement>document.getElementById("showComplete")

let showOnlyComplete = false

interface Todo {
    title: string
}

function fetchTaskList(): Promise<Todo[]> {
    return new Promise((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
            .then((r) => {
                if (!r.ok) {
                    reject('Richiesta fallita')
                } else {
                    return r
                }
            })
            .then((r) => r!.json())
            .then((json) => resolve(json))
            .catch((r) => reject(r))
    })
}

async function addPlaceholderTasks() {
    const tasks = await fetchTaskList()
    for (const task of tasks) {
        addTask(task.title)
    }
    render(showOnlyComplete)
}

addPlaceholderTasks()

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const text = input.value.trim()
    if (text === "") {
        alert("Il valore da inserire non può essere vuoto")
        return
    }

    input.value = ""
    addTask(text)
    render(showOnlyComplete)
})

clearButton.addEventListener("click", (_event) => {
    clearTasks()
    render(showOnlyComplete)
})

markAllCompleteButton.addEventListener("click", (_event) => {
    markAllAsComplete()
    render(showOnlyComplete)
})

removeCompleteButton.addEventListener("click", (_event) => {
    removeCompleted()
    render(showOnlyComplete)
})

showCompleteCheckbox.addEventListener("click", (_event) => {
    showOnlyComplete = showCompleteCheckbox.checked
    render(showOnlyComplete)
})