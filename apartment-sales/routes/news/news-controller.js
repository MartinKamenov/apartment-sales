const pageHandler = require('../../models/paging');

const controller = {
    showNews(newsRepository, req, res) {
        newsRepository.showNews().then((news) => {
            res.render('news', { news });
        });
    },
    showSingleNews(newsRepository, req, res) {
        const id = req.params.id;
        newsRepository.findNewsById(id).then((foundNews) => {
            if (foundNews.length == 0) {
                res.send('No news with this id');
                return;
            }

            const news = foundNews[0];
            res.render('single_news', { news });
        });
    }
};

// @ts-ignore
module.exports = controller;
