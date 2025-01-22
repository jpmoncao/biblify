import { Schema, model } from 'mongoose';
import IUser from '../interfaces/user';

// User schema and model
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const User = model<IUser>('User', userSchema);

export default User;