const db = require('../../db/schema.js');
const { removeAvailability } = require('./availabilityController.js');

const submitBooking = async (req, res) => {
  try {
    const { student_id, teacher_id, title, selected_availability_id } = req.body;
    //datifying the string date from client
    let { start, end } = req.body;
    start = new Date(start);
    end = new Date(end);
  
    const booking = await db.Booking.create({
      student_id,
      teacher_id,
      start,
      end,
      title,
    });
   
    // delete the availability in the availability table
    const deletedAvailability = await removeAvailability({body: {selected_availability_id}});

    res.send(booking);
  } catch (error) {
    console.log('Error at submitBooking', error);
    return;
  }
}


module.exports = { submitBooking };

//TODO: determine if these functions are needed

// const respondBooking = (req, res) => {
//   //get teacher_id & student_id & timeslot from req.body
//   //query bookings table where timeslot, teacher_id & student id are the same
//   //change confirmed status to 1
// },
// const denyBooking = (req, res) => {
//   //get teacher_id & student_id & timeslot from req.body
//   //query bookings table with above info
//   //findanddelete the entry from the table
// },
