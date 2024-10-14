import express from 'express'
import { mangasRouter } from './router/mangas.js';
import cors from 'cors'
const app = express()
const PORT = process.env.PORT ?? 1234;

app.use(cors())
app.use('/api/v1',mangasRouter)

 app.get('*',(req,res)=>{
    res.json({
        message: 'route not exist',
        initRouter:'/api/v1',
        routes: {
           indexPage: '/index',
           lastRelease:'/lasted',
           categories:['/complete','/romance', '/comedy','/drama','/action','/webcomic'],
           anyCategory: '/category/:category',
           search: '/search',
           getMangaInfoById:'/view/:mangaId',
           getGenresList:'/info/genres',
           getMangaChapterPages:'/reader/:mangaId/:chapterId',

        }
    })
})
app.listen(PORT,()=>{
    console.log('servidor en Linea en el puerto : '+ PORT)
})
