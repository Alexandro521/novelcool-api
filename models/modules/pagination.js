export function pagination($){

    const currentPage = $(".page-navone").find('.vertical-top a .select').text();
    const lastPage = $(".page-navone .visible-inlineblock-pm .para-h8").text();
    return {
        currentPage: currentPage,
        lastPage:lastPage
    }
}