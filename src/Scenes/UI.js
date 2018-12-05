import 'phaser';

export default class UIScene extends Phaser.Scene {
  constructor () {
    super({ key: 'UI', active: true });

      this.derrota = false;
    
    }

    init () {
    this.coinsCollected = 0;
    }

    create () {
    

    // get a reference to the game scene
    this.gameScene = this.scene.get('Game');

    this.info = this.add.text(10, 10, '', { font: '20px Arial', fill: '#000000' });
    this.timer = this.time.addEvent({ delay: 120000, callbackScope: this });
    


    this.win = this.add.text(440, 240, "Has Ganado", { fontFamily: "Arial Black", fontSize: 74, color: "#c51b7d" });
    this.win.setStroke('#de77ae', 16);
    //  Apply the shadow to neither stroke nor fill, if you don't need a shadow then don't call setShadow at all :)
    this.win.setShadow(2, 2, "#333333", 2, false, false);


    this.defeat = this.add.text(250, 240, "Se te acabó el tiempo", { fontFamily: "Arial Black", fontSize: 74, color: "#0101DF" });
    this.defeat.setStroke('#0B0B61', 16);
    //  Apply the shadow to neither stroke nor fill, if you don't need a shadow then don't call setShadow at all :)
    this.defeat.setShadow(2, 2, "#0B0B3B", 2, false, false);

    this.win.visible=false;

    this.timer.active = false;

    this.defeat.visible=false;

    this.info.visible=false;

    this.numero = 0;
    console.log(this.info);


    this.gameScene.events.on('tiempo', (prueba) => {
      if(prueba==true){
        this.info.visible= true;
        this.numero = 120;
      }; 
    });


    this.gameScene.events.on('win', (victoria) => {
      if(victoria==true){
        this.win.visible= true;
        this.gameScene = this.scene.pause('Game');
        this.music = this.sound.add('winSound');
        this.music.play();

        setTimeout(function(){
          self.game.scene.keys.UI.win.visible = false;
          self.game.scene.keys.Game.music.stop();
          self.game.scene.keys.Title.scene.restart();}, 5000);

        }
    }); 

    this.gameScene.events.on('derrota', (derrota) => {
      if(derrota==true){
        this.defeat.visible= true;
        this.gameScene = this.scene.pause('Game');
        this.music = this.sound.add('defeatSound');
        this.music.play();
      }; 
     
    });
  }

  

  update (time) {
    
    
    this.timer2 = Math.floor(this.numero - (this.timer.getElapsed()/1000));
    this.info.setText('Tiempo: ' + this.timer2 + 's');

    if(this.timer2==0){
      this.derrota = true;
      this.gameScene.events.emit('derrota', this.derrota);
      
    }
  };
};