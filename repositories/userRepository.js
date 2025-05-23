const userModel = require("../models/userSchema.js");
const argon2 = require("argon2")

class repoUser {
    constructor(){};
    async loginUser(data){
        try{
        const user = await userModel.findOne({
            username: data.username,
          });
        if(!user){
            return {
                status: false,
                message: "Username does not exist or password is not correct",}
        }
        const isPasswordValid = await argon2.verify(user.password, data.password);
        if (!isPasswordValid) {
            return {
            status: false,
            message: "Username does not exist or password is not correct",
            };
        }
        return { status: true, message: "Authentificated", userId: user._id};
        }catch(err){
            console.error(err.message)
            return  { status: false, message: "Internal server error" };
        }
}
    async getUser(data){
        const user = await userModel.findById(data);
        if(user){
            return user;
        }else{
            return { status: false }
        }
    }

    async createUser (data){
        try{
            const user = new userModel({
                username: data.username,
                email: data.email,
                password: data.password,
                name: data.name,
                bio: data.bio
            })
            try{
                await user.save();
                return { status: true, message: "User saved", userId: user._id }
            }catch(err){
                if (err.message.slice(0, 26) === "E11000 duplicate key error"){
                    return {
                        status: false,
                        message: "Username or email already exist",
                        id: user._id,
                      }
                }
            }
        }catch(err){
            console.error(err.message);
            return { status: false, message: "Internal server error" };
        }
    }

    async changeUser (data){
        try{
            const user = await userModel.findByIdAndUpdate(data.id);

        }catch(err){
            console.error(err.message);
            return { status: false, message: "Internal server error" };
        }
    }

    async getMe (id){
        try{
            const me = await userModel.findById(id);
            return me;
        }catch(err){
            console.error(err.message);
            return { status: false, message: "Internal server error" };
        }
    }

}

module.exports = new repoUser();