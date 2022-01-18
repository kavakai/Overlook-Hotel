class Room {
  constructor(room) {
    this.roomNumber = room.number || 0;
    this.type = room.roomType || '';
    this.hasBidet = room.bidet || false;
    this.bedSize = room.bedSize || '';
    this.numBeds = room.numBeds || 0;
    this.costPerNight = room.costPerNight || 0;
  }
}

export default Room