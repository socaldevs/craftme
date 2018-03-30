const cron = require('cron').CronJob;
const CronWorker = new CronJob('* * * * * *', () => {
  console.log('You will see this message every second');
}, null, true, 'America/Los_Angeles');

module.exports = CronWorker;