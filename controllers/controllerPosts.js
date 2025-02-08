const postService = require("../services/servicePosts.js");

class postController{
    async createPost(req, res){
        try{
            const newPost = await postService.createPostService(req.body);
            if(newPost.status == false){
                return res.status(409).json(newPost)
            }
            return res.status(201).json(newPost)
        }catch(err){
           return  res.status(500).json({status: false, message: err.message})
        }
    }
    async findPosts(req, res){
        try{
            const posts = await postService.findPostsService(req.params.id);
            res.status(200).json(posts)
        }catch(err){
            return  res.status(500).json({status: false, message: err.message})
        }
    }
    async deletePost(req, res){
        try{
            const response = await postService.deletePostService(req.params.id);
            if (response.status == false){
                return res.status(409).json(response)
            }
            return res.status(200).json(response);
        }catch(err){
            return res.status(500).json({status: false, message: err.message})
        }
    }
}

module.exports = new postController ();