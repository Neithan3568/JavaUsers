//Dependencia commonjs
const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
//dependecia de rutas
const bootcampRoutes = require('./routes/bootcampRoutes')
const coursesRoutes = require('./routes/coursesRoutes')
const reviewsRoutes = require ('./routes/reviewsRoutes')
const userRoutes = require ('./routes/usersroutes')
//DEPENDENCIA PARA CONEXION A  BD
const conectDB=require('./config/db')


//Estableer arxhivo .env del proyecto
dotenv.config({
        path:'./config/.env'
})

conectDB()

//crear el objeto app
const app = express()
// EXPRESS PARA RECIBIR DATOS JSON
app.use(express.json())

// vincular las rutas de bootcamps
app.use('/api/v1/devcamp/bootcamps',bootcampRoutes)

// vincular las rutas de courses
app.use('/api/v1/devcamp/courses', coursesRoutes)

// vincular las rutas de reviews
app.use('/api/v1/devcamp/reviews', reviewsRoutes)

//vincular las rutas de users
app.use('/api/v1/devcamp/auth', userRoutes)
//establcer  servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT,
        console.log(`Servidor escuchando en el puerto: ${PORT}`.bgGreen.blue))