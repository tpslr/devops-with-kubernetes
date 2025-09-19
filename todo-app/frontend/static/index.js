
const dummyTodos = [
    {
        title: "First todo",
        content: "This is the content of the first todo.",
        color: "blueviolet"
    },
    {
        title: "Second todo",
        content: "This is the content of the second todo.",
        color: "coral"
    },
    {
        title: "Third todo",
        content: "Content for the third todo goes here. It might include various details and information relevant to the task.",
        color: "lightseagreen"
    },
    {
        title: "todo without content",
        content: "",
        color: "steelblue"
    },
    {
        title: "A todo without content but a much longer title to see that text wraps",
        content: "",
        color: "brown"
    }
];

async function loadTodos()
{
    const todosContainer = document.querySelector("section#todos");

    const todos = dummyTodos; // Replace with actual fetch call to load todos from backend

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


(async () => {
    await loadTodos();
    document.querySelector("div#loading-wrap").style.display = "none";
})();
