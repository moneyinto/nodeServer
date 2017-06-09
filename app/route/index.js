const IndexController = require('../controllers/indexController');

let routes = [];
routes = routes.concat(new IndexController().routes);

module.exports = routes;