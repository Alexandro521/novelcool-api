import cheerio from 'cheerio';
import axios from 'axios';

const axiosHead = {
    headers:{
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
      }
    } 

const mainUrl = (leng='es')=> `https://${leng}.novelcool.com/`

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

    const URL = mainUrl()+'category/'+categoryUrl+'.html';

    const response = await AxiosGet(URL);

    const $ = cheerio.load(response.data);

    const categoryTitle = $('.category-headline-bar .category-title').text()
    const mangaList = []

    $('.site-content').find('.category-book-list').find('.book-item').each((mangaIndex,mangaElement)=>{

        const result = getMangas($,mangaElement);

        mangaList.push(result)
    })

    const page = pagination($)

    return {
        section: categoryTitle,
        result: mangaList,
        pagination: page
    }
}

function pagination($){

    const currentPage = $(".page-navone").find('.vertical-top a .select').text();
    const lastPage = $(".page-navone .visible-inlineblock-pm .para-h8").text();
    return {
        currentPage: currentPage,
        lastPage:lastPage
    }
}

 export class Mangas{


    static async get_mangasIndex(){

        const response = await AxiosGet(mainUrl());
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
        return await get_category(`latest`)
    }
    static async get_popular(page = 1){
        return await get_category(`popular_${page}`)
    }
    static async get_completed(page = 1){
        return await get_category(`completed_${page}`)
    }
    static async get_Romance(page = 1){
        return await get_category(`Romance_${page}`)
    }
    static async get_Comedy(page = 1){
        return await get_category(`Comedia_${page}`)
    }
    static async get_Drama(page = 1){
        return await get_category(`Drama_${page}`)
    }
    static async get_Accion(page = 1){
        return await get_category(`Acción_${page}`)
    }
    static async get_Webcomic(page = 1){
        return await get_category(`Webcomic_${page}`)
    }




 }
 
 //probar metodos
 const result = await Mangas.get_popular(89)
 console.log(result.result[0]);
 console.log(result.pagination);

