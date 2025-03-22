const express = require('express');
const planetsRoutes = require('./routes/planets.routes');
const languageMiddleware = require('./middleware/language.middleware');

const app = express();
app.use(express.json());

app.use(languageMiddleware);

app.use('/planets', planetsRoutes);

app.get('/', (_, res) => {
    res.status(200).send('🚀 Planets API Ready');
});

module.exports = app;