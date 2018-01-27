class Property {
    constructor(title, text, type, place, rooms, price, size, code, firstLine, parkingSpot,
        view, pool, furnished, pictures) {

        this.title = title;
        this.text = text;
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
        this.pictures = pictures;
    }
}

module.exports = Property;
