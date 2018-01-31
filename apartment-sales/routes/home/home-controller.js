const pageHandler = require('../../models/paging');

const controller = {
    showHome(propertyRepository, req, res) {
        var page = req.query.page;
        page = pageHandler.choosePage(page);
        const query = req.query;
        const type = query.type;
        const place = query.place;
        const params = {};
        if (type) {
            params.type = type;
        }

        if (place) {
            params.place = place;
        }

        // We have search params
        if (type || place) {
            propertyRepository.findPropertyByParams(params).then(properties => {
                properties.sort(function(a, b) { return b.date - a.date });
                const result = pageHandler.handle(properties, page, 6);
                const foundProperties = result.filteredCollection;
                const pagesCount = result.numberOfPages;
                const pages = result.navigationNumbers;
                const cityArray = [];
                var found = false;
                for (var i = 0; i < properties.length; i += 1) {
                    for (var j = 0; j < cityArray.length; j += 1) {
                        if (properties[i].place === cityArray[j]) {
                            found = true;
                            break;
                        }
                    }

                    if (!found) {
                        cityArray.push(properties[i].place);
                    }
                }

                res.render('home', { apartments: foundProperties, cityArray, pagesCount, pages, currentPage: page });
            });
        } else {
            propertyRepository.getAllProperties().then(properties => {
                properties.sort(function(a, b) { return b.date - a.date });
                const result = pageHandler.handle(properties, page, 6);
                const foundProperties = result.filteredCollection;
                const pagesCount = result.numberOfPages;
                const pages = result.navigationNumbers;
                var found = false;

                const cityArray = ['Кавала', 'Тасос', 'Халкидики', 'Солун(Тесалоники)', 'Серес', 'Тракия', 'Лимнос', 'Драма'];

                res.render('home', { apartments: foundProperties, cityArray, pagesCount, pages, currentPage: page });
            });
        }
    },
    showUsefull(req, res) {
        res.render('usefull');
    },
};

// @ts-ignore
module.exports = controller;
