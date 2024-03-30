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
    static async get_info(id){
       const url = `${mainUrl()}novel/${id}.html`;
       const response = await AxiosGet(url);
       const $ = cheerio.load(response.data);
       //#Elementos
       const img = $('.bookinfo-pic-img ').attr('src');
       const title = $('.bk-side-intro .bk-side-intro-most .bookinfo-title').text();
       const bookType = $('.site-content .bookinfo-module .bk-intro .bookinfo-pic .book-type').text();
       const author = $('.bk-side-intro .bk-side-intro-most .bookinfo-author a span').text()
       const followers = $('.for-pc .bk-data').children().first().find('.bk-data-val').text()
       const rate = $({...$('.for-pc .bk-data').children()}[1]).find('.bk-data-val').text();
       const views = $('.for-pc .bk-data').children().last().find('.bk-data-val').text()
       const description = $('.bk-summary .bk-summary-txt').text();
       const genres = []
       $('.for-pc .bk-cates .bookinfo-category-list > .bk-cate-item ').each((ind,Element)=>{
           const genre =  $(Element).find('a span').text()
           if(genre) genres.push(genre) 
       })
       const chapters = $(' .chapter-item-list  .chp-inner-ls > .chp-item');
       const chaptersList = []

       for(let i = 0; i <  chapters.length;i++){
            const Element = chapters[i]
            const chapterId = {...$(Element).find('a').attr('href').match(/chapter\/(.+)$/
            )}[1]
            const chapterTitle = $(Element).find('.chapter-item-title .chapter-item-headtitle').text();
            const chapterViews = $(Element).find('.chapter-item-views span').text();
            const chapterDate = $(Element).find('.chapter-item-time').text();
            chaptersList.push({
                chapterId:chapterId,
                chapterTitle:chapterTitle,
                chapterViews:chapterViews,
                chapterDate:chapterDate
            })
       }    

       return {
        mangaInfo:{
            img: img,
            title:title,
            bookType:bookType,
            author:author,
            followers:followers,
            rate:rate,
            views:views,
            description:description,
            genres:genres,
            chaptersList: chaptersList
        }}
    }
    static async chapter_read(){

        const url = 'https://es.novelcool.com/chapter/Cap-tulo-11/5291879/-10-1.html'
       const response = await AxiosGet(url);

        const $ = cheerio.load(response.data)
        const pages = $('.site-content .mangaread-page .mangaread-pagenav .sl-page > option').length/2
        
        const title = $('.mangaread-title').children().first().attr('title')+'/'+$('.mangaread-title').children().last().attr('title');
        const prevChapter = $('.mangaread-top').find('.mangaread-prev-btn a').attr('href')
        let nextChapter = ''
        const imgList = []
       $('.mangaread-img > .pic_box').each((index,Element)=>{
            const img = $(Element).find('img').attr('src')
           imgList.push(img)
        })
        for(let i = 1; i<pages;i++){

            const url = `https://es.novelcool.com/chapter/Cap-tulo-11/5291879/-10-${i+1}.html`
            
            const response = await AxiosGet(url);

            const $ = cheerio.load(response.data)
            nextChapter =  $('.mangaread-top').find('.mangaread-next-btn a').attr('href')
            $('.mangaread-img > .pic_box').each((index,Element)=>{
                const img = $(Element).find('img').attr('src')
               imgList.push(img)
            })
        }
       // console.log(imgList)
        console.log(imgList.length)
        return {
            captitle:title,
            prevChapter:prevChapter,
            nextChapter:nextChapter,
            pages: imgList
        }
 }
}
 //probar metodos
 const result = await Mangas.chapter_read()

 console.log(result);


