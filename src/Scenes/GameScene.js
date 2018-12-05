import 'phaser';
import Player from '../Sprites/Player';


export default class GameScene extends Phaser.Scene {
    constructor (key) {
        super(key);
        this.prueba = true;
        
    }


    init (data) {
        this._LEVEL = data.level;
        this._LEVELS = data.levels;
        this._NEWGAME = data.newGame;
        this.loadingLevel = false;
    }

    

    create () {

        this.events.on('resize', this.resize, this);
        this.cursors = this.input.keyboard.createCursorKeys();

        // create our tilemap
        this.createMap();

        // create our player
        this.createPlayer();

        

        this.addCollisions();


        // make the camera follow the player
        this.cameras.main.startFollow(this.player); //aqui la camara sigue al jugador
        
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 31, end: 51 }),
            frameRate: 50,
            // repeat: -10
        });
    
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 31, end: 51 }),
            frameRate: 50,
            repeat: -10
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { start: 1, end: 12 }),
            frameRate: 50
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { start: 15, end: 20 }),
            frameRate: 50
        });

        this.events.emit('tiempo', this.prueba);

        this.music = this.sound.add('animalGame');
        this.music.play();

        
        


    
    }

    update () {
        this.player.update(this.cursors);
        
    };

    


    addCollisions () {
        
        this.physics.add.collider(this.player, this.capaPla);
        
        this.physics.add.collider(this.player, this.capaPla2);
        
        this.physics.add.collider(this.player, this.capaPuerta, this.player.enemyCollision.bind(this.player));
    
    };
    

    

    createPlayer () {
        this.map.findObject('Player', (obj) => {
            if (this._NEWGAME && this._LEVEL === 1) {
                if (obj.type === 'StartingPosition') {
                    this.player = new Player(this, obj.x, obj.y);
                }
            } else {
                this.player = new Player(this, obj.x, obj.y);
            }
        });
    }



    resize (width, height) {
        if (width === undefined) {
        width = this.sys.game.config.width;
        }
        if (height === undefined) {
        height = this.sys.game.config.height;
        }
        this.cameras.resize(width, height);
    }


    createMap () {

        // create the tilemap
        this.map = this.make.tilemap({ key: 'map' });

        // add tileset image
        this.groundTiles = this.map.addTilesetImage('tile','tiles');
        this.arbolTiles = this.map.addTilesetImage('Tree17', 'tree');
        this.puertaTiles = this.map.addTilesetImage('Door_2_progress_1', 'portal');
        this.cajaTiles = this.map.addTilesetImage('tiles', 'caja');

        // this.gemaTiles = this.map.addTilesetImage('gem3', 'gema');

        // create our layers
        this.capaMap = this.map.createDynamicLayer('fondo', this.groundTiles, 0, 0);
        this.capaMap = this.map.createDynamicLayer('montanias', this.groundTiles, 0, 0);
        this.capaArbol = this.map.createDynamicLayer('arboles', this.arbolTiles, 0, 0);
        this.capaPuerta = this.map.createDynamicLayer('puerta', this.puertaTiles, 0, 0);
        this.capaPla = this.map.createDynamicLayer('plataformas', this.groundTiles, 0, 0);
        this.capaPla2 = this.map.createDynamicLayer('plataformas2', this.cajaTiles, 0, 0);

        this.physics.world.bounds.width = this.groundTiles.width;
        this.physics.world.bounds.height = this.groundTiles.height;

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels); //aqui se establecen los limites de la camara

        

        this.capaPla.setCollisionByExclusion([-1]);
        this.capaPla2.setCollisionByExclusion([-1]);
        this.capaPuerta.setCollisionByExclusion([-1]);
    }
};