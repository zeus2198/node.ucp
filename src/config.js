/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
*/
import fs from 'fs';

const configPath = './config/config.json';

if (!fs.existsSync(configPath)) {
    console.error("[ERROR] Failed to start server. Reason: Config file not found.");
    process.exit();
}

var config = require('.' + configPath);

//list of mandatory configs
var configs = [
    "host",
    "user",
    "password",
    "database",
    "databaseAPI",
    "hash",
    "secret",
    "appPort"
];
//make sure all configs exists in config file
for (var i = 0; i < configs.length; i++)
    if (!(configs[i] in config)) {
        console.error("[ERROR] Failed to start server. Reason: setting named " + configs[i] + " is missing from configration file!");
        process.exit();
    }

configs = null;// free'ing memory

export default config;