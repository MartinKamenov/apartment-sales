const controller = {
    showAdminPanel(apartmentRepository, req, res) {
        res.render('admin-login');
    },
    checkAdmin(adminRepository, apartmentRepository, req, res) {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            res.redirect('/');
            return;
        }
        adminRepository.findAdmin(username, password).then((admins) => {
            if (admins.length !== 1) {
                res.redirect('/');
                return;
            }
            const admin = admins[0];
            res.redirect('/admin/add');
        });
    },
    addApartment(adminRepository, apartmentRepository, req, res) {
        res.render('addApartment');
        /*adminRepository.findAdmin(username, password).then((admins) => {

        });*/
    },
    postApartment(adminRepository, apartmentRepository, req, res) {
        res.send(req.body);
        /*adminRepository.findAdmin(username, password).then((admins) => {

        });*/
    }

};

// @ts-ignore
module.exports = controller;
