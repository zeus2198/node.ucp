/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */
import db from '../initialize.js';

export default (req, res) => {
    db.getIndexStats().then((result) => {
        res.json(result);
    }).catch((error) => {
        res.status(500).end();
    });
};