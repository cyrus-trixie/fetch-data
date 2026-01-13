import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json()); 

// my "Small Database"
let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
];

// Route to get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Route to add a new user
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name 
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));