import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [grade, setGrade] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const response = await axios.get('http://localhost:5000/courses');
    setCourses(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      await axios.put(`http://localhost:5000/courses/${editingIndex}`, { courseName, grade });
    } else {
      await axios.post('http://localhost:5000/courses', { courseName, grade });
    }
    setCourseName('');
    setGrade('');
    setEditingIndex(null);
    fetchCourses();
  };

  const handleEdit = (index) => {
    setCourseName(courses[index].courseName);
    setGrade(courses[index].grade);
    setEditingIndex(index);
  };

  const handleDelete = async (index) => {
    await axios.delete(`http://localhost:5000/courses/${index}`);
    fetchCourses();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Ville Heikkiniemi</h1>
      <h2>TI23A</h2>

      <h3>Omat kurssit</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Kurssin nimi</th>
            <th>Arvosana</th>
            <th>Muokkaa</th>
            <th>Poista</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>{course.courseName}</td>
              <td>{course.grade}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Muokkaa</button>
              </td>
              <td>
                <button onClick={() => handleDelete(index)}>Poista</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Lisää uusi kurssi</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Kurssin nimi"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Arvosana"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          required
          min="0" max="5"
        />
        <button type="submit">{editingIndex !== null ? 'Päivitä kurssi' : 'Lisää kurssi'}</button>
      </form>
    </div>
  );
}

export default App;
