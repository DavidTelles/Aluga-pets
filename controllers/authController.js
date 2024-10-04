const bcrypt = require('bcrypt');

const users = [];

exports.register = async (req, res) => {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ email, password: hashedPassword });
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(400).json({ message: 'Usuário não encontrado!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Senha incorreta!' });
    }

    res.status(200).json({ message: 'Login bem-sucedido!' });
};