import 'phaser';

export default class BootScene extends Phaser.Scene {
    constructor (key) {
        super(key);
    }
    preload () {

        //cargamos el mapa json
        this.load.tilemapTiledJSON('map', '../assets/map.json');
        this.load.spritesheet('tiles', '../assets/tile.png', {frameWidth: 65, frameHeight: 65});
        this.load.image('tree', '../assets/Tree17.png');
        this.load.image('portal', '../assets/Door_2_progress_1.png');
        this.load.image('gema', '../assets/gem3.png');
        this.load.image('caja', '../assets/tiles.png' )

        //cargamos al jugador
        this.load.spritesheet('player', '../assets/player3.png', { frameWidth: 201, frameHeight: 222 });
        this.load.audio('animalGame', '../assets/acgame.mp3');
        this.load.audio('winSound', '../assets/victory.mp3');
        this.load.audio('defeatSound', '../assets/defeat.mp3');
    }

    create () {
        this.scene.start('Game');
    }
};