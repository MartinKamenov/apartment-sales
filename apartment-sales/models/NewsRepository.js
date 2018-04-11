const collectionName = 'news';
class NewsRepository {
    constructor(database) {
        this.database = database;
    }

    createNews(news) {
        this.database.insert(collectionName, news);
    }

    showNews() {
        return this.database.showAll(collectionName);
    }

    deleteNews(code) {
        return this.database.delete(collectionName, { code });
    }
}

module.exports = NewsRepository;
