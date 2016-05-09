'use strict';

function int (val) {
    return Math.round(val);
}

function viewBox (width, height) {
    width = int(width);
    height = int(height);
    return ['svg', {
        viewBox: [0, 0, width, height].join(' '),
        width: width,
        height: height,
        xmlns: 'http://www.w3.org/2000/svg'
    }];
}

function grid (width, height, dt) {
    var res = ['g'];
    var i;
    res.push(['rect', { x: 0, y: 0, width: width, height: height, stroke: '#35f', fill: 'none' }]);
    for (i = 0; i < width; i += dt) {
        res.push(['line', { x1: i, y1: 0, x2: i, y2: height, stroke: '#35f', 'stroke-dasharray': '5, 5' }]);
    }
    return res;
}

function bstep (element, index, dt, dv) {
    var res = ['g'];
    var x1 = int((element.total - element.incr) * dt);
    var y1 = int(index * dv);
    var x2 = int(element.total * dt);
    var y2 = int((index + 1) * dv);
    res.push(['line', { x1: x1, y1: y1, x2: x2, y2: y2, stroke: '#bbb', 'stroke-linecap': 'round', 'stroke-width': 1 }]);
    return res;
}

function step (element, index, dt, dv, state) {
    var res = ['g'];
    var width = element.incr * dt;
    var x1 = int((element.total - element.incr) * dt);
    var y1 = int(index * dv);
    var x2 = int(element.total * dt);
    var y2 = int((index + 1) * dv);
    var path = element.element;
    if (!Array.isArray(path)) {
        path = [path];
    }
    var port = path.pop();

    state.path.forEach(function (e, i) {
        var x = state.start[i].x;
        var y = state.start[i].y;
        if (e !== path[i]) {
            res.push(['rect', {
                x: x,
                y: y,
                width: x1 - x,
                height: y1 - y,
                'fill-opacity': 0.2
            }]);
        }
    });

    var label = [];
    path.forEach(function (e, i) {
        if (e !== state.path[i]) {
            state.start[i] = { x: x1, y: y1 };
            label.push(e);
        }
    });
    label.push(port);

    res.push(['text', { x: x2 + 3, y: y2 - 3 }, label.join(' | ') ]);

    state.path = path;

    if (element.type === 'CELL') {
        res.push(['rect', { x: x1, y: y1, width: width, height: dv, 'fill-opacity': 0.2 }]);
    }

    res.push(['line', { x1: x1, y1: y1, x2: x2, y2: y2, stroke: 'black', 'stroke-linecap': 'round', 'stroke-width': 2 }]);
    // res.push(['text', { x: x2 + 5, y: y2 - 3 }, element.element.toString() ]);
    return res;
}

function render (data, options) {
    data = data || [[]];
    options = options || {};
    var data0 = data.shift();
    var dt = options.dt || 50;
    var dv = options.dv || 20;
    var res = ['g', { transform: 'translate(0.5,0.5)' }];

    data.forEach(function (path) {
        path.forEach(function (e, i) {
            res.push(bstep(e, i, dt, dv));
        });
    });

    var state = { path: [], start: [] };
    data0.forEach(function (e, i) {
        res.push(step(e, i, dt, dv, state));
    });
    var width = int(data0[data0.length - 1].total * dt);
    var height = int(data0.length * dv);
    res.push(grid(width, height, dt));
    var ful = viewBox(width  + 150, height + 10);
    ful.push(res);
    return ful;
}

module.exports = render;
