import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: resolve(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI not found in .env.local');
  console.log('\nPlease create a .env.local file with:');
  console.log('MONGODB_URI=your-mongodb-connection-string');
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

async function initAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne();
    
    if (existingAdmin) {
      console.log('⚠️  Admin already exists with username:', existingAdmin.username);
      console.log('If you want to reset it, delete the admin document from MongoDB first.');
      process.exit(0);
    }

    // Create admin with default credentials
    const hashedPassword = await bcrypt.hash('password', 10);
    
    const admin = await Admin.create({
      username: 'admin',
      password: hashedPassword,
    });

    console.log('✅ Admin created successfully!');
    console.log('Username: admin');
    console.log('Password: password');
    console.log('\n⚠️  IMPORTANT: Change your password immediately after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

initAdmin();

