const { Router } = require('express');
const controller = require('./home-controller');


const attach = (app, apartmentRepository) => {
    // @ts-ignore
    const router = new Router();
    router
        .get('/', (req, res) => {
            controller.showHome(apartmentRepository, req, res);
        })
        .post('/', (req, res) => {
            controller.searchProperties(apartmentRepository, req, res);
        });
    app.use('/', router);
};

module.exports = attach;
