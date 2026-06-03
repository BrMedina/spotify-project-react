import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true,
        unique: true
    },
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },


}, {timestamps: true});


const user = moogose.mdodel("User", userSchema);
