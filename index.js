import express from 'express'
import { mangasRouter } from './router/mangas.js';
import cors from 'cors'
const app = express()
const PORT = process.env.PORT ?? 1234;
const corsOption = {
    origin: ['http://localhost:3000/','http://127.0.0.1:3001/'],
    methods:['GET']
}
 app.use('/api',mangasRouter)
 app.use(cors(corsOption))

app.listen(PORT,()=>{
    console.log('servidor en Linea en el puerto : '+ PORT)
})