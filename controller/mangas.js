import {Mangas} from '../models/mangas.js'


export class MangaController{

    static async search(req,res){
        let {
         query,
         author,
         s_sel,
         a_sel,
         genres_includes,
         genres_not_includes,
         year,
         completed ,
         rate,
        } = req.query

        if(genres_includes){
         genres_includes= genres_includes.split('%G')
        }
        if(genres_not_includes){
            genres_not_includes= genres_not_includes.split('%G')
        }
        if(isNaN(year)){
            year = 0
        }
        if(Number.parseInt(year) > 2024 || Number.parseInt(year) < 1943){
            year = ''
        }
        if(isNaN(rate)){
            rate = 0
        }
        if(Number.parseInt(rate) > 5 || Number.parseInt(rate) < 1){
            rate = ''
        }
        // res.json({
        //     search: query,
        //     author: author,
        //     s_sel:s_sel,
        //     a_sel:a_sel,
        //     genres_includes:genres_includes,
        //     genres_not_includes:genres_not_includes,
        //     year:year,
        //     completed:completed,
        //     rate:rate
        // })
        const  result = await Mangas.search(
            query,
            author,
            s_sel,
            a_sel,
            genres_includes,
            genres_not_includes,
            year,
            completed,
            rate
        )
        res.json(result)

    }
    static async Index(req,res){
        const result = await Mangas.get_mangasIndex()
        res.status(200).json(result)
    }
    static async Lasted(req,res){
        const result = await Mangas.get_lasted()
        res.status(200).json(result)
    }
    static async Popular(req,res){
        const page = req.query.page ?? 1
        const result = await Mangas.get_popular(page)
        res.status(200).json(result)
    }
    static async Complete(req,res){
        const page = req.query.page ?? 1
        const result = await Mangas.get_completed(page)
        res.status(200).json(result)
    }
    static async Romance(req,res){
        const page = req.query.page ?? 1
        const result = await Mangas.get_category('Romance',page)
        res.status(200).json(result)
    }
    static async Comedy(req,res){
        const page = req.query.page ?? 1
        const result = await Mangas.get_category('Comedia',page)
        res.status(200).json(result)
    }
    static async Drama(req,res){
        const page = req.query.page ?? 1
        const result = await Mangas.get_category('Drama',page)
        res.status(200).json(result)
    }
    static async Action(req,res){
        const page = req.query.page ?? 1
        const result = await Mangas.get_category('Acción',page)
        res.status(200).json(result)
    }
    static async Webcomic(req,res){
        const page = req.query.page ?? 1
        const result = await get_category('Webcomic',page)
        res.status(200).json(result)
    }
    static async Category(req,res){
        const category = req.query.category 
        const page = req.query.page ?? 1
        const result = await Mangas.get_category(category,page)
        res.status(200).json(result)
    }
    static async info(req,res){
        const id = req.params.id
        const result = await Mangas.get_info(id)
        res.json(result)
    }
    static async genres(req,res){
        const result = await Mangas.get_GenresList()
        res.json(result)
    }
    static async reader(req,res){

        const id = req.params.id
        const ch = req.params.ch
        const url = ch + '/' + id
        const result = await Mangas.chapter_read(url)
        res.json(result)
    }
    
    

}