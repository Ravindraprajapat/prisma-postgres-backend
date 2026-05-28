import prisma from '../DB/db.config.js'

export const fetchPost = async (req, res) => {

  const page = Number(req.query.page) || 1
  const limit =Number( req.query.limit) || 10

  if(page <= 0) page =1
  if(limit<= 0 || limit >100) limit = 10;
  const skip = (page - 1 ) * limit
  const post = await prisma.post.findMany({

   skip : skip,
   take : limit,
    include:{
        comment:{
            include:{
                user:true
            }
        }
    }
  })

    const totalPost = await prisma.post.count()
    const totalPages = Math.ceil(totalPost/limit)

  res.status(200).json({ message: 'successFully fetch the post', data: post , meta:{
    totalPost:totalPost,
    totalPages:totalPages,
  } }) 
}

export const createPost = async (req, res) => {
  const { user_id, title, description } = req.body
  const post = await prisma.post.create({
    data: {
      user_id,
      title,
      description
    }
  })
  res.status(200).json({ message: 'Post created successfully', data: post })
}

export const showPost = async (req, res) => {
  const postId = req.params.id
  const post = await prisma.post.findUnique({
    where: {
      id: Number(postId)
    },
    include:{
        comment:true
    }
  })
  res.status(200).json({ message: 'post fetch successfully', data: post })
}

export const updatePost = async (req, res) => {
  const postId = req.params.id
  const { title, description } = req.body
  await prisma.post.update({
    where: {
      id: Number(postId)
    },
    data: {
      title,
      description
    }
  })

  res.status(200).json({ message: 'Post updated successfully' })
}

export const deletePost = async (req, res) => {
  const postId = req.params.id
  await prisma.post.delete({
    where:{
        id:Number(postId)
    }
  })
  
  res.status(200).json({message:"Post deleted successfully"})
}
