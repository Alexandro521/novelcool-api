//funcion para obtener un objeto con la informacion del manga
export function getMangas($,mangaElement){

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