const Base = require('../common/base');

class IndexController extends Base {
    constructor() { 
        super();
        this.setRouter('GET', '/getMyData', this.getMyData);
    }

    getMyData(req, res) {
        res.json(11111)
    }
}

module.exports = IndexController;