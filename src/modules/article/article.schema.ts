import { Schema } from 'mongoose';

export const articleSchema = new Schema({
    _id: { type: String, required: false },
    title: { type: String, required: true },
    subTitle: { type: String, required: false },
    summary: { type: String, required: false },
    author: { type: String, required: true },
    create_time: { type: String, required: true },
})