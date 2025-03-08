let todoList = {};

function additem() {
    let newTodo = document.getElementById("input").value.trim();
    let idvalue = "id" + Math.ceil(Math.random() * 100000);
    
    if (!newTodo) {
        alert("Please enter a todo");
        return;
    }

    todoList[idvalue] = newTodo;
    createTodoElement(idvalue, newTodo);
    document.getElementById("input").value = "";
    saveItems();
}

function createTodoElement(id, text) {
    const li = document.createElement("li");
    li.id = id;
    li.innerHTML = `
        <div class="todo">
            <div>
                <input type="checkbox" id="check${id}">
                <label for="check${id}"> ${text}</label>
            </div>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    const checkbox = li.querySelector('input[type="checkbox"]');
    const label = li.querySelector('label');
    const deleteBtn = li.querySelector('.delete-btn');

    checkbox.onchange = () => {
        label.classList.toggle('checked', checkbox.checked);
    };

    deleteBtn.onclick = () => {
        li.remove();
        delete todoList[id];
        saveItems();
    };

    document.getElementById("todoListItems").appendChild(li);
}

function saveItems() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    document.getElementById("saveButton").style.display = 
        Object.keys(todoList).length === 0 ? "none" : "block";
}

function load() {
    const storedTodoList = localStorage.getItem("todoList");
    if (!storedTodoList) return;

    todoList = JSON.parse(storedTodoList);
    Object.entries(todoList).forEach(([id, text]) => {
        createTodoElement(id, text);
    });
}

// Add Enter key support
document.getElementById("input")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        additem();
    }
});

document.addEventListener("DOMContentLoaded", load);
