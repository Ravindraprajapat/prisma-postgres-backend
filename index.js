
import express from 'express'
import router from './routes/userRoute.js'
import postRouter from './routes/postRoute.js'
import commentRouter from './routes/commentRoute.js'

const app = express()
const PORT = 5000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api",router)
app.use("/api",postRouter)
app.use("/api",commentRouter)


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})