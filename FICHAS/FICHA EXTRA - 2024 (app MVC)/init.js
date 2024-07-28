import FilmModel from "./filmsModel.js";

let films= []   // array de filmes

films = localStorage.films ? JSON.parse(localStorage.films) : [];

// Cria objectos / instancias da classe FilmModel e adiciona ao array films 
export function init() {
 
    if (!localStorage.films) {   // se não existerem filmes (key films) na localStorage

            let film = new FilmModel("Charlie e a Fábrica de Chocolate", "Fantasia", 2005, 
            "https://www.youtube.com/embed/OFVGCUIXJls?si=yyhExcGtrPnLOatb",
            6.7);
            films.push(film);
                
            film = new FilmModel("A Noiva Cadáver", "Thriller", 2005, 
            "https://www.youtube.com/embed/ZE5CbXVheJk?si=lw-1ikraTeDOfjj-",
            7.4);
            films.push(film);
        
            film = new FilmModel("A Viagem de Chihiro", "Fantasia", 2001, 
            "https://www.youtube.com/embed/SgZI655GgHk?si=Sf4r2jLUYJiNLBA1",
            8.6);
            films.push(film);

            film = new FilmModel("O Pianista", "Fantasia", 2002, 
            "https://www.youtube.com/embed/BFwGqLa_oAo?si=XvbD4-BoLx9jDvNe",
            8.5);
            films.push(film);

            film = new FilmModel("Dune - Duna", "Thriller", 2022, 
            "https://www.youtube.com/embed/n9xhJrPXop4?si=5I24qzvC0Wy8s0eW",
            8.0);
            films.push(film);
    }
    
    // armazena films na localStorage
    localStorage.setItem("films", JSON.stringify(films));

    // devolve array com bandas
    return films; 
    }