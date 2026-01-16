import express from 'express';
import cors from 'cors';
import CyrusDB from './CyrusDB.js';

const app = express();
const db = new CyrusDB();

app.use(cors()); // Crucial for Next.js to talk to Express
app.use(express.json());

// Initialize the table once
db.createTable('users', { name: 'string' });

app.get('/users', (req, res) => {
    // We return the 'rows' array from the JSON
    const data = db.select('users');
    res.json(data);
});

app.post('/users', (req, res) => {
    try {
        const newUser = db.insert('users', req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(4000, () => console.log("Backend running on port 4000"));