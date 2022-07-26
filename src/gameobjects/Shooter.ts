import constants from '../constants';

export default class Shooter extends Phaser.GameObjects.Sprite
{
    private gameScene: Phaser.Scene;
    private _shooterButton: Phaser.GameObjects.Image;
    private _shootPoint: Phaser.GameObjects.Image;
    private gameCamera: Phaser.Cameras.Scene2D.Camera;
    public shootPointLocation: number;
    private _fire: Phaser.GameObjects.Sprite;

    constructor(gameScene: Phaser.Scene, gameCamera: Phaser.Cameras.Scene2D.Camera)
    {
        super(gameScene, 460, 340, constants.SHOOTER.ID);
        this.gameScene = gameScene;
        this.gameCamera = gameCamera;

    }

    create(): void
    {
        //Add shooter
        this.gameScene.add.existing(this);
        this.setScale(.4);
        this.setScrollFactor(0);

        //Add shootPoint 
        this._shootPoint = this.gameScene.add.image(310, 210, constants.SHOOTER.SHOOTERPOINT);
        this._shootPoint.setScale(.2);
        this._shootPoint.setScrollFactor(0);

        //Add shooterButton
        this._shooterButton =  this.gameScene.add.image(550, 310, constants.SHOOTER.SHOOTBUTTON);
        this._shooterButton.setScale(.35);
        this._shooterButton.setInteractive();
        this._shooterButton.setScrollFactor(0);

        this._shooterButton.on('pointerdown', () =>{
            console.log(this.gameCamera.worldView.x + this._shootPoint.x );
            this.shootEfect();
        });
    }

    shootEfect(): void
    {
        this.gameScene.add.tween({
            targets: this.gameCamera,
            duration: 100,
            scrollY: (this.gameCamera.worldView.y -40),
            repeat: 0,
            yoyo: true,
            onStart: () => {
                this.gameScene.add.tween({
                    targets: this,
                    duration: 150,
                    rotation: 0.04,
                    yoyo: true,
                    repeat: 0
                });
                this.fireEfect();
                
            }
        });
    }

    fireEfect(): void
    {
        this._fire = this.gameScene.add.sprite(335, 250, constants.SHOOTER.FIRE);
        this._fire.setScrollFactor(0);
        this.gameScene.anims.create({
            key: constants.SHOOTER.FIREANIM,
            frames: this.gameScene.anims.generateFrameNames(constants.SHOOTER.FIRE, {
                start: 0,
                end: 1
            }),
            hideOnComplete: true,
            repeat: 0,
            frameRate: 12
        });
        this._fire.setRotation(-.96);
        this._fire.setScale(.2);
        this._fire.play(constants.SHOOTER.FIREANIM);
    }

    get shoterButton()
    {
        return this._shooterButton;
    }

    get shootPoint()
    {
        return this._shootPoint;
    }
}