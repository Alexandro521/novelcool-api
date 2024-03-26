import cheerio from 'cheerio';
import axios from 'axios';

const axiosHead = {
    headers:{
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
      }
    } 
const mainUrl = 'https://es.novelcool.com/'

async function AxiosGet(url){
    return await axios.get(url,axiosHead)
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
            $(Element).find('.book-list > .book-item').each((mangaIndex,mangaElement)=>{
                const genresList = [];
                let regex = /\/([^\/]+)\.html$/;
                //elemento padre comun de todos los elementos
                const index = $(mangaElement).find('.book-info');
                const id = $(mangaElement).find('.book-pic a').attr('href').match(regex)
                const title = index.find('.book-name').text();
                const img = $(mangaElement).find('.book-pic a img').attr('cover_url');
                const typeManga = $(mangaElement).find('.book-pic a').find('.book-type-manga').text();
                $(mangaElement).find('.book-pic a').find('.book-data-info .book-tags > .book-tag').each((genreIndex,genreElement)=>{
                    const genre = $(genreElement).text()
                    genresList.push(genre)
                });
                const bookRate = index.find('.book-rate .book-rate-num').text();
                const description = index.find('.book-intro').text();
                const views = index.find('.book-data .book-data-item').find('.book-data-num').text();
                const dataTime = index.find('.book-data .book-data-item').find('.book-data-time').text();


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
                mangaList.push(mangaObject)
            })

            const sectionObject = {
                nameSection:nameSection,
                mangaList: mangaList
            }

            sectionList.push(sectionObject)
        })
        return sectionList
    }
 }
 const result = await Mangas.get_mangasIndex()
 console.log(result[0]);