#!/usr/bin/env node
'use strict';

var lib = require('../lib'),
  fs = require('fs-extra'),
  yargs = require('yargs'),
  stringify = require('onml/stringify');

var argv = yargs.count('icestorm').argv;
var fileName;

if (argv._.length === 1) {
  fileName = argv._[0];
  fs.readJson(fileName, function (err, src) {
    if (argv.icestorm) {
      src = lib.icestorm.import(src);
    }
    var res = lib.render(src);
    var svg = stringify(res);
    process.stdout.write(svg + '\n');
  });
} else {
  process.stdout.write(JSON.stringify(argv) + '\n');
}

/**/
