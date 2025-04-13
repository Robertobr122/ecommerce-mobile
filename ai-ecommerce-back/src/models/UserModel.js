// src/models/UserModel.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true, minlength: 2 },
  cpf: { type: String, required: true, unique: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
