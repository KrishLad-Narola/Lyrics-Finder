const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
    const { artist, song } = req.query;

    if (!artist || !song) {
        return res.status(400).json({ error: "Artist and song are required" });
    }

    try {
        const url = `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`;
        const response = await axios.get(url);

        res.json({
            lyrics: response.data.lyrics || "No lyrics found"
        });

    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch lyrics. Try another song."
        });
    }
});

module.exports = router;