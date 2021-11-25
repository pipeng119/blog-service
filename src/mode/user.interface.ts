import { Document, Schema } from 'mongoose';

export interface User extends Document {
    user_name: string;
    password: string;
    create_date: Date;
}

export interface UserResponse<T = unknown> {
    code: number;
    data?: T;
    message: string;
}