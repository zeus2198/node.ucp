import db from '../initialize.js';

export default (req, res) => { 
    db.getUserSummary(req.params.id).then((stats) => {
        res.json(stats);
    }).catch((error) => {
        res.status(error == 1 ? 404 : 500).end();
    });
};