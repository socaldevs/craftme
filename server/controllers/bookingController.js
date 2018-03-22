const db = require('../../db/schema.js');

module.exports = {
  submitBooking: async (req, res) => {
    try {
      const { student_id, teacher_id, start, end, title } = req.body;
      const booking = await db.Booking.create({
        student_id,
        teacher_id,
        start,
        end,
        title,
      });
      res.send(booking);
    } catch (error) {
      console.log('Error at submitBooking', error);
      return;
    }
  },
  fetchTeacherBookings: async (req, res) => {
    try {
      const { teacher_id } = req.params;
      const bookings = await db.Booking.findAll({
        where: {
          teacher_id
        }
      });
      res.send(bookings);
    } catch (error) {
      console.log('Error at fetchTeacherBookings', error);
      return;
    }
  },

  //TODO: determine if these functions are needed

  // respondBooking: (req, res) => {
  //   //get teacher_id & student_id & timeslot from req.body
  //   //query bookings table where timeslot, teacher_id & student id are the same
  //   //change confirmed status to 1
  // },
  // denyBooking: (req, res) => {
  //   //get teacher_id & student_id & timeslot from req.body
  //   //query bookings table with above info
  //   //findanddelete the entry from the table
  // },

  // submitAvailability: (req, res) => {
  //   //get all information from req.body
  //   //confirmed = 0
  //   //insert booking into bookings table
  // }
};
