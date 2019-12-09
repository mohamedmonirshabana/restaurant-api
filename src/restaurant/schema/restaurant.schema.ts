import * as mongoose from 'mongoose';

export const RestaurantSchema = new mongoose.Schema({
    city:{
        type: mongoose.types.ObjectId,
        ref: 'City'
    },
    image:{ type: String, required: true},
    name:{ type: String, required:true },
    email: { type: String, required: true },
    location:{
        type: "Point" ,
        coordinates : []
    }
});