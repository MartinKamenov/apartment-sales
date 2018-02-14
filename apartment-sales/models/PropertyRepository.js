const collectionName = 'properties';
class PropertyRepository {
    constructor(database) {
        this.database = database;
    }
    getAllProperties() {
        return this.database.showAll(collectionName);
    }

    insertProperty(apartment) {
        this.database.insert(collectionName, apartment);
    }

    findPropertyByCode(code) {
        return this.database.find(collectionName, { code: code });
    }

    updateProperty(code, property) {
        this.database.delete(collectionName, { code }, property);
    }

    findPropertyByParams(params) {
        return this.database.find(collectionName, params);
    }

    removeProperty(code) {
        this.database.delete(collectionName, { code: code });
    }
}

module.exports = PropertyRepository;
