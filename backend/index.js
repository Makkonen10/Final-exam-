const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let courses = [];
let idCounter = 1;

// GET all courses
app.get('/courses', (req, res) => {
  res.json(courses);
});

// POST add a course
app.post('/courses', (req, res) => {
  const course = { id: idCounter++, ...req.body };
  courses.push(course);
  res.status(201).json(course);
});

// PUT update a course
app.put('/courses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = courses.findIndex(course => course.id === id);
  if (index !== -1) {
    courses[index] = { id, ...req.body };
    res.json(courses[index]);
  } else {
    res.status(404).send('Course not found');
  }
});

// DELETE a course
app.delete('/courses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  courses = courses.filter(course => course.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
