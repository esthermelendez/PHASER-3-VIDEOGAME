import 'phaser';

export default class TitleScene extends Phaser.Scene{
    constructor(key){
        super(key);
        this.prueba = false;
    }

    preload(){
        this.load.image('title', '../assets/map.png');
        this.load.image('star', '../assets/star.png');
        this.load.audio('animal', '../assets/animal-crossing-them.mp3');
    }

    create(){
        this.fondo = this.add.image(700, 400, 'title');
        // this.fondo.setScale(3);

        this.titulo = this.add.text(380, 200, 'MARILO BRAS', { fontFamily: "Arial Black", fontSize: 74, color: "#DF7401" });
        this.titulo.setStroke('#DBA901', 16);
        //  Apply the shadow to neither stroke nor fill, if you don't need a shadow then don't call setShadow at all :)
        this.titulo.setShadow(2, 2, "#DF3A01", 2, false, false);

        this.text = this.add.text(300, 300, 'PRESIONA ESPACIO PARA COMENZAR', { fontFamily: "Arial Black", fontSize: 35, color: "#DF7401" });
        this.text.setStroke('#DBA901', 16);
        this.text.setShadow(2, 2, "#DF3A01", 2, false, false);

        

        this.timeEvent = this.time.addEvent({
            delay: 600,
            callback: this.createStars,
            loop: true,
            callbackScope: this
        });

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.events.emit('tiempo',this.prueba);

        this.music = this.sound.add('animal');
        this.music.play();

        
    }

    createStars(){
         this.physics.add.group({
            key: 'star',
            repeat: 13,
            setXY: { x: Phaser.Math.Between(-100, 400), y: -50, stepX: 250 }
        })
    }

    update () {
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            
            this.scene.start('Boot');
            this.music.stop();
        }
    }
}