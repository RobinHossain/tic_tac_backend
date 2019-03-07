/**
 * Import Model Data
 */
const Game = require('../models/game');

/**
 * Get Game Data By Browser Storage ID
 * @param req
 * @param res
 * @param next
 */
exports.get = function (req, res, next) {
    const browser_id = req.params.browser_id;
    Game.findOne({browser_id: browser_id}).exec(function (err, gameData) {
        if (err){console.log(err);}
        return res.status(200).json({ data: gameData });
    })
}

/**
 * Save Action for each stage of Game
 * @param req
 * @param res
 * @param next
 */
exports.save = function (req, res, next) {
    const gData = req.body;

    if (!gData.history) {
        return res.status(422).send({ error: 'Please input the require data' });
    }

    if (!gData.browser_id) {
        return res.status(422).send({ error: 'Please input the require data' });
    }

    Game.update({browser_id: gData.browser_id}, gData, {upsert: true, setDefaultsOnInsert: true}, function (err, updatedData) {
        if (err){console.log(err);}
        return res.status(200).json({ status: 'updated' });
    });
}
