const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const apiKeysFile = path.join(__dirname, '../data/api_keys.json');

const generateApiKey = (req, res) => {
    const owner = req.user?.username;
    const { name } = req.body;

    if (!owner) {
        return res.status(400).json({ error: 'Invalid user in token' });
    }

    if (!name) {
        return res.status(400).json({ error: 'Missing key name' });
    }

    const newKey = crypto.randomBytes(16).toString('hex');
    const newEntry = {
        key: newKey,
        name,
        owner,
        createdAt: new Date().toISOString()
    };

    let keys = [];
    if (fs.existsSync(apiKeysFile)) {
        const data = fs.readFileSync(apiKeysFile, 'utf-8');
        keys = JSON.parse(data);
    }

    keys.push(newEntry);
    fs.writeFileSync(apiKeysFile, JSON.stringify(keys, null, 2));

    res.status(201).json({ apiKey: newKey });
};


const listApiKeys = (req, res) => {
    const owner = req.user?.username;

    if (!owner) {
        return res.status(400).json({ error: 'Invalid user in token' });
    }

    let keys = [];
    if (fs.existsSync(apiKeysFile)) {
        const data = fs.readFileSync(apiKeysFile, 'utf-8');
        keys = JSON.parse(data);
    }

    const userKeys = keys.filter(entry => entry.owner === owner);

    res.status(200).json({ keys: userKeys });
};

module.exports = { generateApiKey, listApiKeys };
