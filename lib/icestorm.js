'use strict';

function _import (src) {
    src.forEach(function (path) {
        var previousTotal = 0;
        path.forEach(function (hop) {
            hop.total = hop.delay_ns;
            hop.incr = hop.delay_ns - previousTotal;
            hop.type = hop.cell_type;
            hop.element = hop.net ? hop.net.split('$') : [hop.hwnet];
            previousTotal = hop.delay_ns;
        });
    });
    return src;
}

module.exports = {
    import: _import
};
