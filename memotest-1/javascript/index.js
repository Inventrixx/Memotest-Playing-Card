
  /*class Users {
    constructor (nameUser, level, attempts) {
      this.nameUser = nameUser;
      this.level = level;
      this.attempts = attempts;
    }
    //Methods
    //Necesito por lo menos un método que guarde mi información de clase y/o objetos en un array.
    //también necesito el método que chequee el nombre
    checkingName() { //Hay que correjir esto.
      $("button").on("click", function () {
        if  ($("#userName").val()  === "") {
          $(".errorMessage").text("El nombre es requerido");
          }
        });
    }
    //podré crear un método que de mi clase cree un objeto?

  }*/
//voy a intentar con objetos...

//creo mi arreglo vacío que lo voy a ir pusheando

var rankingUsers = [];

//variable global para mis clicks

//mis variables globales
var clicks = 0;

var card1 = null;

var card2 = null;

var match = 0;

var pifies = 0;
//variable global de "intentos"
var intentos = 0;


//función que crea mi objeto
/*function obtainObjectUser() {
  var nameUser = $("#userName").val();
  var easyMode = $(".easy");
  var mediumMode = $(".medium");
  var hardMode = $(".hard");
  // esto tengo que ver como hacerlo: var attempts 
  //Y si uso un if? que detecte cada botón seleccionado

  
}*/


//creo mi array de imágenes, para que sean agregadas de manera dinámica.
var uncoveredImg = [
  {number: 1, url:"../imagenes/alce.jpg"},
  {number: 1, url: "../imagenes/alce.jpg"},
  {number: 2, url: "../imagenes/epelante.jpg"},
  {number: 2, url: "../imagenes/epelante.jpg"},
  {number: 3, url: "../imagenes/nena.jpg"},
  {number: 3, url: "../imagenes/nena.jpg"},
  {number: 4, url: "../imagenes/peces.jpg"},
  {number: 4, url: "../imagenes/peces.jpg"},
  {number: 5, url: "../imagenes/unichancho.jpg"},
  {number: 5, url: "../imagenes/unichancho.jpg"},
  {number: 6, url: "../imagenes/zapas.jpg"},
  {number: 6, url: "../imagenes/zapas.jpg"}
];
//

//Random imgs
uncoveredImg = uncoveredImg.sort(function (a,b) {
  return Math.random() - 0.5;
});



//creating board
function creandoMiTablero() {
  var miContent = $(".container-2-board");
  for (let i = 0; i < 12; i++) {
    var cont2Img = $("<div></div>");
    cont2Img.addClass("cont2Img cont2Img--card")
    var card = $("<div class='card'></div>");
    var cardFaceCovered = $("<div class='card__face card__face--covered'></div>");
    var cardFaceUncovered = $("<div class='card__face card__face--uncovered'></div>");
    card.attr("id", i);
    card.data("imgValue", uncoveredImg[i].number)

    var imgCovered = $("<img class='tapada' />");
    imgCovered.attr("src", "../imagenes/tapada.jpg")
    var imgUncovered = $("<img class='destapada' />")

    miContent.append(cont2Img);
    cont2Img.append(card);
    card.append(cardFaceCovered);
    card.append(cardFaceUncovered);
    cardFaceCovered.append(imgCovered);
    cardFaceUncovered.append(imgUncovered);
  }
}

 //ITERANDO MIS 12 IMGS!

 function iterandoFuerteUncoveredImg() {
  for (let i = 0; i < uncoveredImg.length; i++) {
    $(".card__face--uncovered img").eq(i).attr("src", uncoveredImg[i].url);
    //$(".card__face--uncovered img").eq(i).attr("data-id", uncoveredImg[i].number);
     }
}

//flipping card
function flippinCard() {
 
  $(".card").on("click", function() {
    var miCartaSeleccionada = $(this);
    const valueCard = $(this).data('imgValue');
    const valueId = $(this).attr('id');
    miCartaSeleccionada.addClass("is-flipped");
    clicks = clicks + 1;
    
    if (clicks === 1) {
      card1 = {
        valueCard,
        valueId
      }
      
    }
    else {
      card2 = {
        valueCard,
        valueId
      }
      comparandoImagenes(card1, card2) 
      clicks = 0
    }

   /*var miData = $(this).find(".destapada")
   for (let i = 0; i < miData.length; i++) {
     var comparandoDatas = miData[i].dataset.id
     if (comparandoDatas == comparandoDatas) {
       return true;
     
   }*/
  function comparandoImagenes(imagen1, imagen2) {
    var seEncontro = false;
      if ( imagen1.valueCard === imagen2.valueCard && imagen1.valueId === imagen1.valueId) {
        setTimeout(function(){
        $("#" + imagen2.valueId).children().addClass("grayscale");
        $("#" + imagen1.valueId).children().addClass("grayscale");
        }, 700)
        seEncontro = true;

        match++;
        console.log("cantidad de matchs " + match)
        return seEncontro;
      }
      else {
        setTimeout(function(){
        $("#" + imagen1.valueId).removeClass("is-flipped");
        $("#" + imagen2.valueId).removeClass("is-flipped");
        }, 800)
        pifies++
        console.log("tus pifies son: " + pifies)
        return seEncontro;
      }
  }

 });
}

//showing images, another way
/*var myImgUncovered = $(".uncovered-img-container img");

for (let i = 0; i < myImgUncovered.length; i++) {
  myImgUncovered.eq(i).attr("src", uncoveredImg[i].url);
}*/


/*
function showImages() {
 $(".container-2-img").on("click", function() {
  
 });
 
}
*/

//función chequear nombre
function checkingName() {
  if ($("#userName").val() === "") {
    $(".errorMessage").text("El nombre es requerido");
    return false;
  }
  
}

//creo una función que filtre por dificultad

function easyMode() {
  var user = checkingName();
  if (user != false) {
   
   $(".container-1").toggle();
   $(".container-2").addClass("show-board");
  }
}


creandoMiTablero();
iterandoFuerteUncoveredImg();
flippinCard();