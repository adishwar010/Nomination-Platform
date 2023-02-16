const Agenda = require('agenda');
const config = require('config');
const mongoConnectionString = config.get('mongoURI');
const Paper = require('../models/Paper');
const mongoose = require('mongoose');

const agenda = new Agenda({
  db: { address: mongoConnectionString, seUnifiedTopology: true },
  useUnifiedTopology: true,
});

// Testing
mongoose.connect(mongoConnectionString);
mongoose.connection.on('open', function () {
  mongoose.connection.db.collection('agendaJobs', function (err, collection) {
    collection.find({}, function (e, numUnlocked) {
      if (e) console.error(e);
      console.log(numUnlocked);
      console.log(utils.String.format('Unlocked #{0} jobs.', numUnlocked));
    });
  });
});

// Defining agendas

agenda.define('submitting the test', async (job) => {
  try {
    console.log('Running the scheduled job');
    const { duration, finished, id, startedAt } = job.attrs.data;
    if (finished) {
      console.log('Paper Already Submitted');
    }
    console.log('Submitting paper');
    const finishedAt = new Date(startedAt).getTime() + duration * 60 * 1000;
    console.log(finishedAt);
    await Paper.updateOne({ _id: id }, { finished: true, finishedAt });
    console.log('Scheduled Event ended');
  } catch (err) {
    console.log('Error Submitting the test');
  }
});

async function startEvent(startInMinutes, data) {
  try {
    await agenda.start();
    const date = new Date(data.startedAt);
    date.setMinutes(date.getMinutes() + startInMinutes);
    const time = `in ${startInMinutes} minutes`;
    console.log(time);
    await agenda.schedule(date, 'submitting the test', {
      finished: data.finished,
      duration: startInMinutes,
      id: data._id,
      startedAt: data.startedAt,
    });
    console.log('Event Scheduling done');
  } catch (err) {
    console.log(err);
    console.log('Error Scheduling Event');
  }
}

module.exports = startEvent;
