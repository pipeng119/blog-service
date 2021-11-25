import { Schema } from 'mongoose';

export const userSchema = new Schema({
    user_name: { type: String, required: true },
    password: { type: String, required: true },
    create_date: { type: Number, required: true },
}, { versionKey: false })