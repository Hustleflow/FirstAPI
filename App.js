const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3005"],
  })
);

let todos = [];

// Get all todos
app.get("/todos", function (req, res) {
  res.json(todos);
});

// Create a new todo
app.post("/todos", function (req, res) {
  const { title } = req.body;
  const newTodo = {
    id: todos.length + 1,
    title,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update an existing todo
app.put("/todos/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  todo.title = title || todo.title;
  todo.completed = completed || todo.completed;
  res.json(todo);
});

// Delete a todo
app.delete("/todos/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }
  todos.splice(index, 1);
  res.sendStatus(204);
});

app.get("/", function (req, res) {
  res.send("Welcome to Coding");
});

app.listen(3001, function () {
  console.log("API server is running on http://localhost:3001");
});
