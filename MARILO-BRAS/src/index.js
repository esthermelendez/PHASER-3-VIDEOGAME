import 'phaser';
import config from './config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import TitleScene from './Scenes/TitleScene';
import UIScene from './Scenes/UI';

class Game extends Phaser.Game {
    constructor () {
        super(config);
        this.scene.add('Boot', BootScene);
        this.scene.add('Game', GameScene);
        this.scene.add('Title', TitleScene);
        this.scene.add('UI', UIScene);
        this.scene.start('Title');
    }
}

window.game = new Game();
window.addEventListener('resize', (event) => {
    window.game.resize(window.innerWidth, window.innerHeight);
});


