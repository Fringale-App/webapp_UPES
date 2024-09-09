import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    location: {
        type: {
            latitude: { type: Number },
            longitude: { type: Number },
        },
        default: null,  // Default to null if location isn't set yet
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User;
