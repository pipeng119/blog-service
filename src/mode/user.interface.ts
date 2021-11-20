import { Document } from 'mongoose';

export interface User extends Document {
    _id: string;
    user_name: string;
    password: string;
}

export interface UserResponse<T = unknown> {
    code: number;
    data?: T;
    message: string;
}