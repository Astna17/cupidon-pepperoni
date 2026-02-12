require('dotenv').config();
const express = require('express');
const {Pool} = require('pg');
const PORT = 5000;
const app = express();

app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const calculateLoveScore = (boysName, girlsName) => {
    const combinedNames = (boysName + girlsName).toLowerCase().replace(/\s/g, '');
    
    let score = 0;

    for (let i = 0; i < combinedNames.length; i++) {
        score += combinedNames.charCodeAt(i);
    }

    return score % 101;
};

app.post('/api/love', async (req, res) => {
    const {boysName, girlsName } = req.body;

    if (!boysName || !girlsName) {
        return res.status(400).json({ Error: "Il manque un prénom!"});
    }

    const score = calculateLoveScore(boysName, girlsName);

    try {
        const result = await pool.query(
            'INSERT INTO matches (boys_name, girls_name, score) VALUES ($1, $2, $3) RETURNING *',
            [boysName, girlsName, score]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Erreur serveur");
    }
});

app.listen(PORT, () => console.log(`Serveur sur le port ${PORT}`));