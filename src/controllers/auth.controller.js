const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usersFile = path.join(__dirname, '../data/users.json');
const jwtSecret = process.env.JWT_SECRET;

const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || username.trim().length < 3) {
        return res.status(400).json({ error: 'Username must be at least 3 characters' });
    }

    if (!password || password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    try {
        let users = [];
        if (fs.existsSync(usersFile)) {
            const data = fs.readFileSync(usersFile, 'utf-8');
            users = JSON.parse(data);
        }

        if (users.find(u => u.username === username.trim())) {
            return res.status(409).json({ error: 'User already exists' });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = {
            username: username.trim(),
            passwordHash,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password required' });
    }

    try {
        if (!fs.existsSync(usersFile)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const data = fs.readFileSync(usersFile, 'utf-8');
        const users = JSON.parse(data);
        const user = users.find(u => u.username === username.trim());

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ username: user.username }, jwtSecret, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = { register, login };
