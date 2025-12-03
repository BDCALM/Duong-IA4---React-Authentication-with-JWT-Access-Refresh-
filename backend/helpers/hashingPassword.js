// backend/middleware/hashingPassword.js

import bcrypt from 'bcrypt'; //thư viện cần cho hash mật khẩu

const SALT_ROUNDS = 10;

// Trả về passwordHash từ plainPassword (mật khẩu gốc)
export async function hashPassword(plainPassword) {
  if (typeof plainPassword !== 'string') 
    {
        throw new TypeError('Password must be a string');
    }
  return await bcrypt.hash(plainPassword, SALT_ROUNDS); 
}