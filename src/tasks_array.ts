const lista = <HTMLUListElement>document.getElementById("lista")

let tasks: Citta[] = []

class Citta {
    constructor(private text: string, private complete: boolean) {}

    getText() {
        return this.text
    }

    isComplete() {
        return this.complete
    }

    toggleComplete(isComplete: boolean) {
        this.complete = isComplete
    }
}

export function addTask(text: string) {
    const citta = new Citta(text, false)
    tasks.push(citta)
}

export function removeTask(id: number) {
    tasks.splice(id, 1)
}

export function toggleComplete(id: number, isComplete: boolean) {
    tasks[id]!.toggleComplete(isComplete)
}

export function markAllAsComplete() {
    for (const task of tasks.values()) {
        task.toggleComplete(true)
    }
}

export function removeCompleted() {
    tasks = tasks.filter((task, _idx, _array) => !task.isComplete())
}

export function clearTasks() {
    tasks = []
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