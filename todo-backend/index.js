const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://iamdevil301:kbvr2003@cluster0.y4nkzqp.mongodb.net/todos?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

const todoSchema = new mongoose.Schema({
    task: String,
});

const Todo = mongoose.model('Todo', todoSchema);

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/todos', async (req, res) => {
    const newTodo = new Todo({
        task: req.body.task,
    });
    await newTodo.save();
    res.json(newTodo);
});

app.delete('/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
