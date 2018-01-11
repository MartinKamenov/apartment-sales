const collectionName = 'admins';
class ApartmentRepository {
    constructor(database) {
        this.database = database;
    }
    findAdmin(username, password) {
        return this.database.find(collectionName, { username, password });
    }

    createAdmin(username, password) {
        this.database.insert(collectionName, { username, password });
    }
}

module.exports = ApartmentRepository;
