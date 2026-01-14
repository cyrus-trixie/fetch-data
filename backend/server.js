import express from 'express';
import cors from 'cors';
import CyrusDB from './CyrusDB.js';

const app = express();
const db = new CyrusDB();

app.use(cors());
app.use(express.json());

// Initialize the table rules (Schema)
db.createTable('users', { 
    name: 'string' 
});

app.post('/users', (req, res) => {
    try {
        // req.body is what comes from your React form
        const newUser = db.insert('users', req.body);
        res.status(201).json(newUser);
    } catch (error) {
        // This catches the "Schema Validation" error we wrote
        res.status(400).json({ error: error.message });
    }
});

app.get('/users', (req, res) => {
    const users = db.select('users');
    res.json(users);
});

app.listen(4000, () => console.log("Server running on port 4000"));