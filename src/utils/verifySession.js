/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */
//verifies session and re-issues new one
import cryptoAsync from '@ronomon/crypto-async';
import crypto from 'crypto';

import db from '../initialize.js';
import config from '../config.js';

//reject() => authentication failed
//reject(true) => some error occured
//if dontReject = true => 
//  resolve() => authentication failed
//  resolve(userid) => authentication successfull
export default (req, res, dontReject=false) => new Promise((resolve, reject) => {
    //checking if cookies has been set
    if (typeof req.cookies.usr === "undefined" || typeof req.cookies.sessionid === "undefined")
        return  (dontReject ? resolve() : reject());
    db.getSessionUID(req.cookies.usr, req.cookies.sessionid).then(
        (uid) => {
            cryptoAsync.hash('SHA256', Buffer.from(req.cookies.sessionid + crypto.randomBytes(64).toString('hex')),
                (err, ssid) => {
                    if (err) return reject(true);
                    ssid = ssid.toString('hex');
                    res.cookie('sessionid', ssid, {
                        expires: (req.cookies.remember ? new Date(Date.now() + 2592000000) : 0)
                    });
                    dontReject ? resolve(req.cookies.usr) : resolve();
                    db.updateSession(uid, ssid);
                }
            );
        }
    ).catch((error) => error == 1 ? (dontReject ? resolve() : reject()) : reject(true));
});
