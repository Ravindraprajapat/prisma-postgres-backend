import express from 'express'
import { createUser, deleteUser, getUserData, showUser, updateUser } from '../controller/userController.js'

const router = express.Router()

router.post("/user",createUser)
router.put("/user/:id",updateUser)
router.get("/users",getUserData)
router.get("/user/:id", showUser)
router.delete("/user/:id",deleteUser)
export default router