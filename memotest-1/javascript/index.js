
//mis variables globales
var clicks = 0;

var card1 = null;

var card2 = null;

var player = {
  name: '',
  difficulty: '',
  attemptsByUser: 0,
  totalAttempts: 0,
}
var rankingUsers = [];
var attemptsMade = 0;

var pifies = 0;

var totalAttempts = 0; //global varial "attempts"

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

  function comparandoImagenes(imagen1, imagen2) {
    var seEncontro = false;
      if ( imagen1.valueCard === imagen2.valueCard && imagen1.valueId === imagen1.valueId) {
        setTimeout(function(){
        $("#" + imagen2.valueId).children().addClass("grayscale");
        $("#" + imagen1.valueId).children().addClass("grayscale");
        }, 700)
        attemptsMade = attemptsMade + 1
        youWin();
        seEncontro = true;
        return seEncontro
      }
      else {
        setTimeout(function(){
        $("#" + imagen1.valueId).removeClass("is-flipped");
        $("#" + imagen2.valueId).removeClass("is-flipped");
        }, 800)
      
        pifies = pifies + 1
        $(".attempts").text(pifies)
        youLose(pifies)
        return seEncontro;
      }
  }
 });
}

function youWin() {
  if (attemptsMade == 6) {
    verificarLocalStorage();
    rankingUsers.push(player);
    savingPlayers();
    creeatingRanking();
    player.attemptsByUser = pifies
    $(".modal").addClass("show-modal");
    $(".insert-text").text("Felicidades! Ganaste");
    var spanAttempts = $("<span class='attempts'>Con " + player.attemptsByUser + " intentos</span>")
    $(".modal-text").append(spanAttempts)

  }
}

function verificarLocalStorage() {
  var playersSaved = localStorage.getItem("winnerPlayers");
  if (playersSaved) {
    rankingUsers = JSON.parse(playersSaved);
  }
}

  function savingPlayers() {
    rankingToJSON = JSON.stringify(rankingUsers)
    JSON.parse(rankingToJSON)
    localStorage.setItem("winnerPlayers", rankingToJSON);

}

function youLose(wrongAttemps) {
  if (wrongAttemps === player.totalAttempts && attempts.made != 6) {
    $(".insert-text").text("Perdiste! Inténtalo de nuevo!");
    $(".modal").addClass("show-modal");
    $(".cont-ranking-table").addClass("hide-table")
  }
}

function creatingTable() {
  var tableRanking = $("<table id='ranking-table'></table>")
  var myContTable = $(".cont-ranking-table") 
  var tableHead = "<th>Nombre</th><th>Dificultad</th><th>Intentos Tot.</th><th>Intentos</th>"
  tableRanking.append(tableHead);
  myContTable.append(tableRanking);
}

function creeatingRanking() {
  var tableRanking = $("#ranking-table");
  for (let i = 0; i < rankingUsers.length; i++) {
    console.log("hola")
    var fila = $("<tr id='fila'></tr>")
    var tdNombre = "<td>" + rankingUsers[i].name + "</td>";
    var tdNivel = "<td>" + rankingUsers[i].difficulty + "</td>";
    var tdIntentosTotales = "<td>" + rankingUsers[i].totalAttempts + "</td>";
    var tdIntentosUsuario = "<td>" + rankingUsers[i].attemptsByUser + "</td>";

    fila.append(tdNombre);
    fila.append(tdNivel);
    fila.append(tdIntentosTotales)
    fila.append(tdIntentosUsuario);
    tableRanking.append(fila);
  }

}

function easyMode() {
  var user = checkingName();
  if (user != false) {
   
   $(".container-1").toggle();
   $(".container-2").addClass("show-board");

   attempts =  18;
   player.totalAttempts = attempts;
   chosenDifficulty = "fácil";
   player.difficulty = chosenDifficulty;
   $("#attempts").text(player.totalAttempts)
   $("#difficultyText").text(chosenDifficulty);
  }
}

function mediumMode() {
  var user = checkingName();
  if (user != false) {
   
   $(".container-1").toggle();
   $(".container-2").addClass("show-board");
   attempts = 12;
   player.totalAttempts = attempts;
   chosenDifficulty = "intermedio";
    player.difficulty = chosenDifficulty;
    $("#attempts").text(player.totalAttempts)
   $("#difficultyText").text(chosenDifficulty);
  }
}

function hardMode() {
  var user = checkingName();
  
  if (user != false) {
   $(".container-1").toggle();
   $(".container-2").addClass("show-board");
   attempts = 9;
   player.totalAttempts = attempts;
   chosenDifficulty = "difícil";
  player.difficulty = chosenDifficulty;
  $("#attempts").text(player.totalAttempts)
   $("#difficultyText").text(chosenDifficulty);  }
  
}

function checkingName() {
  var nameUser = $("#userName").val();
  if (nameUser === "") {
    $(".errorMessage").text("El nombre es requerido");

    return false;
  }
  else {
    player.name = nameUser;
    $("#nameUser").text(player.name)
    }
  }

  //reloadPage
$(".btn-reloadPage").on("click", function() {
  location.reload();
});


creandoMiTablero();
iterandoFuerteUncoveredImg();
flippinCard();
creatingTable();