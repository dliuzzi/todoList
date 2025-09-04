import { addTask, clearTasks, markAllAsComplete, removeCompleted, render } from "./tasks_map.js"

const input = document.getElementById("text")
const form = document.getElementById("form")
const clearButton = document.getElementById("clear")
const markAllCompleteButton = document.getElementById("markAllComplete")
const removeCompleteButton = document.getElementById("removeComplete")
const showCompleteCheckbox = document.getElementById("showComplete")

let showOnlyComplete = false

form.addEventListener("submit", (event) => {
    event.preventDefault()
    let text = input.value
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