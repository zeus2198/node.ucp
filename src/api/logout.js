/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */
import verifySession from '../utils/verifySession';
import db from '../initialize.js';

export default (req, res) => {
    if (typeof req.cookies.usr === "undefined" || typeof req.cookies.sessionid === "undefined")
        return res.status(401).end();
    db.deleteSession(req.cookies.usr, req.cookies.sessionid).then(() => {
        res.clearCookie('sessionid');
        res.status(200).end();
    }
    ).catch((err) =>
        err ? res.status(500).end() : res.status(401).end()
    );
};