import express from 'express'
import { mangasRouter } from './router/mangas.js';
import cors from 'cors'
const app = express()
const PORT = process.env.PORT ?? 1234;

app.use(cors())
app.use('/api',mangasRouter)

 app.get('*',(req,res)=>{
    res.json({
        message: 'path not exist',
        initPath:'/api',
        path: {
           indexPage: '/index',
           lastRelease:'/lasted',
           completeBooks: '/complete',
           categories:['/romance', '/comedy','/drama','/action','/webcomic'],
           anyCategory: '/category/:category',
           search: '/search',
           getInfoById:'/view/:id',
           getGenresList:'/info/genres',
           getMangaChapterPages:'/reader/:ch/:id',

        }
    })
})
app.listen(PORT,()=>{
    console.log('servidor en Linea en el puerto : '+ PORT)
})
