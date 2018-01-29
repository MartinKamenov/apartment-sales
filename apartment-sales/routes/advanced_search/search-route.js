const { Router } = require('express');
const controller = require('./search-controller');

const attach = (app, propertyRepository) => {
    // @ts-ignore
    const router = new Router();
    router
        .get('/', (req, res) => {
            controller.showSearch(propertyRepository, req, res);
        });
    app.use('/advanced_search', router);
};

module.exports = attach;
