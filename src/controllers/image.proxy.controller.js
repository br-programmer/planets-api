const fetch = require('node-fetch');

const imageProxyController = async (req, res) => {
    const imageUrl = req.query.url;

    if (!imageUrl) {
        return res.status(400).json({ error: 'Missing image URL' });
    }

    try {
        const response = await fetch(imageUrl);
        const contentType = response.headers.get('content-type');

        if (!response.ok || !contentType?.startsWith('image')) {
            return res.status(400).json({ error: 'Invalid image or response' });
        }

        const buffer = await response.arrayBuffer();

        res.setHeader('Content-Type', contentType);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(Buffer.from(buffer));
    } catch (error) {
        console.error('Image proxy error:', error);
        res.status(500).json({ error: 'Failed to proxy image' });
    }
};

module.exports = { imageProxyController };
