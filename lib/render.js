'use strict';

function viewBox (width, height) {
    return ['svg', {
        viewBox: [0, 0, width, height].join(' '),
        width: width,
        height: height,
        xmlns: 'http://www.w3.org/2000/svg'
    }];
}

function step (element, index, dt, dv) {
    var res = ['g'];
    var width = element.incr * dt;
    var x1 = (element.total - element.incr) * dt;
    var y1 = index * dv;
    var x2 = element.total * dt;
    var y2 = (index + 1) * dv;
    if (element.type === 'CELL') {
        res.push(['rect', { x: x1, y: y1, width: width, height: dv, 'fill-opacity': 0.2 }]);
    }
    res.push(['line', { x1: x1, y1: y1, x2: x2, y2: y2, stroke: 'black', 'stroke-width': 3 }]);
    res.push(['text', { x: x2 + 5, y: y2 - 3 }, element.element ]);
    return res;
}

function render (data, options) {
    data = data || [];
    options = options || {};
    var dt = options.dt || 40;
    var dv = options.dv || 20;
    var res = ['g'];
    data.forEach(function (e, i) {
        res.push(step(e, i, dt, dv));
    });
    var width = data[data.length - 1].total * dt + 200;
    var height = data.length * dv + 10;
    var ful = viewBox(width, height);
    ful.push(res);
    return ful;
}

module.exports = render;
