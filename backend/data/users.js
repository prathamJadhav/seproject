import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin',
    email: 'admin@gmail.com',
    profileImage: '/images/admin.png',
    roomnumber: 'NA',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
];

export default users;
