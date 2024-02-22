import { PostsRepository } from "./post.repository.js";

const postRepo = new PostsRepository();
export const getPostsForUser = async(req, res, next) => {
  try {
    const posts = await postRepo.getPostsForUser(req.userID);
    if (!posts) {
      res.status(404).send({ success: true, message: "error" });
    }
    res.status(201).send({
      success: true,
      message: "Posts retrieved successfully",
      post: posts,
    });
  } catch (err) {
    console.log(err);
    res.status(404).send({
      success: false,
      error: {
        msg: "No Posts retrieved",
      },
    });
  }
};

export const getPostsByPostId = async(req, res, next) => {
    try {
        const post = await postRepo.getPostsByPostId(req.params.postId);
        
        if (!post) {
          res.status(404).send({ success: true, message: "error" });
        }
        else{
          res.status(201).send({
            success: true,
            message: "Post retrieved successfully",
            post: post,
          });
        }
        
      } catch (err) {
        console.log(err);
        res.status(404).send({
          success: false,
          error: {
            msg: "No Post retrieved with given ID",
          },
        });
      }
};

export const getAllPosts = async(req, res, next) => {
    try {
        const posts = await postRepo.getAllPosts();
        if (!posts) {
          res.status(404).send({ success: true, message: "error" });
        }
        res.status(201).send({
          success: true,
          message: "Posts retrieved successfully",
          post: posts,
        });
      } catch (err) {
        res.status(404).send({
          success: false,
          error: {
            msg: "Error",
          },
        });
      }
};

export const createNewPost = async(req, res, next) => {
  try {
    const caption  = req.body.caption;
    const newPost = await postRepo.createNewPost(req.userID,caption, req.file.filename);
    if (!newPost) {
      res.status(404).send({ success: true, message: "Post not created" });
    }
    res.status(201).send({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (err) {
    console.log(err);
    res.status(404).send({
      success: false,
      error: {
        msg: "Post not Created",
      },
    });
  }
};

export const deletePost = async(req, res, next) => {
  try{
    
    const deletedCount =await postRepo.deletePost(req.params.postId);
    
    if(deletedCount==1){
      res.status(200).send({success: true, msg: 'Post deleted successfully'});
    }
    else{
      res.status(404).send({success: true, msg:"No Post Fount with id"});
    }
  }
  catch(err){
    console.log(err);
    res.status(404).send({success: true, msg:"No Post deleted"});
  }
};

export const updatePost = async(req, res, next) => {
  try{
    const caption = req.body.caption;
    const post = await postRepo.updatePost(req.params.postId,caption, req.file.filename);
    if(post){
      
      res.status(200).send({success: true, message: post});
    }
    else{
      res.status(404).send({success: false, message:"post not updated"});
    }
  }
  catch(err){
    console.log(err);
    res.status(404).send({success: false, message:"post not updated"});

  }
  
};
