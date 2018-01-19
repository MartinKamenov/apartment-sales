const { Router } = require('express');
const controller = require('./property-controller');


const attach = (app, apartmentRepository) => {
    // @ts-ignore
    const router = new Router();
    router
        .get('/:code', (req, res) => {
            controller.showProperty(apartmentRepository, req, res);
        });
    app.use('/property', router);
};

module.exports = attach;
