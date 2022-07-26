import constants from '../constants';

export default class HUD extends Phaser.Scene
{
    //private bullets: Array<Phaser.GameObjects.Image>;
    private mag:        Array<Phaser.GameObjects.Image>;
    private huntedDeerCards:     Array<Phaser.GameObjects.Image>;
    private huntedDeerBg:   Phaser.GameObjects.Image;
    private gameScene:      string;
    private maxHunterDeer : number;
    private huntedDeer : number;
    private bullets: number


    constructor()
    {
        super(constants.SCENES.HUD);
        
        //this.gameScene = config.scene;
    }
    init(config: { gameScene: string; })
    {
        this.gameScene = config.gameScene;

        const level: Phaser.Scene = this.scene.get(this.gameScene);
        level.events.on(constants.EVENTS.STATUSLEVEL, this.updateLevel, this);

        
        const startLevel =   this.registry.get(constants.REGISTER.STARTLEVEL);
        this.maxHunterDeer = startLevel.maxDeer;
        this.bullets =       startLevel.bullets;
        this.huntedDeer =    0;
        
    }

    create (): void
    {

        this.huntedDeerBg =      this.add.image(505, 40, constants.BACKGROUND.SCOREBG).setScale(.4).setAlpha(.8);
        this.huntedDeerCards =   Array.from({length: this.maxHunterDeer}, (v, i) => this.add.image(440+i*65,40, constants.REGISTER.SCORE_DEER_INACTIVE).setScale(.36));
        this.mag =               Array.from({length: this.bullets}, (v, i) => this.add.image(40+i*13,40, constants.REGISTER.BULLETS));
        
        
    }

    private updateLevel() : void
    {
        //this.bullets.text = 'Bullets: ' + this.registry.get(constants.REGISTER.BULLETS); 
        console.log(this.registry.get(constants.REGISTER.STATUSLEVEL));
        let levelHuntedDeer = this.registry.get(constants.REGISTER.STATUSLEVEL);
        if (this.huntedDeer != levelHuntedDeer) {
            this.huntedDeer = levelHuntedDeer;
            this.huntedDeerCards[this.huntedDeer-1].setTexture(constants.REGISTER.SCORE_DEER_ACTIVE);
        }
        
        this.mag[this.mag.length-1].destroy();
        this.mag.pop();
    }
}