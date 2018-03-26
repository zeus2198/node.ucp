/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */
import cryptoAsync from '@ronomon/crypto-async';
import crypto from 'crypto';

import db from '../initialize.js';
import config from '../config.js';

export default (req, res) => {
    //check if post data really contains all required variables or not
    if (!(req.body.userName && req.body.password)) return res.status(404).end();    
    //hash password for comparison later on
    cryptoAsync.hash(config.hash, Buffer.from(req.body.password),
        (error, hash) => {
            if (error) throw error;
            db.getUserID(req.body.userName, hash.toString('hex').toUpperCase()).then(
                (userid) => {
                    //create a random unique hash used as session ID
                    cryptoAsync.hash('SHA256', Buffer.from(req.body.userName + crypto.randomBytes(64).toString('hex')),
                        (error, ssid) => {
                            if (error) throw error;
                            ssid = ssid.toString('hex');
                            let expiration = new Date(Date.now() + 2592000000);//30 days from today
                            res.cookie('usr', userid, { expires: expiration });
                            res.cookie('sessionid', ssid, {
                                expires: (req.body.remember ? expiration : 0)
                            });
                            if (req.body.remember) res.cookie('remember', true, { expires: expiration });
                            res.json({ userID: userid });
                            db.createSession(userid, ssid, expiration.getTime());
                        }
                    );
                }
            ).catch((error) => res.status(error == 1 ? 401 : 500).end());
        }
    );
};