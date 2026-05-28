import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shorturl:{
        type:String,
        require:true,
        unique:true
    },
    originalUrl:{
        type:String,
        require:true,
    }
},{timestamps: true})

const URL = mongoose.model("url",urlSchema);

export default URL;