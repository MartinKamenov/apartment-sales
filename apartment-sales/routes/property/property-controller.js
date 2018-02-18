const controller = {
    showProperty(propertyRepository, req, res) {
        const code = req.params.code;
        propertyRepository.findPropertyByCode(code).then((foundProperties) => {
            if (foundProperties.length !== 1) {
                res.send('More than one apartment has been found with code ' + code);
                return;
            }

            const property = foundProperties[0];

            res.render('property', { property });
        });

    },

};

// @ts-ignore
module.exports = controller;
