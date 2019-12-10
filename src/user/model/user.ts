import { Document } from "mongoose";

export interface User extends Document{
    _id:string;
    email: string;
    name: string;
    passwordHash: string;
    roles: [];
}