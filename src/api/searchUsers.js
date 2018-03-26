/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */
import db from '../initialize.js';

export default (req, res) => {
    db.searchUsers(req.params.text).then((result) => {
        res.json(result);
    }).catch((error) => {
        error == 1 ? res.json([]) :  res.status(500).end();
    });
};