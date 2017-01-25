#!/usr/bin/env node
'use strict';

var fs = require('fs-extra'),
    yargs = require('yargs');

var argv = yargs.argv;
var fileName;

function parse (data) {
    var res = [];
    var arr = data.split('\n');
    var state = 'idle';
    var path;
    arr.forEach(function (line) {
        var m;
        switch (state) {
        case 'idle':
            if (line.match('uTco')) {
                // res.push(line);
                state = 'run';
                path = [];
            }
            break;
        case 'run':
            if (line.match('Data Required Path')) {
                state = 'idle';
                res.push(path);
            } else {
                m = line.match(/.+:\s+([0-9.]+)\s+([0-9.]+)\s+([A-Z]+)\s+([A-Z]+)\s+(.+)/);
                if (m) {
                    path.push({
                        total: Number(m[1]),
                        incr: Number(m[2]),
                        meta: m[3],
                        type: m[4],
                        element: m[5].split('|')
                    });
                }
            }
            break;
        }
    });
    return res;
}

if (argv._.length === 1) {
    fileName = argv._[0];
    fs.readFile(fileName, 'utf8', function (err, data) {
        if (err) {
            throw err;
        }
        var res = parse (data);
        process.stdout.write(JSON.stringify(res, null, 2));
    });
} else {
    process.stdout.write(JSON.stringify(argv) + '\n');
}
