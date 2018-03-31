const { User, Message, Lesson, Feedback, Booking, Craft, CraftTeacher, Availability } = require('./schema.js');

const names = ['hero', 'potato', 'ninja', 'boy', 'thor', 'hulk'];
const adjectives = ['super', 'greedy', 'fantastic', 'lazy', 'hAngry'];
const getRandomUsername = (names, adjectives) => {
  return (`${adjectives[Math.floor(Math.random() * adjectives.length)]} ` +
  `${names[Math.floor(Math.random() * names.length)]}`);
  }

//create users
const teachers = [];
for (let i = 0; i < 3; i++) {
  teachers.push({
    username: getRandomUsername(names, adjectives),
    password: 'test',
    type: 0,
    bio: 'Im very cool teacher',
    // profile_pic_url: 'https://i.pinimg.com/736x/67/74/cc/6774ccbd24f9aed12af9c485ff065008--wiener-dogs-dachshunds.jpg',
    profile_pic_url: 'nothing',
    ratings: Math.floor(Math.random() * 5),  
  });
}

const students = []; 
for (let i = 0; i < 3; i++) {
  students.push({
    username: getRandomUsername(names, adjectives),
    password: 'test',
    type: 1,
    bio: 'Student',
    // profile_pic_url: 'https://i.pinimg.com/736x/67/74/cc/6774ccbd24f9aed12af9c485ff065008--wiener-dogs-dachshunds.jpg',
    profile_pic_url: 'nothing',
    rating: null
  });
}
const bookings = [
  {
    teacher_id: 11,
    student_id: 22,
    title: 'Hiking lesson with Jessica Alba',
    start: new Date(2018, 2, 21, 13, 30, 0),
    end: new Date(2018, 2, 21, 14, 0, 0),
  },

  { 
    teacher_id: 11,
    student_id: 22,
    title: 'Karate',
    start: new Date(2018, 2, 21, 10, 30, 0),
    end: new Date(2018, 2, 21, 12, 0, 0),
  },
  { 
    teacher_id: 11,
    student_id: 22,
    title: 'Kung-Fo',
    start: new Date(2018, 2, 21, 9, 0, 0),
    end: new Date(2018, 2, 21, 9, 30, 0),
  },

  { 
    teacher_id: 11,
    student_id: 22,
    title: 'Cooking',
    start: new Date(2018, 2, 20, 0, 0, 0),
    end: new Date(2018, 2, 21, 0, 0, 0),
  },

  { 
    teacher_id: 11,
    student_id: 22,
    title: 'Yoga lesson with Megan Fox',
    start: new Date(2018, 2, 23, 9, 30, 0),
    end: new Date(2018, 2, 23, 11, 30, 0),
  },

  { 
    teacher_id: 11,
    student_id: 22,
    title: 'DTS STARTS',
    start: new Date(2018, 2, 24, 1, 0, 0),
    end: new Date(2018, 2, 24, 4, 0, 0),
  },
  
];

const crafts = [
  {
    name: 'Tennis',
    description: 'Very sexy game!'
  },
  {
    name: 'Cooking',
    description: 'The most boring and essential activity evaaaa!!'
  },
];

//creating the associations seed data
const craftTeachers = [
  {
    userId: 1,
    craftId: 1,
  },
  {
    userId: 1,
    craftId: 2,
  },
  {
    userId: 2,
    craftId: 1,
  },
  {
    userId: 3,
    craftId: 1,
  },
];

const availability = [
  { 
    teacher_id: 1,
    start: new Date(2018, 2, 26, 17, 0, 0),
    end: new Date(2018, 2, 26, 18, 0, 0),
  },

  { 
    teacher_id: 1,
    start: new Date(2018, 2, 26, 9, 30, 0),
    end: new Date(2018, 2, 26, 11, 30, 0),
  },

  { 
    teacher_id: 1,
    start: new Date(2018, 2, 27, 13, 0, 0),
    end: new Date(2018, 2, 27, 14, 0, 0),
  },
  
];

const lessons = [
  {
    chat_id: 1,
    teacher_id: 1,
    student_id: 5,
    notes: 'hi'
  },
  {
    chat_id: 2,
    teacher_id: 1,
    student_id: 4,
    notes: 'hello'
  },
  {
    chat_id: 3,
    teacher_id: 1,
    student_id: 6,
    notes: 'hey'
  }
];

const createMany = async (entries, modelName) => {
  try {
    const models = {
      User,
      Booking,
      Craft,
      CraftTeacher,
      Availability,
      Lesson
    };

    await models[modelName].bulkCreate(entries);
    console.log(`Seed data has been created for ${modelName}!\n`);
    //exit in the command line after creating tables 
  } catch (error) {
    console.log('error while seeding the data', error);
  }
}; 

const insertAllSeedData = async () => {
  await createMany(teachers, 'User');
  await createMany(students, 'User'); 
  await createMany(bookings, 'Booking');
  await createMany(crafts, 'Craft');
  await createMany(craftTeachers, 'CraftTeacher');
  await createMany(availability, 'Availability');
  await createMany(lessons, 'Lesson');
  process.exit();  
};

insertAllSeedData();


