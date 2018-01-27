const { Router } = require('express');
const controller = require('./property-controller');


const attach = (app, propertyRepository) => {
    // @ts-ignore
    const router = new Router();
    router
        .get('/:code', (req, res) => {
            controller.showProperty(propertyRepository, req, res);
        });
    app.use('/property', router);
};

module.exports = attach;
