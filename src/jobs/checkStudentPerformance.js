const cron = require('node-cron');
const checkAndNotify = require('../utils/checkAndNotify');

// Every day at 7am
cron.schedule('0 7 * * *', async () => {
  console.log('Running daily student performance check...');
  await checkAndNotify();
});
