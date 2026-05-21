import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    department: ''
  });

  const API_URL = `${window.location.protocol}//${window.location.hostname}:8081/employees`;

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(API_URL);
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveEmployee = async () => {
    try {
      await axios.post(API_URL, form);

      setForm({
        name: '',
        email: '',
        department: ''
      });

      fetchEmployees();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">

      <div className="card">
        <h1>Employee Management</h1>

        <div className="form-group">
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Department"
            value={form.department}
            onChange={(e) =>
              setForm({ ...form, department: e.target.value })
            }
          />

          <button onClick={saveEmployee}>
            Add Employee
          </button>
        </div>
      </div>

      <div className="employee-section">
        <h2>Employees</h2>

        <div className="employee-grid">
          {employees.map((emp) => (
            <div className="employee-card" key={emp.id}>
              <h3>{emp.name}</h3>
              <p>{emp.email}</p>
              <span>{emp.department}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default App;
