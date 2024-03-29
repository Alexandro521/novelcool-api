

    
    const ageRange = null
   export function getCategoryList($){
    const categoryList = []
       const list =  $('.category-group .category-list > a')

       for(let i = 0; i< list.length;i++){
            const Element = $(list[i]).attr('title');
            if(Element){
          categoryList.push(Element)
            }
       }
       return {
        Status: ['All','Ongoing','Completed'],
        Genres: categoryList,
        Alphabetic: '[A-Z][0-9]',
        year: '[2024-1943]'
       }
    }
    export function filterCategoryList($){
      const categoryList = []
      const list =  $('.category-list > .category-id-item')

      for(let i = 0; i< list.length;i++){
           const Element = $(list[i]).attr('title');
           const id = $(list[i]).attr('cate_id');
           if(Element){

         categoryList.push({
            id: Number.parseInt(id),
            genre: Element

         })
           }
      }
      return {
       Genres: categoryList,
      }
   }


