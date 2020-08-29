const express = require('express');
const pool = require('./pool');
const router = express.Router();

router.get('/', (req, res) => {
    const query = `SELECT * FROM "dummydata";`

    pool.query(query)
        .then((response) => {
            res.send(response.rows)
        })
        .catch((error) => {
            console.log('error fetching dummy data', error);
            res.sendStatus(500);
        })
});

module.exports = router;