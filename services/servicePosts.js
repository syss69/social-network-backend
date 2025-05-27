const repoPost = require("../repositories/postRepository");

class postService {
    async createPostService (data, id){
        try{
            const response = await repoPost.createPost(data, id);
            return response
        }catch(err){
            console.error("err in service", err.message);
        }
    }
    async findPostsService (data){
        try{
            return await repoPost.findPostsByUserId(data);
        }catch(err){
            console.error("err in service", err.message);
        }
    }
    async deletePostService(data){
        try{
            return await repoPost.deletePost(data);
        }catch(err){
            console.error("err in service", err.message);
        }
    }
}

module.exports = new postService();