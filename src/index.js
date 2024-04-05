import express from 'express'
import cors from 'cors'
import { PORT } from './config/config.js'
import { getPosts } from './controllers/post.controller.js'
import adminRouter from './routes/admin.routes.js'
import registerRouter from './routes/register.routes.js'
import loginRouter from './routes/login.routes.js'
import userRouter from './routes/user.routes.js'
import postRouter from './routes/post.routes.js'
import categoryRoutes from './routes/category.routes.js'
import commentRoutes from './routes/comment.routes.js'
import { swaggerDocs } from './config/swagger.js'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Rutas
app.get('/', (req, res) => {
  res.json({ message: 'Aquí va la página de inicio' })
})
app.get('/home', getPosts)
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/admin', adminRouter)
app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/categories', categoryRoutes)
app.use('/comments', commentRoutes)

// Integración de Swagger
swaggerDocs(app)

// Puerto de escucha
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})
