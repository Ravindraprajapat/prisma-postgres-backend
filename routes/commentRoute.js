import express from 'express'
import { createComment, deleteComment, fetchComment, showComment, updateComment } from '../controller/commentController.js';

const commentRouter = express.Router();

commentRouter.get("/comments",fetchComment)
commentRouter.get("/comment/:id",showComment)
commentRouter.post("/comment",createComment)
commentRouter.put("/comment/:id", updateComment)
commentRouter.delete("/comment/:id", deleteComment)

export default commentRouter