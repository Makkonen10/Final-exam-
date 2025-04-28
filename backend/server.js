const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 5000;
const DATA_FILE = 'courses.json';

app.use(cors());
app.use(bodyParser.json());

// Alustetaan data-tiedosto
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, '[]');
}

// Lue kurssit
app.get('/courses', (req, res) => {
  const courses = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(courses);
});

// Lisää uusi kurssi
app.post('/courses', (req, res) => {
  const courses = JSON.parse(fs.readFileSync(DATA_FILE));
  const newCourse = req.body;
  courses.push(newCourse);
  fs.writeFileSync(DATA_FILE, JSON.stringify(courses));
  res.status(201).json(newCourse);
});

// Päivitä kurssi
app.put('/courses/:index', (req, res) => {
  const courses = JSON.parse(fs.readFileSync(DATA_FILE));
  const index = req.params.index;
  courses[index] = req.body;
  fs.writeFileSync(DATA_FILE, JSON.stringify(courses));
  res.json(courses[index]);
});

// Poista kurssi
app.delete('/courses/:index', (req, res) => {
  const courses = JSON.parse(fs.readFileSync(DATA_FILE));
  const index = req.params.index;
  const deleted = courses.splice(index, 1);
  fs.writeFileSync(DATA_FILE, JSON.stringify(courses));
  res.json(deleted[0]);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
