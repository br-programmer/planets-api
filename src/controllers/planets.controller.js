const planets = require('../data/planets.json');

const getAllPlanets = (req, res) => {
    const lang = req.lang || 'en';

    try {
        const result = planets.map(p => {
            const { name, highlight, image } = p[lang];
            return {
                id: p.id,
                name,
                highlight,
                image
            };
        });

        res.status(200).json(result);
    } catch (err) {
        console.error('Error retrieving planets:', err);
        res.status(500).json({ error: 'Failed to retrieve planets' });
    }
};


const getPlanetById = (req, res) => {
    const lang = req.lang || 'en';
    const planet = planets.find(p => p.id === req.params.id);

    if (!planet) {
        return res.status(404).json({ error: 'Planet not found' });
    }

    try {
        const { name, highlight, image } = planet[lang];

        res.status(200).json({
            id: planet.id,
            name,
            highlight,
            image,
            ...planet.details,
            atmosphere_composition: planet.details.atmosphere_composition[lang],
            description: planet.details.description[lang]
        });
    } catch (err) {
        console.error(`Error retrieving planet ${req.params.id}:`, err);
        res.status(500).json({ error: 'Failed to retrieve planet' });
    }
};


module.exports = { getAllPlanets, getPlanetById };