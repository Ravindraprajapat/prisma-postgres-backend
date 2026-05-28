import prisma from "../DB/db.config.js";


export const fetchComment = async (req,res) =>{
   const comments = await prisma.comment.findMany({})
   return res.status(200).json({message:"successfully fetch the comments", data:comments})
}


export const showComment = async (req,res)=>{
    const commentId = req.params.id
    const comment = await prisma.comment.findFirst({
        where:{
            id:Number(commentId)
        }
    })
    return res.status(200).json({message:"successfully fetch the comment", data:comment})
}


export const createComment = async (req,res) =>{
 const {post_id,user_id,comment} = req.body;
 const newComment = await prisma.comment.create({
    data:{
        post_id:Number(post_id),
        user_id:Number(user_id),
        comment:comment
    }
 })
    return res.status(201).json({message:"Comment created successfully", data:newComment})
}


export const updateComment = async (req, res) =>{
    const commentId = req.params.id
    const {post_id,user_id,comment} = req.body;

    await prisma.comment.update({
        where:{
            id:Number(commentId)
        },
        data:{
            post_id,
            user_id,
            comment
        }
    })
    return res.status(200).json({message:"Comment updated successfully"})
}


export const deleteComment = async (req,res) =>{
    const commentId = req.params.id
    await prisma.comment.delete({
        where:{
            id:Number(commentId)
        }
    })
    return res.status(200).json({message:"Comment deleted successfully"})
}



