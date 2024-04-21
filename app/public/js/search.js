const form = document.querySelector('form');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const data = e.target.elements.buscar.value;
    if(data){
        window.location = `/manga/search?query=${data}`
    }
})