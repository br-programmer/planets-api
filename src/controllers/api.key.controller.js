const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const apiKeysFile = path.join(__dirname, '../data/api_keys.json');

const generateApiKey = (req, res) => {
    const owner = req.user?.username;
    const { name } = req.body;

    if (!owner) {
        return res.status(401).json({ error: 'Invalid user in token' });
    }

    if (!name || name.trim().length < 3) {
        return res.status(400).json({ error: 'API Key name must be at least 3 characters' });
    }

    try {
        const newKey = crypto.randomBytes(16).toString('hex');
        const newEntry = {
            key: newKey,
            name: name.trim(),
            owner,
            createdAt: new Date().toISOString()
        };

        let keys = [];
        if (fs.existsSync(apiKeysFile)) {
            const data = fs.readFileSync(apiKeysFile, 'utf-8');
            keys = JSON.parse(data);
        }


        const alreadyExists = keys.some(k => k.owner === owner && k.name === name.trim());
        if (alreadyExists) {
            return res.status(409).json({ error: 'You already have an API Key with this name' });
        }

        keys.push(newEntry);
        fs.writeFileSync(apiKeysFile, JSON.stringify(keys, null, 2));

        res.status(201).json({ apiKey: newKey });
    } catch (err) {
        console.error('API Key generation error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};



const listApiKeys = (req, res) => {
    const owner = req.user?.username;

    if (!owner) {
        return res.status(401).json({ error: 'Invalid user in token' });
    }

    try {
        let keys = [];
        if (fs.existsSync(apiKeysFile)) {
            const data = fs.readFileSync(apiKeysFile, 'utf-8');
            keys = JSON.parse(data);
        }

        const userKeys = keys.filter(entry => entry.owner === owner);

        res.status(200).json({ keys: userKeys });
    } catch (err) {
        console.error('List API Keys error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = { generateApiKey, listApiKeys };
