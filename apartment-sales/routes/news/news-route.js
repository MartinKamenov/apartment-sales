const { Router } = require('express');
const controller = require('./news-controller');


const attach = (app, newsRepository) => {
    // @ts-ignore
    const router = new Router();
    router
        .get('/', (req, res) => {
            controller.showNews(newsRepository, req, res);
        });
    app.use('/news', router);
};

module.exports = attach;
