import cheerio from 'cheerio';
import axios from 'axios';
import { getCategoryList } from './modules/categoryList.js';
import { pagination } from './modules/pagination.js';
import { getMangas } from './modules/getMangas.js';

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
    const categories = getCategoryList($)//nota:utilizar memorizacion para esto

    return {
        categoryGroup: categories,
        section: categoryTitle,
        result: mangaList,
        pagination: page
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
    static async get_category(Category_name='index',page = 1){
        return await get_category(`${Category_name}_${page}`)
    }
 }
 //probar metodos
 const result = await Mangas.get_category('Comedia')
 console.log(result.categoryGroup);
 console.log(result.section);
 console.log(result.result[3]);
 console.log(result.pagination);

