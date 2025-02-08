const postModel = require("../models/postSchema.js");

class repoPost {
    constructor(){};
    async createPost(data){
        try{
            const newPost =  new postModel({
                author: data.author,
                content: data?.content,
                media: data?.media,
                age: data.age
            });
            await newPost.save();
            return { status: true, message: "Post saved" };
        }catch(err){
            console.error("err in repo", err.message);
            return { status: false, message: err.message };
        }
    }
    async findPostsByUserId(data){
        try{
            const posts = await postModel.find({author: data});
            return posts;
        }catch(err){
            return {status: false, message: err.message}
        }
    }
    async deletePost(data){
        try{
            const post = await postModel.findByIdAndDelete(data);
            if(post == null){
                return {status: false, message: "post does not exist"}
            }
            return {status: true, message: "post deleted"}
        }catch(err){
            return {status: false, message: err.message}
        }
    }
}

module.exports = new repoPost();