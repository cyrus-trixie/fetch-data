import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;

// Data (Your "Database")
const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Cyrus Ngugi' }
];

app.use(cors());
app.use(express.json()); // Good habit: allows your server to read JSON sent from React

// The Endpoint
app.get('/users', (req, res) => {
    res.json(users); // Sends the actual array as JSON
});

app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Server is running on port ${PORT}`);
    } else {
        console.error("Server failed to start:", error);
    }
});