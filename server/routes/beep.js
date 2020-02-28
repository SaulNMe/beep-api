const express = require('express');
const Beep = require('../models/beep');
const app = express();

app.get('/beep', (req, res) => {
    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 10;
    limit = Number(limit);
    Beep.find()
        .skip(from)
        .limit(limit)
        .sort({date: 'desc'})
        .exec((err, beeps) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Beep.countDocuments((err, total_records) => {
                res.json({
                    ok: true,
                    beeps,
                    total_records
                })
            });
        });
});

app.post('/beep', (req, res) => {
    let { username, userId } = req.body;
    let beep = new Beep({
        username,
        userId
    });

    beep.save((err, beepDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            beepDB
        })
    });
});

module.exports = app;