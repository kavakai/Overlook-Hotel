const userData = fetch("http://localhost:3001/api/v1/customers")
  .then((response) => response.json());

const roomsData = fetch("http://localhost:3001/api/v1/rooms")
  .then((response) => response.json());

const allBookingsData = fetch("http://localhost:3001/api/v1/bookings")
  .then((response) => response.json());

const updateBookings = (booking) => {
  fetch("http://localhost:3001/api/v1/bookings", {
    method: "POST",
    body: JSON.stringify(booking),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(response => response.json())
};

const getUpdatedData = (id) => {
  const url = `http://localhost:3001/api/v1/customers/${id}`;
  fetch(url)
    .then((response) => response.json());
}

export { userData, roomsData, allBookingsData, updateBookings, getUpdatedData }