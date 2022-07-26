import constants from '../constants';

export default class Deer extends Phaser.GameObjects.Sprite
{
    private gameScene: Phaser.Scene;
    private deerScale: number;
    private graphics: Phaser.GameObjects.Graphics;
    private _poligon: Phaser.Geom.Polygon;

    constructor(config: any)
    {
        super(config.gameScene, config.x, config.y, config.texture);
        this.gameScene = config.gameScene;
        this.deerScale = this.scale;
        
    }

    

    create()
    {
        this.gameScene.add.existing(this);

        //Animación idle
        this.anims.create({
            key: constants.DEER.ANIMATIONS.IDLE,
            frames: this.anims.generateFrameNames(constants.DEER.ID, {prefix: constants.DEER.ANIMATIONS.IDLE + '-', end:29}),
            yoyo: true,
            repeatDelay: 2000,
            frameRate: 5,
            repeat: -1
        });
        this.play(constants.DEER.ANIMATIONS.IDLE);

        this.createPoligon();
    }

    createPoligon() 
    {
        let poliStart = [
            this.x + (50 * this.scale), this.y + (50 * this.scale),
            this.x + (37 * this.scale), this.y + (30 * this.scale),
            this.x + (30 * this.scale), this.y + (50 * this.scale),
            this.x + (25 * this.scale), this.y + (30 * this.scale),
            this.x + (10 * this.scale), this.y + (15 * this.scale),
            this.x - (20 * this.scale), this.y + (15 * this.scale),
            this.x - (20 * this.scale), this.y + (30 * this.scale),
            this.x - (15 * this.scale), this.y + (50 * this.scale),
            this.x - (35 * this.scale), this.y + (40 * this.scale),
            this.x - (37 * this.scale), this.y + (15 * this.scale),
            this.x - (55 * this.scale), this.y - (10 * this.scale),
            this.x - (60 * this.scale), this.y - (20 * this.scale),
            this.x - (65 * this.scale), this.y - (30 * this.scale), //cabeza
            this.x - (48 * this.scale), this.y - (41 * this.scale),
            this.x - (42 * this.scale), this.y - (39 * this.scale),
            this.x - (34 * this.scale), this.y - (17 * this.scale),
            this.x + (34 * this.scale), this.y - (17 * this.scale)
        ];

        this._poligon = new Phaser.Geom.Polygon(poliStart);

        if (this.graphics) this.graphics.destroy();

        this.graphics = this.gameScene.add.graphics();
    
        
        this.graphics.lineStyle(5, 0xFF00FF, 1.0);
        this.graphics.fillStyle(0x00aa00);
        this.graphics.fillPoints(this._poligon.points, true);
        this.graphics.setAlpha(0);
    }

    update()
    {
        if (this.scale != this.deerScale) this.createPoligon();
    }

    get poligon()
    {
        return this._poligon;
    }
}