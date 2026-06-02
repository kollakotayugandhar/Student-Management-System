require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const email = process.argv[2];

if (!email) {
  console.error('Usage: node scripts/promoteAdmin.js user@example.com');
  process.exit(1);
}

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const user = await User.findOneAndUpdate(
      { email },
      { $set: { role: 'admin' } },
      { new: true }
    );

    if (!user) {
      console.error('User not found:', email);
      process.exit(1);
    }

    console.log('User promoted to admin:', user.email, 'role=', user.role);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
};

run();
