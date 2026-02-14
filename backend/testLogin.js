// Test admin login
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

const testLogin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/civic_issues');
    console.log('Connected to MongoDB\n');

    // Find admin user
    const user = await User.findOne({ email: 'admin@gmail.com' }).select('+password');
    
    if (!user) {
      console.log('❌ User not found!');
      await mongoose.connection.close();
      return;
    }

    console.log('✅ User found:');
    console.log('Name:', user.name);
    console.log('Email:', user.email);
    console.log('Role:', user.role);
    console.log('Password hash:', user.password.substring(0, 20) + '...\n');

    // Test password
    const testPassword = 'admin123';
    const isMatch = await user.matchPassword(testPassword);
    
    if (isMatch) {
      console.log('✅ Password match successful!');
      console.log('Password "admin123" is correct\n');
    } else {
      console.log('❌ Password does not match!');
      console.log('There might be an issue with password hashing\n');
    }

    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

testLogin();
