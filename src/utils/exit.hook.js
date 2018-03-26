'use strict';

/*
 * @author : Simran Singh ( simran.singh2198@gmail.com )
*/

// we basically hook exit process here
process.stdin.resume();

function exitHandler(options, err) {
    if (options.cleanup) console.log('\x1b[31m', 'node.ucp is shutting down!', '\x1b[0m');
    if (err) console.error(err.stack);
    if (options.exit) process.exit();
}

process.on('exit', exitHandler.bind(null,{cleanup:true}));

process.on('SIGINT', exitHandler.bind(null, {exit:true}));

process.on('uncaughtException', exitHandler.bind(null, {exit:true}));