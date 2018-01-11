const { Router } = require('express');
const controller = require('./admin-controller');

const attach = (app, apartmentRepository) => {
    // @ts-ignore
    const router = new Router();
    router
        .get('/', (req, res) => {
            controller.showAdminPanel(apartmentRepository, req, res);
        });
    app.use('/admin', router);
};

module.exports = attach;
