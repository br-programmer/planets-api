const express = require('express');
const languageMiddleware = require('./middleware/language.middleware');
const authRoutes = require('./routes/auth.routes');
const apiKeyRoutes = require('./routes/api.key.routes');
const planetsRoutes = require('./routes/planets.routes');

const app = express();
app.use(express.json());

app.get('/', (_, res) => {
    res.status(200).json({ status: 'OK', message: '🚀 Planets API is running!' });
});

app.use(languageMiddleware);

app.use('/auth', authRoutes);
app.use('/api-key', apiKeyRoutes);
app.use('/planets', planetsRoutes);

module.exports = app;
