import cheerio from 'cheerio';
import axios from 'axios';

const axiosHead = {
    headers:{
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
      }
    } 

const mainUrl = 'https://es.novelcool.com/'

//peticiones get con axios y retorna un repuesta
async function AxiosGet(url){
    return await axios.get(url,axiosHead)
}

//funcion para obtener un objeto con la informacion del manga
 function getMangas($,mangaElement){

        const genresList = [];
        let regex = /\/([^\/]+)\.html$/;
        //elemento padre comun de todos los elementos
        const index = $(mangaElement).find('.book-info');
        const id = $(mangaElement).find('.book-pic a').attr('href').match(regex) 
        const title = index.find('.book-name').text();
        const img = $(mangaElement).find('.book-pic a img').attr('cover_url') ?? $(mangaElement).find('.book-pic a img').attr('lazy_url');
        const typeManga = $(mangaElement).find('.book-pic a').find('.book-type-manga').text();

         $(mangaElement).find('.book-data-info .book-tags .book-tag').each((genreIndex,genreElement)=>{
            const genre = $(genreElement).text()
            genresList.push(genre)
        });
        const bookRate = index.find('.book-rate .book-rate-num').text();
        const description = index.find('.book-intro').text().size > 1 ? 
         index.find('.book-intro').text(): 
         $(mangaElement).find('.book-pic a .book-summary-content').text();
        const views = index.find('.book-data .book-data-item').find('.book-data-num').text();
        const dataTime = index.find('.book-data').find('.book-data-time').text();
        const mangaObject = {

            id:[...id][1],
            title: title,
            img: img,
            typeManga:typeManga,
            genres: [...genresList],
            bookRate:bookRate,
            description:description,
            views:views,
            dataTime:dataTime
        }
        return mangaObject
}

//funcion para obtener mangas de una categoria en especifico
async function get_category(categoryUrl){

    const response = await AxiosGet(categoryUrl);

    const $ = cheerio.load(response.data);

    const categoryTitle = $('.category-headline-bar .category-title').text()
    const mangaList = []

    $('.site-content').find('.category-book-list').find('.book-item').each((mangaIndex,mangaElement)=>{

        const result = getMangas($,mangaElement);

        mangaList.push(result)
    })

    return {
        section: categoryTitle,
        result: mangaList
    }
}


 export class Mangas{

    static async get_mangasIndex(){
        const response = await AxiosGet(mainUrl);
        const $ = cheerio.load(response.data);
        const sectionList = []
        //obtener todas la secciones principales con sus repectivos mangas
        $('.index-book-list').each((index,Element)=>{
        
            const nameSection = $(Element).find('.site-content a ').attr('title');

            const mangaList = []

            $(Element).find('.site-content .category-book-list .book-item').each((mangaIndex,mangaElement)=>{

                const result = getMangas($,mangaElement);
    
                mangaList.push(result)
            })

            const sectionObject = {
                nameSection:nameSection,
                mangaList: mangaList
            }

            sectionList.push(sectionObject)
        })
        return sectionList
    }
    static async get_lastet(){
        return await get_category('https://es.novelcool.com/category/latest.html')
    }
    static async get_popular(){
        return await get_category('https://es.novelcool.com/category/popular.html')
    }
    static async get_completed(){
        return await get_category('https://es.novelcool.com/category/completed.html')
    }
    static async get_Romance(){
        return await get_category('https://es.novelcool.com/category/Romance.html')
    }
    static async get_Comedy(){
        return await get_category('https://es.novelcool.com/category/Comedia.html')
    }
    static async get_Drama(){
        return await get_category('https://es.novelcool.com/category/Drama.html')
    }
    static async get_Accion(){
        return await get_category('https://es.novelcool.com/category/Acción.html')
    }
    static async get_Webcomic(){
        return await get_category('https://es.novelcool.com/category/Webcomic.html')
    }



 }
 
 //probar metodos
 const result = await Mangas.get_Webcomic()
 console.log(result.result[0]);