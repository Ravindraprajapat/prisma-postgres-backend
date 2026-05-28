import express from "express"
import { createPost, deletePost, fetchPost, showPost, updatePost } from "../controller/postController.js"

const postRouter = express.Router()

postRouter.get("/posts",fetchPost)
postRouter.get("/post/:id",showPost)
postRouter.post("/post",createPost)
postRouter.put("/post/:id", updatePost)
postRouter.delete("/post/:id",deletePost)

export default postRouter