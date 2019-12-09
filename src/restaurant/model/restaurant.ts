import { Document } from 'mongoose';

export interface Restaurant extends Document{
    _id: string;
    city: string;
    image: string;
    name: string;
    email: string ;
    location:{
        type:  string ,
        coordinates :  number[]
        
    };
}