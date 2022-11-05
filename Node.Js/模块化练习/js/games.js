import Player from './player.js';
export default class Game {
  constructor() {
    this.player = null;
  }
  login(username) {
    //游戏登录方法,一旦登录就会生成player
    this.player = new Player(username);
  }
}
