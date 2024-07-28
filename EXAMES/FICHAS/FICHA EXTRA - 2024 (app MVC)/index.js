
import * as data from "./init.js";
import FilmModel from "./filmsModel.js";



$(document).ready(function(e) {
    $('img[usemap]').rwdImageMaps(); 
//Allows imagemaps to be used in a responsive design 
// by recalculating the area coordinates 
// to match the actual image size on load and window.resize
});



let films= []

films = data.init();   // inicializa array filns 
renderCatalog(films);   // renderizar catalogo incluso no array filmes

/**
 * Submit event listener: click no form
 */
document.querySelector('#frmFilms').addEventListener('submit', function (event) {
    event.preventDefault();
    let filmTitle  = document.getElementById('filmTitle').value
    let filmCategory = document.getElementById('filmCategory').value
    let filmYear = document.getElementById('filmYear').value
    let filmTrailer = document.getElementById('filmTrailer').value
    let filmRating = document.getElementById('filmRating').value
    
    if(filmExists(filmTitle)) {
        alert(`O filme ${filmTitle} já existe`)
    }
    else
    {    // adiciona ao array
        films.push(new FilmModel(filmTitle, filmCategory, filmYear, filmTrailer, filmRating));
        // atualizar localStorage com o novo objeto adicionado ao array
        localStorage.setItem("films", JSON.stringify(films));
        //renderiza / atualiza o catálogo 
        renderCatalog(films);
    }
      
});


// Verifica se banda existe 
function filmExists(filmTitle) {
     return (films.some(element => element.title == filmTitle) );
}


// FILTER
document.getElementById("btnFilter").addEventListener('click', function() {
  
    let filmsFiltered = films;
    let filmCategory = document.getElementById("filterCategory").value
    if (filmCategory != "All categories") {
          filmsFiltered = films.filter(element => element.category == filmCategory)
    }
    renderCatalog(filmsFiltered)
 });


 // SORT +
document.getElementById("btnSortAsc").addEventListener('click', function() {
  
   films.sort((a, b) => (a.title > b.title) ? 1 :-1)
   renderCatalog(films)
 });


  // SORT -
document.getElementById("btnSortDesc").addEventListener('click', function() {
  
    films.sort((a, b) => (a.title < b.title) ? 1 :-1)
    renderCatalog(films)
  });


   // ANO - menor para maior
document.getElementById("btnSortYear").addEventListener('click', function() {
  
    films.sort((a, b) => (a.year < b.year) ? 1 :-1)
    renderCatalog(films)
  });


// EXIBIR O CATÁLOGO DE CARDS  com os objetos Dog
function renderCatalog(films) {
    let result = "";
    // percorre todas as instancias de escapeRooms
    for (const film of films) {
        result += generateCard(film);    
    }
    // Atribuição de todos os cards gerados ao elemento com id myCatalog
    document.querySelector("#myCatalog").innerHTML = result;

    // CLICAR no botão VER +
    const btnsViewImages = document.getElementsByClassName("viewMore");
    for (const button of btnsViewImages) {
        button.addEventListener("click", () => {

            alert("abrir modal com imagem do filme " + button.id)
        });
    } 

}


// GERAR CARD
function generateCard(film) {

    let result = ` 
          <div class="col">
              <div class="card  bg-light mb-3" style="widht: 180px; ">
                  <iframe 
                    id="iframeVideo" 
                    title ="youtube video"
                    height="280" 
                    allow="autoplay; clipboard-write;picture-in-picture" 
                    src="${film.trailer}">
                 </iframe>
                  <div class="card-body">
                      <h6 class="card-title">${film.title}</h6>
                      <h6 class="card-text"> Category: ${film.category}</h6>
                      <h6 class="card-text"> Rating: ${film.rating}</h6>
                      <a href="#" id = "${film.title}" class="btn btn-info viewMore">Ver +</a>
                  </div>    
              </div>
          </div>
          `;
    
    return result;
    }
    




