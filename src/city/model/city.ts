import { Document } from 'mongoose';

export interface City extends Document {
    _id:string;
    name: string;
}