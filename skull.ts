class Skull extends sprites.ExtendableSprite {
    constructor() {
        super(assets.image`flaming skull`, SpriteKind.Enemy)
        animation.runImageAnimation(this, assets.animation`flaming`, 150, true)
        animation.runMovementAnimation(this, animation.animationPresets(animation.bobbing), 4000, true)
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
}