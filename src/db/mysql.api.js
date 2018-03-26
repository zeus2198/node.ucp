'use strict';

/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
 */

import mysql from 'mysql2';
import config from '../config.js';
import DBAPI from './db.api.abstract';

import cryptoAsync from '@ronomon/crypto-async';

class MySQLAPI extends DBAPI {
    static query() {
        // wrapper function taken from http://stackoverflow.com/questions/17015590/node-js-mysql-needing-persistent-connection
        // little tweaks made by me 
        var sql_args = [];
        var args = Array.prototype.slice.call(arguments);

        var callback = args[args.length - 1]; //last arg is callback
        this.pool.getConnection((err, connection) => {
            if (err) {
                console.error(`Unable to make connection to DB.`, err);
                return callback(err);
            }
            if (args.length > 2) {
                sql_args = args[1];
            }
            connection.query(args[0], sql_args, (err, results) => {
                connection.release();
                if (err) {
                    console.error(`Error in query: ${args[0]}\n${err}`);
                    return callback(err);
                }
                callback(null, results);
            });
        });
    }

    static initialize() {
        return new Promise((resolve, reject) => {
            this.pool = mysql.createPool({
                connectionLimit: 100,
                host: config.host,
                user: config.user,
                password: config.password,
                database: config.database
            });
            resolve();
        });
    }

    static getIndexStats() {
        return new Promise((resolve, reject) => {
            MySQLAPI.query("SELECT FORMAT(70021, 0) as stat1, FORMAT(300456, 0) as stat2, FORMAT(54681, 0) as stat3", [],
                (error, result) => {
                    if (error) {
                        reject(0);
                        return;
                    }
                    resolve(result[0]);
                }
            );
        });
    }

    static getSessionUID(userid, session) {
        return new Promise((resolve, reject) => {
            MySQLAPI.query("SELECT id FROM ucp_sessions WHERE userID=? AND ssid=? AND expiry >= (UNIX_TIMESTAMP() * 1000)", [userid, session],
                (error, result) => {
                    if (error) {
                        reject(0);
                        return;
                    }
                    if (result.length) resolve(result[0].id);
                    else reject(1); // session not found
                }
            );
        });
    }

    static updateSession(id, session) {
        return new Promise((resolve, reject) => {
            MySQLAPI.query("UPDATE ucp_sessions SET ssid=? WHERE id=?", [session, id],
                (error, result) => {
                    if (error) {
                        reject();
                        return;
                    }
                    resolve();
                }
            );
        });
    }

    static createSession(userID, session, expiry) {
        return new Promise((resolve, reject) => {
            MySQLAPI.query("INSERT INTO ucp_sessions (userID, ssid, expiry) VALUES (?, ?, ?)", [userID, session, expiry],
                (error, result) => {
                    if (error) {
                        reject();
                        return;
                    }
                    resolve();
                }
            );
        });
    }

    static getUserID(name, password) {
        return new Promise((resolve, reject) => {
            MySQLAPI.query("SELECT `id` FROM accounts WHERE name=? AND `password`=?", [name, password],
                (error, result) => {
                    if (error) {
                        reject(0);
                        return;
                    }
                    if (!result.length) {
                        reject(1); // wrong password / username
                        return;
                    }
                    resolve(result[0].id);
                }
            );
        });
    }

    static getUserSummary(userid) {
        return new Promise((resolve, reject) => {
            MySQLAPI.query("SELECT id, name, score, adminLevel, FORMAT(cash,0) as cash, rank, banned, vipExpire, registered, lastLogin FROM accounts WHERE id=? LIMIT 1", [userid],
                (error, result) => {
                    if (error) {
                        reject(0);
                        return;
                    }
                    if (!result.length) {
                        reject(1); // user not found
                        return;
                    }
                    resolve(result[0]);
                }
            );
        });
    }

    static getUserStats(userid) {
        return new Promise((resolve, reject) => {
            MySQLAPI.query("SELECT kills, deaths, ROUND(kills/deaths, 2) as kdr, clan, jobsDone, racesWon, bounty, achs, ROUND(onlineTime/3600, 2) as onlineTime FROM accounts WHERE id=? LIMIT 1", [userid],
                (error, result) => {
                    if (error) {
                        reject(0);
                        return;
                    }
                    if (!result.length) {
                        reject(1); // user not found
                        return;
                    }
                    resolve(result[0]);
                }
            );
        });
    }

    static getUserVehicles(userid) {
        return new Promise((resolve, reject) => {
            MySQLAPI.query("SELECT * FROM vehicles WHERE uid=?", [userid],
                (error, result) => {
                    if (error) {
                        reject(0);
                        return;
                    }
                    if (!result.length) {
                        reject(1); // no vehicle entries
                        return;
                    }
                    resolve(result);
                }
            );
        });
    }

    static searchUsers(text) {
        return new Promise((resolve, reject) => {
            MySQLAPI.query("SELECT id,name,score,adminLevel FROM accounts WHERE name LIKE ?", [`%${text}%`],
                (error, result) => {
                    if (error) {
                        reject(0);
                        return;
                    }
                    if (!result.length) {
                        reject(1); // no search results
                        return;
                    }
                    resolve(result);
                }
            );
        });
    }

    static getTopList(category) {
        return new Promise((resolve, reject) => {
            let select;
            const cat = category.toLowerCase();
            switch (cat) {
                case 'score':
                case 'kills':
                case 'deaths':
                case 'cash':
                    select = cat;
                    break;
                case 'races':
                    select = 'racesWon';
                case 'kd':
                    select = 'ROUND(kills/deaths, 2)';
                    break;
                case 'onlinetime':
                    select = 'onlineTime';
                    break;
                default:
                    reject(1);
                    return;
            }
            MySQLAPI.query(`SELECT id,name,${select} as val FROM accounts order by val desc limit 30`, [],
                (error, result) => {
                    if (error) {
                        reject(0);
                        return;
                    }
                    resolve(result);
                }
            );
        });
    }

    static getProperties() {
        return new Promise((resolve, reject) => {
            MySQLAPI.query("SELECT * FROM Properties", [],
                (error, result) => {
                    if (error) {
                        reject(0);
                        return;
                    }
                    resolve(result);
                }
            );
        });
    }

    static changePassword(uid, newPwd) {
        return new Promise((resolve, reject) => {
            cryptoAsync.hash(config.hash, Buffer.from(newPwd),
                (error, hash) => {
                    if (error) {
                        reject(0);
                        return;
                    }
                    MySQLAPI.query("UPDATE accounts SET password=? WHERE id=? LIMIT 1", [hash.toString('hex').toUpperCase(), uid],
                        error => {
                            if (error) {
                                reject(0);
                                return;
                            }
                            resolve();
                        }
                    );
                });

        });
    }
    static deleteSession(uid, session) {
        return new Promise((resolve, reject) => {
            MySQLAPI.query("DELETE from ucp_sessions WHERE userID=? AND ssid=? LIMIT 1", [uid, session],
                error => {
                    if (error) {
                        reject(0);
                        return;
                    }
                    resolve();
                }
            );
        });
    }

}

export default MySQLAPI;