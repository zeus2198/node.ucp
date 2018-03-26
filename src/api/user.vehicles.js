import db from '../initialize.js';

export default (req, res) => { 
    db.getUserVehicles(req.params.id).then((stats) => {
        res.json(stats);
    }).catch((error) => {
        error == 1 ? res.json({}) : res.status(500).end();        
    });
};