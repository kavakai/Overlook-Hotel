import chai from "chai";
import Room from "../src/Classes/Room.js";
const expect = chai.expect;
import User from "../src/Classes/User.js";
import bookingsData from "./bookings-test-data.js";
import roomsData from "./room-test-data.js";

const rooms = roomsData["rooms"];
const room = rooms[0];
const secondRoom = rooms[2];


describe('Room', function () {
    const room1 = new Room(room);
    const room2 = new Room(secondRoom);

    it('should be a function', function () {
        expect(Room).to.be.a('function');
    });

    it('should be an instance of Room', function () {
        expect(room1).to.be.an.instanceOf(Room);
    });

    it('should have a room number', function () {
        expect(room1.roomNumber).to.equal(7);
    });

    it("should be able to accept multiple room instances", function () {
        expect(room2.roomNumber).to.equal(24);
    });

    it('should be able to keep track of the room type', function () {
        expect(room1.type).to.equal('single room');
        expect(room2.type).to.equal('suite');
    });

    it('should keep track if it has a bidet', function () {
        expect(room1.hasBidet).to.equal(false);
        expect(room2.hasBidet).to.equal(true);
    });

    it('should have a bed size', function () {
        expect(room1.bedSize).to.equal('queen');
        expect(room2.bedSize).to.equal('king');
    });

    it('should be able to tell how many beds there are', function () {
        expect(room1.numBeds).to.equal(2);
        expect(room2.numBeds).to.equal(1);
    });

    it('should have a cost per night', function () {
        expect(room1.costPerNight).to.equal(231.46);
        expect(room2.costPerNight).to.equal(327.24);
    })
})