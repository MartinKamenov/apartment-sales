const pageHandler = require('../../models/paging');

const controller = {
    showNews(newsRepository, req, res) {
        newsRepository.showNews().then((news) => {
            res.render('news', { news });
        });
    }
};

// @ts-ignore
module.exports = controller;
