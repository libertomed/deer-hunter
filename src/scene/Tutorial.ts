import constants from '../constants';
import Deer from '../gameobjects/Deer';
import Shooter from '../gameobjects/Shooter';

export default class Tutorial extends Phaser.Scene
{
    private bullets:    number;
    private background: Phaser.GameObjects.Image;
    private huntedDeer: number;
    private points:     number;
    private maxDeer: number;
    private deer: Deer;
    private shooter: Shooter;
    private startLevel: object;

    constructor ()
    {
        super(constants.SCENES.TUTORIAL);
        
    }

    init(config: { bullets: number; maxDeer: number; })
    {
        this.bullets =      config.bullets;
        this.points =       0;
        this.maxDeer =      config.maxDeer;
        this.huntedDeer =   0;

        this.startLevel = 
        {
            bullets:    this.bullets, 
            maxDeer:    this.maxDeer,
        }
    }


    create ()
    {
        this.registry.set(constants.REGISTER.STARTLEVEL, this.startLevel);

        //Animación de entrada
        this.cameras.main.fadeOut(0);
        this.cameras.main.fadeIn(6000);
        this.cameras.main.scrollX = (this.cameras.main.worldView.x - 150);
        this.tweens.add(
        {
            targets: this.cameras.main,
            scrollX: (this.cameras.main.worldView.x + 150),
            ease: 'Sine.easeInOut',
            repeat: 0,
            duration: 6000
        });

        //Fondo
        this.background = this.add.image(390, 100, constants.BACKGROUND.BACKGROUND).setDepth(-1);

        //Camara
        this.cameras.main.setBounds(-200, -250, 1200,710);

        //Drag Camera
        this.input.on('pointermove', (p: { isDown: any; x: number; prevPosition: { x: number; y: number; }; y: number; }) => {
            if (!p.isDown) return;
    
            this.cameras.main.scrollX -= (p.x - p.prevPosition.x) / this.cameras.main.zoom;
            this.cameras.main.scrollY -= (p.y - p.prevPosition.y) / this.cameras.main.zoom;
        });

        //Crear deer
        this.deer = new Deer(
            {
                gameScene: this,
                x: 420,
                y:250,
                texture: constants.DEER.ID
            }
        );

        //Animación del deer
        this.deer.create();

        //Shooter
        this.shooter = new Shooter(this, this.cameras.main);
        this.shooter.create();

        //Shoot
        this.shooter.shoterButton.on('pointerdown', () => 
        {
            if (this.deer.poligon.contains(
                (this.cameras.main.worldView.x + this.shooter.shootPoint.x) / this.cameras.main.zoom, 
                (this.cameras.main.worldView.y + this.shooter.shootPoint.y) / this.cameras.main.zoom)) 
            {
                this.huntedDeer ++;
                this.points += 100;

                this.add.tween({
                    targets: [this.deer],
                    duration: 1050,
                    alpha: 0,
                    repeat: 0,
                    onComplete: () => {
                        
                    }
                });
                
            }
            this.bullets --;
            this.registry.set(constants.REGISTER.STATUSLEVEL, this.huntedDeer);
            this.events.emit(constants.EVENTS.STATUSLEVEL);
        });
    }

    

    update()
    {
        

        if (this.bullets === 0 || this.huntedDeer === this.maxDeer) 
        {
            //this.cameras.main.fade(4000, 0x000000);
            this.add.tween({
                targets: [this.cameras.main],
                duration: 3000,
                delay: 2000,
                alpha: 0,
                color: 0x000000,
                repeat: 0,
                onStart: () =>
                {
                    this.cameras.main.fade(3000, 0x000000);
                },
                onComplete: () => 
                {
                    this.scene.start(constants.SCENES.RESULTS, {event: constants.EVENTS.STATUSLEVEL});

                    this.registry.set(constants.REGISTER.POINTS, [this.points, this.huntedDeer, this.maxDeer]);

                    this.scene.stop(constants.SCENES.TUTORIAL);
                    this.scene.stop(constants.SCENES.HUD);
                }
            });
            
            
        }
        this.deer.update();
    }
}