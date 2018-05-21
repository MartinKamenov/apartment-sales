const controller = {
    showProperty(propertyRepository, req, res) {
        const code = req.params.code;
        propertyRepository.findPropertyByCode(code).then((foundProperties) => {
            if (foundProperties.length !== 1) {
                res.send('More than one apartment has been found with code ' + code);
                return;
            }

            const property = foundProperties[0];
            let pechat = true;
            if (property.place.indexOf('Халкидики') >= 0 || property.place.indexOf('Тасос') >= 0) {
                pechat = false;
            }

            res.render('property', { property, pechat });
        });

    },

};

// @ts-ignore
module.exports = controller;