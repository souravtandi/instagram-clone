const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    profilePicUrl: {
        type: String,
        default: "https://res.cloudinary.com/instagram-clone-web/image/upload/v1649525979/blank-profile-picture-973460_1280_yxdjm7.webp"
    },
    followers: [{type: ObjectId, ref: "UserModel"}],
    following: [{type: ObjectId, ref: "UserModel"}]

});

mongoose.model("UserModel", userSchema);