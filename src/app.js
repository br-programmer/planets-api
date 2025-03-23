const express = require('express');
const languageMiddleware = require('./middleware/language.middleware');
const authRoutes = require('./routes/auth.routes')
const authToken = require('./middleware/auth.token');
const apiKeyRoutes = require('./routes/api.key.routes');
const planetsRoutes = require('./routes/planets.routes');
const apiKeyAuth = require('./middleware/api.key.auth');


const app = express();
app.use(express.json());

app.use(languageMiddleware);

app.use('/auth', authRoutes);

app.use('/auth/generate-key', authToken, apiKeyRoutes);

app.use('/planets', apiKeyAuth, planetsRoutes);

module.exports = app;