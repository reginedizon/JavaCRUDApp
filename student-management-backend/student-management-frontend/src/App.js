import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const [students, setStudents] = useState([]);
    const [name, setName] = useState("");
    const [math, setMath] = useState("");
    const [science, setScience] = useState("");
    const [english, setEnglish] = useState("");

    const fetchStudents = async () => {
        try {
            const res = await axios.get("http://localhost:3001/students"); // Future use
            setStudents(res.data);
        } catch (err) {
            console.error("Failed to fetch students", err.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/add", {
                name,
                math: parseInt(math),
                science: parseInt(science),
                english: parseInt(english),
            });

            alert("Student added successfully!");
            setName("");
            setMath("");
            setScience("");
            setEnglish("");
            fetchStudents(); // for later
        } catch (err) {
            alert("Failed to add student.");
            console.error(err.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Student Management System</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group><Form.Label>Name</Form.Label><Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required /></Form.Group>
                <Form.Group><Form.Label>Math</Form.Label><Form.Control type="number" value={math} onChange={(e) => setMath(e.target.value)} required /></Form.Group>
                <Form.Group><Form.Label>Science</Form.Label><Form.Control type="number" value={science} onChange={(e) => setScience(e.target.value)} required /></Form.Group>
                <Form.Group><Form.Label>English</Form.Label><Form.Control type="number" value={english} onChange={(e) => setEnglish(e.target.value)} required /></Form.Group>
                <Button className="mt-3" type="submit">Add Student</Button>
            </Form>
        </div>
    );
};

export default App;