const connectDB = require('./mongoose');
const expressLoader = require('./express');

async function loader({ app }) {
  await connectDB();
  console.log('🔺 MongoDB connected  🔺');

  await expressLoader({ app });
}

module.exports = loader;
