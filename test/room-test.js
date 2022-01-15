import chai from "chai";
import Room from "../src/Classes/Room.js";
const expect = chai.expect;
import roomsData from "./room-test-data.js";

const rooms = roomsData["rooms"];
const room = rooms[0];
const secondRoom = rooms[3];
const thirdRoom = rooms[2];


describe('Room', function () {
    const room1 = new Room(room);
    const room2 = new Room(secondRoom);
    const room3 = new Room(thirdRoom);

    it('should be a function', function () {
        expect(Room).to.be.a('function');
    });

    it('should be an instance of Room', function () {
        expect(room1).to.be.an.instanceOf(Room);
    });

    it('should have a room number', function () {
        expect(room1.roomNumber).to.equal(7);
        expect(room3.roomNumber).to.equal(0)
    });

    it('should be able to keep track of the room type', function () {
        expect(room1.type).to.equal('single room');
        expect(room2.type).to.equal('suite');
        expect(room3.type).to.equal('');
    });

    it('should keep track if it has a bidet', function () {
        expect(room1.hasBidet).to.equal(false);
        expect(room2.hasBidet).to.equal(true);
        expect(room3.hasBidet).to.equal(false);
    });

    it('should have a bed size', function () {
        expect(room1.bedSize).to.equal('queen');
        expect(room2.bedSize).to.equal('king');
        expect(room3.bedSize).to.equal('');
    });

    it('should be able to tell how many beds there are', function () {
        expect(room1.numBeds).to.equal(2);
        expect(room2.numBeds).to.equal(2);
        expect(room3.numBeds).to.equal(0);
    });

    it('should have a cost per night', function () {
        expect(room1.costPerNight).to.equal(231.46);
        expect(room2.costPerNight).to.equal(172.09);
        expect(room3.costPerNight).to.equal(0);
    });
});