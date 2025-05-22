// backend/services/motivationService.js
// Purpose: Send motivational messages based on inactivity or achievement

const User = require('../models/User'); // adjust to your schema
const Task = require('../models/Task'); // adjust to your schema
const { sendEmail, sendPush, sendSMS } = require('./notifier'); // notification methods

const HOURS_INACTIVE = 12;

const sendMotivationIfInactive = async () => {
  const cutoff = new Date(Date.now() - HOURS_INACTIVE * 60 * 60 * 1000);

  const inactiveUsers = await User.find({ lastLogin: { $lt: cutoff } });

  for (const user of inactiveUsers) {
    const msg = "Hey! You’ve got this 💪 Don’t forget your goals today.";
    await sendEmail(user.email, 'We believe in you!', msg);
    await sendPush(user, msg);
    await sendSMS(user.phone, msg);
  }
};

const rewardTaskCompletion = async (user, task) => {
  const msg = `🎉 Great job completing "${task.title}"! Keep it up!`;
  await sendEmail(user.email, 'You did it!', msg);
  await sendPush(user, msg);
  await sendSMS(user.phone, msg);
};

module.exports = {
  sendMotivationIfInactive,
  rewardTaskCompletion
};
