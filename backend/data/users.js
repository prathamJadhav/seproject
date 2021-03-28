import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin',
    email: 'admin@gmail.com',
    roomnumber: 'NA',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
 
]

export default users
