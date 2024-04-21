import express from 'express'
import ejs from 'ejs'
import cors from 'cors'
import { mangasRouter } from './router/mangas.js';

const app = express()
const corsOption = {
    origin: ['http://localhost:3000/','http://127.0.0.1:3001/'],
    methods:['GET','OPTIONS','POST']
}
app.use(cors(corsOption))

app.use(express.static(process.cwd()+'/app/public'))
app.set('view engine','ejs')
app.set('views',process.cwd()+'/app/views')
app.use('/manga',mangasRouter)
app.get('*',(req,res)=>{
    res.json({
        message: 'invalid path',
        initPath:'/manga',
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
const PORT = process.env.PORT ?? 1234;
app.listen(PORT,()=>{
    console.log('servidor en Linea en el puerto : '+ PORT)
})