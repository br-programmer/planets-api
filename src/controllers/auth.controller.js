const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usersFile = path.join(__dirname, '../data/users.json');
const jwtSecret = process.env.JWT_SECRET;

const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }

    const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));

    if (users.find(u => u.username === username)) {
        return res.status(409).json({ error: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = {
        username,
        passwordHash,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    res.status(201).json({ message: 'User registered successfully' });
};

const login = async (req, res) => {
    const { username, password } = req.body;

    const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);

    if (!valid) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ username }, jwtSecret, { expiresIn: '1h' });

    res.status(200).json({ token });
};

module.exports = { register, login };
