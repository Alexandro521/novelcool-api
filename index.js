import express from 'express'
import { mangasRouter } from './router/mangas.js';

const app = express()
const PORT = process.env.PORT ?? 1234;

 app.use('/api',mangasRouter)

app.listen(PORT,()=>{
    console.log('servidor en Linea en el puerto : '+ PORT)
})