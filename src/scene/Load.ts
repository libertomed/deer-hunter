import constants from '../constants';
import Tutorial from './Tutorial';

export default class Load extends Phaser.Scene 
{    
    private loadingBar :    Phaser.GameObjects.Graphics;
    private progressgBar :  Phaser.GameObjects.Graphics;

    constructor(){
        super(constants.SCENES.LOAD);
    }

    preload(): void{

        this.cameras.main.setBackgroundColor(0x000000);
        

        this.load.image('dog',    'assets/chargingScreen/dog.png');
        this.load.image('deer',   'assets/chargingScreen/deer.png');
        this.load.image('bg',     'assets/chargingScreen/bg_menu.png');
        this.load.image('logoDH', 'assets/chargingScreen/logo.png');
        /*
        this.load.image('loadingImg', 'assets/chargingScreen/loadingImg.jpg');
        
        this.load.on(
            'progress',
            () => {
                const loadGame = this.add.image(320, 155, 'loadingImg');
                loadGame.setScale(.6);

            }
        ); 
        */
        this.load.on(
            'progress',
            (value: number) =>{
                this.add.image(320, 155, 'bg').setScale(.6);
                this.createBars();
                this.progressgBar.clear();
                this.progressgBar.fillStyle(0xe5671b, 1);
                this.progressgBar.fillRect(
                    this.cameras.main.width / 3,
                    this.cameras.main.height - 68,
                    (this.cameras.main.width / 3) * value,
                    16
                );
                
                this.add.image(80,  185,  'dog').setScale(.6);
                this.add.image(530, 155, 'deer').setScale(.6);
                this.add.image(320, 100, 'logoDH').setScale(.6);
            },
            this
        );

        this.load.on(
            'complete',
            () => {
                this.scene.start('tutorial', {maxDeer: 1, bullets: 5});
                this.scene.start('HUD', {gameScene: constants.SCENES.TUTORIAL});
                this.scene.bringToTop('HUD');
            },
            this
        );

        this.load.path = 'assets/';

        //Carga del logo para ver barra de progreso
        for (let i = 0; i < 1000; i++) this.load.image('logo' + i, 'phaser3-logo.png');

        //Fondo
        this.load.image(constants.BACKGROUND.BACKGROUND, 'background/background.jpg');

        //Pantalla de resultados 
        this.load.image(constants.BACKGROUND.RESULTSSCREEN, 'background/resultsscreen.jpg');

        //balas
        this.load.image(constants.REGISTER.BULLETS, 'objects/bullet_small.png');

        //Ciervos cazados
        this.load.image(constants.REGISTER.SCORE_DEER_INACTIVE, 'objects/scoreIcon/scoreIcon_inactive.png');
        this.load.image(constants.REGISTER.SCORE_DEER_ACTIVE,   'objects/scoreIcon/scoreIcon_active.png');
        this.load.image(constants.BACKGROUND.SCOREBG,           'objects/scoreIcon/scoreIcon_BG.png');

        //buttons
        this.load.image(constants.REGISTER.REPLAY,   'objects/replay.png');
        this.load.image(constants.REGISTER.CONTINUE, 'objects/continue.png');

        //deer
        this.load.atlas(constants.DEER.ID, 'objects/deer/spritesheet.png', 'objects/deer/spritesheet.json');

        //shooter
        this.load.image(constants.SHOOTER.ID,           'objects/shooter/shooter.png');
        this.load.image(constants.SHOOTER.SCOPE,        'objects/shooter/scope.png');
        this.load.image(constants.SHOOTER.SHOOTBUTTON,  'objects/shooter/shootButton.png');
        this.load.image(constants.SHOOTER.SHOOTERPOINT, 'objects/shooter/shootpoint.png');
        this.load.spritesheet(constants.SHOOTER.FIRE,   'objects/shooter/fire.png', {frameWidth: 122, frameHeight:314});

    }

    /**
     * Crea la barra de progreso
     */
    private createBars(): void{
        this.loadingBar = this.add.graphics();
        this.loadingBar.fillStyle(0xffffff, 1);
        this.loadingBar.fillRect(
            this.cameras.main.width / 3 - 2,
            this.cameras.main.height - 70,
            this.cameras.main.width / 3 + 4,
            20
        );
        this.progressgBar = this.add.graphics();
    }
}