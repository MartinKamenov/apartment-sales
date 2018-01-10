class Apartment {
    constructor(place, rooms) {
        if (typeof place !== 'string') {
            throw Error('Place should be string');
        }
        if (typeof rooms !== 'number') {
            throw Error('Rooms should be number');
        }
        this.place = place;
        this.rooms = rooms;
    }
}

module.exports = Apartment;
