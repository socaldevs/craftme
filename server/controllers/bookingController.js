const db = require('../../db/schema.js');

module.exports = {
  submitBooking: async (req, res) => {
    try {
      let { student_id, teacher_id, timeslot } = req.body;
      let booking = await Booking.create({
        student_id: student_id,
        teacher_id: teacher_id,
        timeslot: timeslot //NEEDS TO BE AN ARRAY
      });
      res.send(booking);
    } catch (error) {
      console.log(error);
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

  submitAvailability: (req, res) => {
    //get all information from req.body
    //confirmed = 0
    //insert booking into bookings table
  }
};
