//constructor weapon

class Weapon {

  constructor(id, name, power, picture) {
    this.id = id;
    this.name = name;
    this.power = power;
    this.picture = picture;
    this.cell = null;
    this.character = null;
  }

  insertWeapon() { 
    let nbOfWeaponToInsert = 1;
    let nbOfWeaponInserted = 0;
    while (nbOfWeaponInserted<nbOfWeaponToInsert) {
      let randomIndex = Math.floor(Math.random() * data.length);
      let randomCell = data[randomIndex];
      if (randomCell.state === "free") {
        randomCell.state = "occupiedweapon";
        randomCell.weapon = this;
        this.cell = randomCell;
        nbOfWeaponInserted++
      }
    }
  }

}
