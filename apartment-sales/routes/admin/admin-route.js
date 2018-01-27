const { Router } = require('express');
const controller = require('./admin-controller');
const multer = require('multer');
const upload = multer({ dest: 'apartment-sales/static/images/added_pictures' });

const attach = (app, adminRepository, apartmentRepository) => {
    // @ts-ignore
    const router = new Router();
    router
        .get('/', (req, res) => {
            controller.showAdminPanel(apartmentRepository, req, res);
        }).post('/', (req, res) => {
            controller.checkAdmin(adminRepository, apartmentRepository, req, res);
        }).get('/add', (req, res) => {
            controller.addProperty(adminRepository, apartmentRepository, req, res);
        }).post('/add', upload.any(), (req, res) => {
            controller.postProperty(adminRepository, apartmentRepository, req, res);
        }).get('/edit', (req, res) => {
            controller.editProperty(adminRepository, apartmentRepository, req, res);
        }).get('/remove', (req, res) => {
            controller.removeProperty(adminRepository, apartmentRepository, req, res);
        }).post('/remove', (req, res) => {
            controller.postRemoveProperty(adminRepository, apartmentRepository, req, res);
        });
    app.use('/admin', router);
};

module.exports = attach;
