import constants from '../constants';

export default class ResultsScreen extends Phaser.Scene
{
    private width:      number;
    private height:     number;
    private gamePoints: Array<number>;
    private points:     number;
    private huntedDeer: number;
    private font:       object;
    private maxDeer:    number;
    private textResult: string;
    private buttonState: number;
    private event: string;

    constructor()
    {
        super(constants.SCENES.RESULTS);
    }
    init(data: { event: string; })
    {
        this.width =        this.cameras.main.width;
        this.height =       this.cameras.main.height;
        this.gamePoints =   this.registry.get(constants.REGISTER.POINTS);
        this.points =       this.gamePoints[0];
        this.huntedDeer =   this.gamePoints[1];
        this.font =         {fontFamily: 'font1', fontSize:'20px', color:'#e5671b'};
        this.maxDeer =      this.gamePoints[2];
        this.event = data.event;
    }

    create ()
    {

        this.add.image(this.width / 2, this.height / 2, constants.BACKGROUND.RESULTSSCREEN).setScale(.5);

        let replay = this.add.image(260, 292, constants.REGISTER.REPLAY);
        replay.setScale(.5);
        replay.setInteractive();
        replay.alpha =0.01;
        replay.on('pointerdown', () => 
        {
            //Recuperamos las escenas que vamos a reiniciar

            let gameScene = this.scene.get(constants.SCENES.TUTORIAL);
            let hud = this.scene.get(constants.SCENES.HUD);

            //Destruimos los registros y los eventos que tengamos de gameScene y el HUD

            gameScene.registry.destroy();
            gameScene.events.off(this.event);
            gameScene.scene.start(constants.SCENES.TUTORIAL);

            hud.registry.destroy();
            hud.events.off(this.event);
            hud.scene.start(constants.SCENES.HUD);

            this.scene.stop();
        });
        let next = this.add.image(357, 295, constants.REGISTER.CONTINUE);
        next.setScale(.5);
        
        
        if (this.huntedDeer == this.maxDeer) 
        {
            this.textResult =  constants.RESULTS.EXELENT;
            next.setAlpha(.01);
            next.setInteractive();
        }
        else if (this.huntedDeer >= this.maxDeer / 2) 
        {
            this.textResult =  constants.RESULTS.GOOD;
            next.setAlpha(.01);
            next.setInteractive();
        }
        else 
        {
            this.textResult = constants.RESULTS.BAD;
                next.disableInteractive();
                next.setAlpha(.6);
        }

        this.add.text(this.width / 2 - 100, this.height / 2 - 50, this.textResult, this.font).setOrigin(0,0);
        this.add.text(this.width / 2 - 100, this.height / 2 - 10, 'SCORE: ', this.font).setOrigin(0,0);
        let pointsText = this.add.text(this.width / 2 - 40, this.height / 2 - 10, '0', this.font).setOrigin(0,0);

        let counter = this.tweens.addCounter({
            from: 0,
            to: this.points,
            duration: 3500,
            onUpdate: () => {
                pointsText.setText(String(Math.trunc(counter.getValue())));
            }
        });

        
        
    }
}