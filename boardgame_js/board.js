

class Board {

  constructor(data) {
    this.data = data;
    this.activeplayer = this.chooseTheFirstCharacter();
    this.endtour = false;
    this.step = 0;
  }

  insertWalls() { // insertion des murs
    let nbOfWallsToInsert = 10;
    let nbOfWallsInserted = 0;
    while (nbOfWallsInserted < nbOfWallsToInsert) {
      let randomIndex = Math.floor(Math.random() * data.length);
      let randomCell = data[randomIndex];
      if (randomCell.state === "free") {
        randomCell.state = "occupiedwall";
        nbOfWallsInserted++;
      }
    }
  }

  drawBoard() { // dessin du board
    let gamelocation = document.getElementById('game_location');
    gamelocation.innerHTML = '';
    let tbl  = document.createElement('table');
      for(let i=0; i<data.length/10; i++) {
        let tr = tbl.insertRow();
          for(let j=0; j<data.length/10; j++) {
            let td = tr.insertCell();
            let cellToDraw = data[10*i + j];
            if (cellToDraw.state === "occupiedwall") {
              td.style.backgroundColor = "grey";
            } else if (cellToDraw.state === "occupiedcharacter") {
                td.style.backgroundImage = cellToDraw.character.picture;
            } else if (cellToDraw.state === "occupiedweapon") {
                td.style.backgroundImage = cellToDraw.weapon.picture;
            }
          }
      }
      gamelocation.appendChild(tbl);
  }

  getCellFromCoordinates(coordinates) { // permet de récupérer une cellule à partir de coordonnées
    let width = (data.length/10);
    let index = (coordinates.x) + (width*coordinates.y);
    return data[index];
  }


  chooseTheFirstCharacter() { // selectionne le 1er personnage actif
   let players = [billyTheKid, patGarrett];
   let randomIndex = Math.floor(Math.random() * players.length);
   let randomCharacter = players[randomIndex];
   return randomCharacter;
 }

 changePlayer() { // permet de changer de joueur
   if (this.activeplayer === billyTheKid) {
    this.activeplayer = patGarrett;
  } else {
    this.activeplayer = billyTheKid;
   }
   this.endtour = false;
   this.step = 0;
 }

 checkStep() { // compteur permettant de gérer le nombre de déplacements à chaque tour
   if (this.step === 3) {
     this.endtour = true;
   }
 }

 displayActivePlayer() { // affiche le joueur actif dans la zone de commande
   if (this.activeplayer === billyTheKid) {
     document.getElementById("activeplayer").innerHTML = 'Billy The Kid is active';
   } else {
     document.getElementById("activeplayer").innerHTML = 'Pat Garrett is active';
   }
 }


 gameTour() { // réunit les différentes action d'un tour de jeu (sauf les mouvements)
   this.activeplayer.changeWeapon();
   this.activeplayer.displayWeapon();
   this.activeplayer.verifyConditionsToAttackOrDefend();
   if (this.endtour === true) {
     this.changePlayer();
     this.displayActivePlayer();
   }
 }

}
