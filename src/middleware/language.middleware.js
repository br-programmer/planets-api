const languageMiddleware = (req, res, next) => {
    const langHeader = req.headers['x-lang']?.toLowerCase() ?? 'en';
    const supportedLangs = ['en', 'es'];

    if (!supportedLangs.includes(langHeader)) {
        return res.status(400).json({
            error: `Invalid language '${langHeader}'. Supported: 'en', 'es'`
        });
    }

    req.lang = langHeader;
    next();
};

module.exports = languageMiddleware;