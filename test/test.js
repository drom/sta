'use strict';

var onml = require('onml'),
    path1 = require('./path1'),
    lib = require('../lib');
var chai = require('chai');

var expect = chai.expect;

describe('test', function () {
    it('path1', function (done) {
        var res = lib.render(path1);
        expect(res).to.be.an('array');
        var svg = onml.s(res);
        expect(svg).to.be.an('string');
        done();
    });
});

/* eslint-env mocha */
