
/**
 * Classe que modela uma banda de música
 */
 export default class Film {
  title = "";
  category = "";
  year = 0
  trailer = "";
  rating = 0;

  constructor(title, category, year, trailer, rating = 7) {
    this.title = title;
    this.category = category;
    this.year= year;
    this.trailer = trailer;
    this.rating = rating; 
  }


   /**
    * sets the year of the film 
    * @param {year} value
     */
   set year(value) {
      if (value  < 1950) {
        throw Error(`O ano do filme deve ser > 1950`);

      }
      else if (value > 2024) {
        throw Error ('O ano do filme não pode ser superior ao ano atual')
      }  
    else {      
        this.year= value
      }
   }

     /**
    * sets the year of the film 
    * @param {year} value
     */
     set rating(value) {
        if ((value  < 0) || (value >10)) {
          console.log ('O rating deve estar entre 0 e 10')
        }
        else   
          this.rating = value
        
    }

}  // class
