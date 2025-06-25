const cron = require('node-cron');
const checkAndNotify = require('../utils/checkAndNotify');

cron.schedule('0 7 * * *', async () => {
  console.log('Running daily student performance check...');
  await checkAndNotify();
});
