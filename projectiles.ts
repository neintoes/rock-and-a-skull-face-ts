abstract class Projectile extends sprites.ExtendableSprite {
    constructor(projectileImage: Image, spriteKind: number, fireAngle: number, originSprite: Sprite) {
        super(projectileImage, spriteKind);
        this.z = -1
        this.setFlag(SpriteFlag.AutoDestroy, true)
        spriteutils.setVelocityAtAngle(this, fireAngle, 40)
    }
}

class EnemyProjectile extends Projectile {
    constructor(fireAngle: number, originSprite: Sprite) {
        super(assets.image`projectile`, SpriteKind.EnemyProjectile, fireAngle, originSprite);
    }
}