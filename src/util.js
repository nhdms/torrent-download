'use strict';

const crypto = require('crypto');

let id = null;

module.exports.genId = () => {
    if (!id) {
        id = crypto.randomBytes(20);
        Buffer.from('-DU2040-').copy(id, 0);
    }
    return id;
};
