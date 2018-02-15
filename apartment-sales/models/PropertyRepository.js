const collectionName = 'properties';
class PropertyRepository {
    constructor(database) {
        this.database = database;
    }
    getAllProperties() {
        return this.database.showAll(collectionName);
    }

    insertProperty(property) {
        return this.database.insert(collectionName, property);
    }

    findPropertyByCode(code) {
        return this.database.find(collectionName, { code: code });
    }

    updateProperty(code, property) {
        this.database.delete(collectionName, { code: code }, property);
    }

    findPropertyByParams(params) {
        return this.database.find(collectionName, params);
    }

    removeProperty(code) {
        return this.database.delete(collectionName, { code: code });
    }
}

module.exports = PropertyRepository;
