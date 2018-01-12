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
            res.send(admin);
        });
    },

};

// @ts-ignore
module.exports = controller;
