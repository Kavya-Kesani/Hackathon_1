// Create a test user
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

const createTestUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB\n');

    // Check if user already exists
    const existing = await User.findOne({ email: 'test@example.com' });
    if (existing) {
      await User.deleteOne({ email: 'test@example.com' });
      console.log('Deleted existing test user...\n');
    }

    // Create test user
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'test123',
      phone: '1234567890',
      role: 'user'
    });

    console.log('✅ Test user created successfully!\n');
    console.log('Login with these credentials:');
    console.log('Email: test@example.com');
    console.log('Password: test123\n');
    console.log('Login at: http://localhost:3000/login\n');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

createTestUser();
