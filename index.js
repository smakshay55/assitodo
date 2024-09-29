const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON request bodies

// In-memory todo list
let todos = [
    { id: 1, task: 'Buy groceries', completed: false },
    { id: 2, task: 'Walk the dog', completed: true }
];

// GET /todos: Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// POST /todos: Add a new todo
app.post('/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        task: req.body.task,
        completed: req.body.completed || false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// GET /todos/:id: Get a single todo by ID
app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found');
    res.json(todo);
});

// PUT /todos/:id: Update an existing todo
app.put('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found');

    todo.task = req.body.task || todo.task;
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
    res.json(todo);
});

// DELETE /todos/:id: Delete a todo
app.delete('/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) return res.status(404).send('Todo not found');

    const deletedTodo = todos.splice(todoIndex, 1);
    res.json(deletedTodo);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
