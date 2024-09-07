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
