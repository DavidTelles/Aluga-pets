const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

let users = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    const user = users.find(user => user.email === email);
    if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            res.send("Login bem-sucedido!");
        } else {
            res.send("Senha incorreta.");
        }
    } else {
        res.send("Usuário não encontrado.");
    }
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.send("Usuário já existe.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ name, email, password: hashedPassword });
    res.send("Usuário registrado com sucesso!");
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
