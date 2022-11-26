//création de l'array contenant les données
let data = [];
for (let i=0; i<100; i++) {
  let x = i%10; // chiffre des unités
  let y = Math.trunc(i/10); // chiffre des dizaines
  let coordinates = new Coordinates(x, y);
  let cell = new Cell("free", coordinates);
  data.push(cell);
}

//instanciation des différents objets
let billyTheKid = new Character('PlayerBilly', 'Billy The Kid', 'url(img/billy.jpg)');
let patGarrett = new Character('PlayerPatt', 'Pat Garrett', 'url(img/sheriff.jpg)');
let colt = new Weapon('WeaponColt', 'Colt', 20, 'url(img/colt.jpg)');
let winchester = new Weapon('WeaponWinchester', 'Winchester', 20, 'url(img/winchester.jpg)');
let axe = new Weapon('WeaponAxe', 'Axe', 10, 'url(img/axe.jpg)');
let whip = new Weapon('WeaponWhip', 'Whip', 10, 'url(img/whip.jpg)');
let board = new Board();

// logique du jeu

billyTheKid.insertCharacter();// on insert les persos, les armes et les murs
patGarrett.insertCharacter();
colt.insertWeapon();
winchester.insertWeapon();
axe.insertWeapon();
whip.insertWeapon();
board.insertWalls();
board.drawBoard(); // puis on dessine le board
board.displayActivePlayer();// on affiche le joueur actif
board.activeplayer.verifyCharacterPositionBeforeStart();//le joueur actif vérifie les cases adjacentes


document.getElementById('btnup').addEventListener("click", function(){
  board.activeplayer.characterMove('up');// au click le joueur actif se déplace
  board.gameTour();//réunit les différentes fonctions (changement d'arme, conditions pour combattre, changement de joueur...)
});
document.getElementById('btndown').addEventListener("click", function(){
  board.activeplayer.characterMove('down');
  board.gameTour();
});
document.getElementById('btnright').addEventListener("click", function(){
  board.activeplayer.characterMove('right');
  board.gameTour();
});
document.getElementById('btnleft').addEventListener("click", function(){ // beaucoup de redondance de code
  board.activeplayer.characterMove('left');
  board.gameTour();
});
document.getElementById('btnattack').addEventListener("click", function(){
  board.activeplayer.characterAttack();
  board.displayActivePlayer();
});
document.getElementById('btndefend').addEventListener("click", function(){
  board.activeplayer.characterDefend();
  board.displayActivePlayer();
});
document.getElementById('btnnext').addEventListener("click", function(){
  board.changePlayer();
  board.displayActivePlayer();
});
