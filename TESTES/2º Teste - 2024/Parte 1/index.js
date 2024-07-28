
// Array com imagens a renderizar nos buttons 1 a 12
// quando se clicar num button correspondente às posições aleatórias dos ovos de Páscoa
// a imagem no array é substituída pela imagem do ovo.png 
let eggsList = ["", "DiscoverEggs.png","DiscoverEggs.png","DiscoverEggs.png","DiscoverEggs.png", "DiscoverEggs.png","DiscoverEggs.png","DiscoverEggs.png","DiscoverEggs.png", "DiscoverEggs.png","DiscoverEggs.png","DiscoverEggs.png","DiscoverEggs.png"]
let numberClick = 0;

document.getElementById('msgParabens').innerHTML= ""
renderTable()
eggsPositions()
playEasterEggs()


// Tabale com 9 células com imagens do pintainho
function renderTable() {
    let celTable = document.querySelectorAll("td")
    let id=1
    celTable.forEach(element => {
        element.innerHTML= ` 
             <button id= "btn${id}" type="button" class="btn btn-light btn-lg">
                <img id="${id}" class="img-fluid" src="DiscoverEggs.png" alt="DiscoverEggs">
            </button>
        `;
        id++
        
    });
}



// Gera aleatoriamente 2 posições do OVO de Páscoa
function eggsPositions(){
    // primeira posição gerada para o ovo de Páscoa
    let positionEgg1 = parseInt(1+ Math.random()*11)  // de 1 a 12
    eggsList[positionEgg1] = "Ovo.png"
    console.log(positionEgg1)

    // segunda posição gerada para o ovo de Páscoa
    let positionEgg2
    do {
        positionEgg2 = parseInt(1+ Math.random()*11)  // de 1 a 12

    }
    while (positionEgg2 == positionEgg1)  // Para assegurar que não vai gerar o mesmo número

    eggsList[positionEgg2] = "Ovo.png"
    console.log(positionEgg2)

}


function playEasterEggs() {

let celTable = document.querySelectorAll("td")
celTable.forEach(element => {
        element.addEventListener("click", function(event) {
                 //   alert(this.parentNode.rowIndex + 1)
                //   alert(this.cellIndex + 1)
                let id = (this.cellIndex + 1) + this.parentNode.rowIndex *4

                if (eggsList[id]!= "DiscoverEggs.png") { 
                    const image = document.getElementById(`${id}`)
                    image.src = `${eggsList[id]}`
                    if (numberClick==0) {
                        setTimeout(function() { 
                            image.src = "DiscoverEggs.png"
                        }, 2000)
                    }
                    numberClick+=1         
                    if (numberClick==3) {
                        document.getElementById('msgParabens').innerHTML = "Parabéns, encontraste os Ovos de Páscoa!"  
                    }
                 
                }  // if

        })  // listener
    })  // foreach
} //


