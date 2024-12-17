import { User } from '../models/user.js';

export const SuperAdminData = async () => {
  try {
    const superAdminExists = await User.findOne({ email: 'superadmin@example.com', role: 'superadmin' });

    if (!superAdminExists) {
      await User.create({
        name: 'Super Admin',
        email: 'superadmin@example.com',
        password: 'securepassword123', // This will be hashed by the User schema
        role: 'superadmin',
      });
      console.log('SuperAdmin initialized successfully.');
    } else {
      console.log('SuperAdmin already exists.');
    }
  } catch (error) {
    console.error('Error initializing SuperAdmin:', error);
  }
};
