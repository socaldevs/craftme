const db = require('../../db/schema.js');
const { removeAvailability } = require('./availabilityController.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
};

const getAllBookingsForUser = async (req, res) => {
  let { id } = req.params;
  try {
    const bookings = await db.Booking.findAll( {where: {
      [Op.or]: [
        {
          teacher_id: id
        },
        {
          student_id: id
        }
      ]
    }});
    res.status(200).send(bookings);
  } catch (error) {
    console.error('\x1b[31m%s', 'error while finding all the bookings', error, '\x1b[0m');
  }

};

const removeBooking = async (req, res) => {
  try {
    const { roomId } = req.body;
    const { method } = req;
    const bookingToRemove = await db.Booking.destroy({
      where: {
        id: roomId,
      }
    });
    if (method === 'delete') {
      res.status(202).send(bookingToRemove);
    } else {
      return bookingToRemove;
    }
  } catch (error) {
    console.log('Error with removeBooking', error);
    return;
  }
}


module.exports = { submitBooking , getAllBookingsForUser, removeBooking};

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
