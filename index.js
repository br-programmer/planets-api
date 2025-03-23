require('dotenv').config();
const app = require('./src/app');
const PORT = process.env.PORT || 3000;
const setupSwagger = require('./swagger');

setupSwagger(app);

app.listen(PORT, () => {
    console.log(`API running at ${PORT}`);
});
