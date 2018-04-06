const db = require('../../db/schema.js');
const sequelize = require('../../db/index.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const retrieveTeacherAvailability = async (req, res) => {
  try {
    const { teacher_id } = req.params;
    const availabilities = await db.Availability.findAll({
      where: {
        teacher_id
      }
    });
    res.send(availabilities);
  } catch (error) {
    console.log(`Error at retrieveTeacherAvailability`, error);
    return;
  }      
}  

const submitAvailability = async (req, res) => {
  // const { openSlots } = req.body;
  // try {
  //   const createdAvailabilities = db.Availability.bulkCreate(openSlots);
  //   res.status(201).send(createdAvailabilities);
  // } catch (error) {
  //   console.error('error while creating availability', error);
  //   return;
  // }
  const { teacher_id, start, end} = req.body;
  try {
    const createdAvailability = await db.Availability.create({
      teacher_id,
      start,
      end,  
    });
    res.status(201).send(createdAvailability);
  } catch (error) {
    console.error('\x1b[31m%s', 'error while creating availability', error, '\x1b[0m');
    return;
  }
}

const removeAvailability = async (req, res) => {
  const { selected_availability_id } = req.body;
  const method = req.method;
  try {
    
    const availabilityToRemove = await db.Availability.destroy({
      where: {
        id: selected_availability_id
      }
    });
     
    // const availabilityToRemove = await db.Availability.findOne({ id: selected_availability_id });
    // availabilityToRemove.destroy();
    // incase we want to use removeAvailability as a helper function
    if (method === 'delete') {
      res.status(202).send(availabilityToRemove);
    } else {
      return availabilityToRemove;
    }
  } catch (error) {
    console.error('error while updating availability', error);
    return;
  }
}

const removeOldAvailabilities = async () => {
  try {
    const oldAvailabilities = await db.Availability.findOne({
      where: {
        end: { [Op.lt] : new Date() },
      }
    })
    return oldAvailabilities;
  } catch (error) {
    console.log('Error with removeOldAvailabilities ', error);
    return;
  }
}

module.exports = { retrieveTeacherAvailability, submitAvailability, removeAvailability, removeOldAvailabilities };