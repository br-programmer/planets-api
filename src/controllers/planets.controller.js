const planets = require('../data/planets.json');

const getAllPlanets = (req, res) => {
    const lang = req.lang;
    const result = planets.map(p => {
        const { name, highlight, image } = p[lang];
        return {
            id: p.id,
            name,
            highlight,
            image
        };
    });
    res.json(result);
};

const getPlanetById = (req, res) => {
    const lang = req.lang;
    const planet = planets.find(p => p.id === req.params.id);

    if (!planet) {
        return res.status(404);
    }

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
};

module.exports = { getAllPlanets, getPlanetById };