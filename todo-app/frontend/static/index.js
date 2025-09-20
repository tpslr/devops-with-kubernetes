/**
 * @typedef Todo
 * @property {string} id
 * @property {string} title
 * @property {string} content
 * @property {string} color
 */

const colors = [
    "blueviolet",
    "brown",
    "coral",
    "darkorchid",
    "darkslateblue",
    "olivedrab",
    "teal",
    "steelblue",
    "seagreen",
    "slateblue",
    "mediumslateblue",
    "darkslategray",
    "seagreen",
    "mediumseagreen",
    "lightseagreen",
]

async function loadTodos() {
    const todosContainer = document.querySelector("section#todos");

    const req = await fetch("/api/todos");

    if (!req.ok) {
        console.error("Failed to load todos from backend, status code:", req.status);
        return;
    }

    /** @type {Todo[]} */
    const todos = await req.json();

    addTodosToDOM(todos);
}


function addTodosToDOM(/** @type {Todo[]} */ todos) {
    const todosContainer = document.querySelector("section#todos");

    for (const todo of todos) {
        const todoElement = document.importNode(document.querySelector("template#todo-template").content, true);
        todoElement.querySelector(".todo-box").style.setProperty("--color", todo.color);
        todoElement.querySelector(".title").textContent = todo.title;
        todoElement.querySelector(".todo-content").textContent = todo.content;
        if (!todo.content) {
            todoElement.querySelector(".todo-box").classList.add("no-content");
        }
        todosContainer.appendChild(todoElement);
    }
}

async function createTodo() {
    // show loading spinner
    document.querySelector("div#loading-wrap").style.display = "unset";


    /** @type {HTMLTextAreaElement} */
    const input = document.querySelector("textarea#todo-input");

    const [title, content] = input.value.split("\n");

    const color = colors[Math.floor(Math.random() * colors.length)];

    const req = await fetch("/api/todo", { 
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            title, 
            content,
            color
        }),
    });
    
    if (!req.ok) {
        console.error("Failed to create todo, status code:", req.status);
        return;
    }

    /** @type {Todo} */
    const todo = await req.json();

    addTodosToDOM([todo]);
    
    // reset input
    input.value = "";
    input.style.height = "auto";

    // hide loading spinner
    document.querySelector("div#loading-wrap").style.display = "none";
}


function onTypeInput(/**@type {InputEvent} */ event) {
    /** @type {HTMLTextAreaElement} */
    const target = event.target;

    // Limit to 2 lines (and create todo as this was the second enter)
    if (target.value.split("\n").length > 2) {
        target.value = target.value.split("\n").slice(0, 2).join("\n");

        createTodo();
    }

    // Auto-resize textarea height based on content
    target.style.height = 'auto';
    target.style.height = (Math.ceil(target.scrollHeight)) + 'px';
}


(async () => {
    document.querySelector("textarea#todo-input").addEventListener("input", onTypeInput);
    await loadTodos();
    document.querySelector("div#loading-wrap").style.display = "none";
})();
