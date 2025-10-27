const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI not found in .env.local');
  process.exit(1);
}

// Admin schema
const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: true
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function fixAdminPassword() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find the existing admin
    const admin = await Admin.findOne({ username: 'admin' });
    
    if (!admin) {
      console.log('❌ Admin not found');
      await mongoose.disconnect();
      process.exit(1);
    }

    console.log('Found admin with ID:', admin._id);
    console.log('Current password field:', admin.password.substring(0, 30));

    // Hash the password properly
    const hashedPassword = await bcrypt.hash('password', 10);
    
    // Update the admin's password
    admin.password = hashedPassword;
    await admin.save();

    console.log('\n✅ Admin password fixed successfully!');
    console.log('The password is now properly hashed.');
    console.log('\nYou can now login with:');
    console.log('Username: admin');
    console.log('Password: password');
    console.log('\n⚠️  IMPORTANT: Change your password after logging in!');
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixAdminPassword();

