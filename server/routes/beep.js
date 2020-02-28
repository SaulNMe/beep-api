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
        .exec((err, beeps) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Beep.countDocuments((err, total_recors) => {
                res.json({
                    ok: true,
                    beeps,
                    total_recors
                })
            });
        });
});

app.post('/beep', (req, res) => {
    let { username } = req.body;
    let beep = new Beep({
        username
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