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
        })
        .get('/services', (req, res) => {
            controller.showServices(req, res);
        })
        .get('/contacts', (req, res) => {
            controller.showContacts(req, res);
        })
        .get('/for_us', (req, res) => {
            controller.showForUs(req, res);
        });
    app.use('/', router);
};

module.exports = attach;
