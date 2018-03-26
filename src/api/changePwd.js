/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */

import db from '../initialize.js';
import config from '../config.js';
import verfiySession from '../utils/verifySession';
import verifySession from '../utils/verifySession';

export default (req, res) => {
    req.headers['if-none-match'] = 'no-match-for-this';//prevent express from sending "304 not modified" code which bugs the working of this api route.

    if (typeof req.body.pwd === "undefined")
        return res.status(401).end();

    const pwd = req.body.pwd;
    if (pwd.length < 4 || pwd.length > 64) return res.status(401);
    verifySession(req, res).then(() =>
        db.changePassword(req.cookies.usr, pwd).then(() => 
            res.status(200).end()
        ).catch(() => 
            res.status(500).end()
        )
    ).catch((err) => err ? res.status(500).end() : res.status(401).end());
};