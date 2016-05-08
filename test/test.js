'use strict';

var onml = require('onml'),
    path1 = require('./path1'),
    lib = require('../lib');

describe('test', function () {
    it('path1', function (done) {
        var src = [];
        var res = lib.render(path1);
        var svg = onml.s(res);
        done();
    });
});
