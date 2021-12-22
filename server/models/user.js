import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
    {
        userInfo: {
            name: {
                type: String,
                required: true,
            },

            email: {
                type: String,
                required: true,
                unique: true,
            },

            dob: {
                month: {type: String, required: true},
                day: {type: String, required: true},
                year: {type: String, required: true},
            },

            password: {
                type: String,
                required: true,
            }
        },

        playlists: [{
            playlistName: String,
            songs: Array
        }],

        history: [{
            date: String,
            songs: Array
        }]


},
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function(next) {

    if (!this.isModified('userInfo.password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10);

    this.userInfo.password = await bcrypt.hash(this.userInfo.password, salt);

})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.userInfo.password)
}

const User = mongoose.model('User', userSchema)

export default User;
