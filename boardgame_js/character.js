//constructor character

class Character {

  constructor(id, name, picture) {
    this.id = id;
    this.name = name;
    this.health = 100;
    this.weapon = null;
    this.picture = picture;
    this.cell = null;
    this.defendMode = false;
  }

  insertCharacter() { // insertion des personnages
    let nbOfCharacterToInsert = 1;
    let nbOfCharacterInserted = 0;
    while (nbOfCharacterInserted<nbOfCharacterToInsert) {
      let randomIndex = Math.floor(Math.random() * data.length);
      let randomCell = data[randomIndex];
      if (randomCell.state === "free") {
        randomCell.state = "occupiedcharacter";
        randomCell.character = this;
        this.cell = randomCell;
        nbOfCharacterInserted++;
      }
    }
  }

  verifyAdjacentCell(position) { // vérification des 4 cellules adjacentes
    let currentCellCoords = this.cell.coordinates;
    switch(position) {
      case 'up':
      if (currentCellCoords.y > 0) {
        let upCellCoords = new Coordinates (currentCellCoords.x,currentCellCoords.y-1);
        let upCell = board.getCellFromCoordinates(upCellCoords);
        if (upCell.state === "occupiedcharacter") {
          return true
        }
      }
      break;
      case 'down':
      if (currentCellCoords.y < 9) {
        let downCellCoords = new Coordinates (currentCellCoords.x,currentCellCoords.y+1);
        let downCell = board.getCellFromCoordinates(downCellCoords);
        if (downCell.state === "occupiedcharacter") {
          return true
        }
      }
      break;
      case 'left':
      if (currentCellCoords.x > 0) {
        let leftCellCoords = new Coordinates (currentCellCoords.x-1,currentCellCoords.y);
        let leftCell = board.getCellFromCoordinates(leftCellCoords);
        if (leftCell.state === "occupiedcharacter") {
          return true
        }
      }
      break;
      case 'right':
      if (currentCellCoords.x < 0) {
        let rightCellCoords = new Coordinates (currentCellCoords.x+1,currentCellCoords.y);
        let rightCell = board.getCellFromCoordinates(rightCellCoords);
        if (rightCell.state === "occupiedcharacter") {
          return true
        }
      }
      break;
    }
  }


  verifyCharacterPositionBeforeStart() {// vérifie les cellules adjacentes avant le début du tour
    if (this.verifyAdjacentCell('up') === true || this.verifyAdjacentCell('down') === true || this.verifyAdjacentCell('left') === true || this.verifyAdjacentCell('right') === true) {
      alert ("Characters on adjacents cells!");
      window.location.reload();
    }
  }

  characterMove(direction) {// déplacement du personnage
    let currentCell = this.cell;
    let destinationCoordinates = this.cell.coordinates;
      switch (direction) {
        case 'up':
        if (destinationCoordinates.y > 0) {
          let coords = new Coordinates (destinationCoordinates.x, destinationCoordinates.y-1);
          let cell = board.getCellFromCoordinates(coords); // on récupère la cellule en incrémentant les coordonnées
          if (cell.state === "occupiedwall" || cell.state === "occupiedcharacter") { // si mur ou personnage : stop
            alert ("It's not accessible!");
            board.step--;
          } else {
            destinationCoordinates = coords;// sinon les coordonnées de destination prennent cette nouvelle valeur
          }
        } else if (destinationCoordinates.y === 0) {
          alert ("Don't leave the board!");
          board.step--;
        }
        break;
        case 'down':
        if (destinationCoordinates.y < 9) {
          let coords = new Coordinates (destinationCoordinates.x, destinationCoordinates.y+1);
          let cell = board.getCellFromCoordinates(coords);
          if (cell.state === "occupiedwall" || cell.state === "occupiedcharacter") {
            alert ("It's not accessible!");
            board.step--;
          } else {
            destinationCoordinates = coords;
          }
        }
        else if (destinationCoordinates.y === 9) {
          alert ("Don't leave the board!");
          board.step--;
        }
        break;
        case 'right':
        if (destinationCoordinates.x < 9) {
          let coords = new Coordinates (destinationCoordinates.x+1, destinationCoordinates.y);
          let cell = board.getCellFromCoordinates(coords);
          if (cell.state === "occupiedwall" || cell.state === "occupiedcharacter") {
            alert ("It's not accessible!");
            board.step--;
          } else {
            destinationCoordinates = coords;
          }
        }
        else if (destinationCoordinates.x === 9) {
          alert ("Don't leave the board!");
          board.step--;
        }
        break;
        case 'left':
        if (destinationCoordinates.x > 0) {
          let coords = new Coordinates (destinationCoordinates.x-1, destinationCoordinates.y);
          let cell = board.getCellFromCoordinates(coords);
          if (cell.state === "occupiedwall" || cell.state === "occupiedcharacter") {
            alert ("It's not accessible!");
            board.step--;
          } else {
            destinationCoordinates = coords;
          }
        }
        else if (destinationCoordinates.x === 0) {
          alert ("Don't leave the board!");
          board.step--;
        }
        break;
      }
    let destinationCell = board.getCellFromCoordinates(destinationCoordinates);
    console.log(destinationCell);
    if (this.cell.weapon === null) { // on intervertir les contenus
      currentCell.character = null;
      currentCell.state = "free";
      destinationCell.character = this;
      destinationCell.state = "occupiedcharacter";
      this.cell = destinationCell;
      board.drawBoard();
    } else if (this.cell.weapon !== null) {
      currentCell.character = null;
      currentCell.state = "occupiedweapon";
      destinationCell.character = this;
      destinationCell.state = "occupiedcharacter";
      this.cell = destinationCell;
      board.drawBoard();
    }
    board.step++; // on incrémente le compteur
    board.checkStep();// on vérifie si il faut changer de joueur
  }

  changeWeapon() { // changement d'arme lorsque perso et arme sur la même cellule
    if (this.cell.weapon !== null && this.weapon === null) {
      this.weapon = this.cell.weapon;
      this.cell.weapon = null;
    } else if (this.cell.weapon !== null && this.weapon !== null) {
      let weaponOne = this.weapon;
      let weaponTwo = this.cell.weapon;
      this.weapon = weaponTwo;
      this.cell.weapon = weaponOne;
    }
  }

  verifyConditionsToAttackOrDefend() { // on vérifie que les persos soient sur une cellule adjacente pour autoriser l'attaque ou la défense
    if (billyTheKid.verifyAdjacentCell('up') === true || billyTheKid.verifyAdjacentCell('down') === true || billyTheKid.verifyAdjacentCell('right') === true || billyTheKid.verifyAdjacentCell('left') === true ||
        patGarrett.verifyAdjacentCell('up') === true || patGarrett.verifyAdjacentCell('down') === true || patGarrett.verifyAdjacentCell('right') === true || patGarrett.verifyAdjacentCell('left') === true) {
      return true;
    }
  }



  characterAttack() { // phase d'attaque
    if (this.verifyConditionsToAttackOrDefend() === true) {
      if (this === billyTheKid) {
        if (this.weapon !== null && patGarrett.defendMode === false) {
          patGarrett.health = patGarrett.health - billyTheKid.weapon.power;
        } else if (this.weapon !== null && patGarrett.defendMode === true) {
          patGarrett.health = patGarrett.health - (billyTheKid.weapon.power)/2;
        } else if (this.weapon === null) {
          alert ("Billy, you need a weapon!");
        }
        patGarrett.defendMode = false;
      } else if (this === patGarrett) {
        if (this.weapon !== null && billyTheKid.defendMode === false) {
          billyTheKid.health = billyTheKid.health - patGarrett.weapon.power;
        } else if (this.weapon !== null && billyTheKid.defendMode === true) {
          billyTheKid.health = billyTheKid.health - (patGarrett.weapon.power)/2;
        } else if (this.weapon === null) {
          alert ("Pat, you need a weapon!");
        }
        billyTheKid.defendMode = false;
      }
      if (billyTheKid.health === 0) {
        alert ("End Of The Game! Pat is the winner!");
        window.location.reload();
      } else if (patGarrett.health === 0) {
        alert ("End Of The Game! Billy is the winner!");
        window.location.reload();
      }
      document.getElementById('billyhealth').innerHTML = billyTheKid.health;
      document.getElementById('pathealth').innerHTML = patGarrett.health;
      if (this.weapon !== null) {
      board.changePlayer();
      }
    }
  }


  characterDefend() { // mode défense
    if (this.verifyConditionsToAttackOrDefend() === true) {
      if (this === billyTheKid) {
        billyTheKid.defendMode = true;
      } else if (this === patGarrett) {
        patGarrett.defendMode = true;
      }
      board.changePlayer();
    }
  }

  displayWeapon() {
    if (this === billyTheKid && billyTheKid.weapon !== null) {
      document.getElementById("billyweapon").innerHTML = billyTheKid.weapon.name + '-' + 'power :' + ' ' + billyTheKid.weapon.power;
    } else if (this === patGarrett && patGarrett.weapon !== null) {
      document.getElementById("patweapon").innerHTML = patGarrett.weapon.name + '-' + 'power :' + ' ' + patGarrett.weapon.power;
    }
  }

}
