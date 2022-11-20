import Hero from "./hero.js";
import Skill from "./skill.js";
export default class Player {
  constructor(username) {
    this.username = username;
    let yase = new Hero(
      "亚瑟",
      "./sources/heroes/yase1.png",
      "./sources/skins/301660.png"
    );

    let luban = new Hero(
      "鲁班",
      "./sources/heroes/luban1.png",
      "./sources/skins/301120.png"
    );
    this.heroes = [yase, luban];
  }
}

