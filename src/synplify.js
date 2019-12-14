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
            if (line.match('Path information for path number')) {
                // res.push(line);
                state = 'run';
                path = [];
            }
            break;
        case 'run':
            if (line.match('=========================')) {
                state = 'idle';
                res.push(path);
            } else {
                m = line.match(/([\w.\d[\]]+)\s+(\w+)\s+(\w+)\s+(Out)\s+([\d.]+)\s+([\d.]+)/);
                if (m) {
                    path.push({
                        total: Number(m[6]),
                        incr: Number(m[5]),
                        meta: m[3],
                        type: m[2],
                        element: m[1].split('.')
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
