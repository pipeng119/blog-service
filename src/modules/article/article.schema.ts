import { Schema } from 'mongoose';

export const articleSchema = new Schema({
    article_id: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, required: false },
    content: { type: String, required: true },
    nikename: { type: String, required: true },
    create_time: { type: String, required: true },
    comment: { type: Number, required: true },
    like: { type: Number, required: true },
}, { versionKey: false })