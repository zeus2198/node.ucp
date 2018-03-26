/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
*/

import './utils/exit.hook.js';
import config from './config.js';

const db = require(`./db/${config.databaseAPI}`);
db.initialize();

export default db;