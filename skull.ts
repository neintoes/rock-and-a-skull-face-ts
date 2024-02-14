class Skull extends sprites.ExtendableSprite {
    // GH2
    private healthbar: StatusBarSprite
    // end GH2

    constructor() {
        super(assets.image`flaming skull`, SpriteKind.Enemy)
        animation.runImageAnimation(this, assets.animation`flaming`, 150, true)
        animation.runMovementAnimation(this, animation.animationPresets(animation.bobbing), 4000, true)
        this.healthbar = statusbars.create(20, 4, StatusBarKind.Health);
        this.healthbar.attachToSprite(this);
    }

    public generateProjectiles(time: number) {
        let arcSize = randint(1, 3) * 90
        let start = randint(1, 360)
        for (let i = 0; i < arcSize; i+= 10) {
            let fireAngle = spriteutils.degreesToRadians(start + i)
            new EnemyProjectile(fireAngle, this);
            pause(time)
        }
    }

    // GH2
    public hit(): void {
        this.healthbar.value -= 5;
        if (this.healthbar.value < 1) {
            game.over(true);
        }
    }
    // end GH2
}