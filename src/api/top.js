/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */
import db from '../initialize.js';

export default (req, res) => {
    db.getTopList(req.params.cat).then((result) => {
        res.json(result);
    }).catch((error) => {
        error == 1 ? res.status(404).end() :  res.status(500).end();
    });
};