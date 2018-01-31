const { Router } = require('express');
const controller = require('./home-controller');


const attach = (app, propertyRepository) => {
    // @ts-ignore
    const router = new Router();
    router
        .get('/', (req, res) => {
            controller.showHome(propertyRepository, req, res);
        })
        .get('/usefull', (req, res) => {
            controller.showUsefull(req, res);
        });
    app.use('/', router);
};

module.exports = attach;
