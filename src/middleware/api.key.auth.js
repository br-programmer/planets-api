const fs = require('fs');
const path = require('path');
const apiKeysFile = path.join(__dirname, '../data/api_keys.json');

const apiKeyAuth = (req, res, next) => {
    const key = req.headers['x-api-key'];

    if (!key) {
        return res.status(401).json({ error: 'Missing API key' });
    }

    if (!fs.existsSync(apiKeysFile)) {
        return res.status(500).json({ error: 'API keys file not found' });
    }

    const data = fs.readFileSync(apiKeysFile, 'utf-8');
    const keys = JSON.parse(data);
    const valid = keys.some(entry => entry.key === key);

    if (!valid) {
        return res.status(401).json({ error: 'Invalid API key' });
    }

    next();
};

module.exports = apiKeyAuth;
