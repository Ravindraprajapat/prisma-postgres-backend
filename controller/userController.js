import prisma from "../DB/db.config.js";


export const getUserData = async (req,res) =>{
    const users = await prisma.user.findMany({
        include:{
            post:true,
            comment:true
        }
    })
   res.status(200).json({status:200, users:users}) 
}

export const showUser = async (req,res) =>{
    const userId = req.params.id
    const user = await prisma.user.findFirst({
        where:{
            id:Number(userId)
        }
    })
    if(!user){
        res.status(404).json({message:"User not found"})
    }
    res.status(200).json({status:200, user:user})

}


export const createUser = async (req , res)=>{
   const{name,email,password} = req.body

   const User = await prisma.user.findUnique({
    where:{
        email:email
    }
   })

   if(User) {
    res.status(400).json({message:"User already exists"})
   }
   const newUser = await prisma.user.create({
      data:{
        name:name,
        email:email,
        password:password
      }
   })
    res.status(201).json({message:"User created successfully", user:newUser})
}


export const updateUser = async (req,res) =>{
    const userId = req.params.id
    const{name,email,password} = req.body

    await prisma.user.update({
        where:{
            id:Number(userId)
        },
        data:{
          name,
          email,
          password
        }
    })
    res.status(200).json({message:"User updated successfully"})
}

// delete user

export const deleteUser = async (req,res) =>{
    const userId = req.params.id
    await prisma.user.delete({
        where:{
            id:Number(userId)
        }
    })
    res.status(200).json({message:"User deleted successfully"})
}

