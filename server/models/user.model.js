import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        username:{
            type : String,
            required : [true, "please enter a username"]
        },
        password:{
            type : String,
            required : [true, "please enter a password"]
        },
        image :{
            type: String,
            required : [false]
        }
    },
    {
        Timestamp: true,
    }
);

const Users = mongoose.model("Users", UserSchema);

export default Users;