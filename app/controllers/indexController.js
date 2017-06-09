const Base = require('../common/base');

class IndexController extends Base {
    constructor() {
        this.setRouter('GET', '/getMyData', this,getMyData);
    }

    getMyData(req, res) {

    }
}

module.exports = IndexController;