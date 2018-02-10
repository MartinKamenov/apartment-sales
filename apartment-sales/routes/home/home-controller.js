const pageHandler = require('../../models/paging');

const controller = {
    showHome(propertyRepository, req, res) {
        var page = req.query.page;
        page = pageHandler.choosePage(page);
        const query = req.query;
        const type = query.type;
        const place = query.place;
        const params = { top: 'on' };

        propertyRepository.findPropertyByParams(params).then(properties => {
            properties.sort(function(a, b) { return b.date - a.date });
            const result = pageHandler.handle(properties, page, 6);
            const foundProperties = result.filteredCollection;
            const pagesCount = result.numberOfPages;
            const pages = result.navigationNumbers;
            const cityArray = ['Кавала', 'Тасос', 'Халкидики', 'Солун', 'Серес', 'Тракия', 'Лимнос', 'Драма'];
            const topProperties = properties.slice(0, 6);
            const codes = ['2881', '2879', '2884', '2888'];
            const newProperties = [];
            propertyRepository.findPropertyByCode(codes[0]).then((prop0) => {
                newProperties.push(prop0[0]);
                propertyRepository.findPropertyByCode(codes[1]).then((prop1) => {
                    newProperties.push(prop1[0]);
                    propertyRepository.findPropertyByCode(codes[2]).then((prop2) => {
                        newProperties.push(prop2[0]);
                        propertyRepository.findPropertyByCode(codes[3]).then((prop3) => {
                            newProperties.push(prop3[0]);
                            res.render('home', { newProperties, topProperties, cityArray, pagesCount, pages, currentPage: page });
                        });
                    });
                });
            });

        });
    },
    showUsefull(req, res) {
        res.render('usefull');
    },
    showServices(req, res) {
        res.render('services');
    },
};

// @ts-ignore
module.exports = controller;
