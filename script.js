const input = document.getElementById("text")
const lista = document.getElementById("lista")

let tasks = []

const removeChilds = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}

function renderTasks() {
    removeChilds(lista)
    for (const [index, task] of tasks.entries()) {
        const element = document.createElement("li")

        const deleteButton = document.createElement("i")
        deleteButton.classList = "fa-solid fa-xmark delete"
        deleteButton.addEventListener("click", (_ev) => {
            tasks.splice(index, 1)
            renderTasks()
        })

        element.appendChild(deleteButton)

        const checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.checked = task.complete
        checkbox.addEventListener("change", (_ev) => {
            tasks[index].complete = checkbox.checked
        })

        element.appendChild(checkbox)

        element.append(task.text)
        lista.appendChild(element)
    }
}

function deleteAllTasks() {
    tasks = []
    renderTasks()
}

function addTask(event) {
    event.preventDefault()
    let text = input.value
    if (text === "") {
        alert("Il valore da inserire non può essere vuoto")
        return
    }

    input.value = ""
    tasks.push({
        text,
        complete: false
    })
    renderTasks()
}