import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    photo:{
        type:String,
        default:''
    },
    isAdmin:{
        type:Boolean,
        default: false,
    },
}, {timestamps: true});

export default mongoose.model('Admin', AdminSchema);