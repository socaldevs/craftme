const db = require('../../db/schema.js');

const submitCraft = async (req, res) => {
  const { name, description, userId } = req.body;
  try {
    const craft = await db.Craft.create({
      name,
      description,
    });
    const association = await db.CraftTeacher.create({
      userId,
      craftId: craft.dataValues.id,
    });
    res.send(association);
  } catch (err) {
    console.log('err from submitCrafts', err);
    return;
  }
};

module.exports = { submitCraft };

