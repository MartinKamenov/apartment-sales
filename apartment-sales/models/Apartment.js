class Apartment {
    constructor(title, text, type, place, rooms, price, size, code, firstLine, parkingSpot,
        view, pool, furnished) {
        if (typeof place !== 'string') {
            throw Error('Place should be string');
        }
        if (typeof rooms !== 'number') {
            throw Error('Rooms should be number');
        }
        if (typeof rooms !== 'code') {
            throw Error('Code should be number');
        }

        this.type = type;
        this.place = place;
        this.rooms = rooms;
        this.price = price;
        this.size = size;
        this.code = code;
        this.firstLine = firstLine;
        this.parkingSpot = parkingSpot;
        this.view = view;
        this.pool = pool;
        this.furnished = furnished;
    }
}

module.exports = Apartment;
