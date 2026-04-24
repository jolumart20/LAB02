const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const SECRET_KEY = 'mi_clave_secreta_super_segura';

const user = {
    id: 1,
    username: 'jose',
    password: 'password123'
}

const user2 = {
    id: 2,
    username: 'luis',
    password: 'password123'
}

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === user.username && password === user.password) {
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
    }
});

app.post('/login2', (req, res) => {
    const { username, password } = req.body;

    if (username === user2.username && password === user2.password) {
        const token = jwt.sign({ id: user2.id }, SECRET_KEY, { expiresIn: '1m' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
    }
});

const verifyToken = require('./middleware/atuth');

app.get('/dashboard', verifyToken, (req, res) => {
    res.json({ message: 'Bienvenido al dashboard - Excelente dia Jose Luis Martinez Rojas-TFS!' });
});

app.get('/public', verifyToken, (req, res) => {
    res.json({message: 'Ruta publica - Jose Luis Martinez Rojas-TFS!'});
});

app.get('/', (req, res) => {
  res.send('Hola mundo Jose Luis Martinez Rojas-TFS!');
});

app.get('/steal', (req, res) => {
    console.log('Token robado:', req.query.token);
    res.json({ message: 'Token robado' });
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});