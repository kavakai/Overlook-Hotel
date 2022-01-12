const userData = fetch("http://localhost:3001/api/v1/customers")
    .then((response) => response.json());

const singleUser = fetch("http://localhost:3001/api/v1/customers/<id> where<id> will be a number of a customer’s id")
    .then((response) => response.json());

const roomsData = fetch("http://localhost:3001/api/v1/rooms")
.then((response) => response.json());

const allBookingsData = fetch("http://localhost:3001/api/v1/bookings")
    .then((response) => response.json());

