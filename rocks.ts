class Rock extends sprites.ExtendableSprite {
    readonly frameLen: number = 100;

    constructor() {
        super(image.create(16, 16), SpriteKind.Rock)
        this.initialiseLifeCycle();
    }

    private initialiseLifeCycle(): void {
        timer.background(() => {
            this.enterLevel();
            pause(randint(2500, 8000));
            this.exitLevel();
        })
    }

    private enterLevel(): void {
        let anim = assets.animation`rock entry`;
        spriteutils.placeAngleFrom(this, randint(0, Math.PI * 2), 35, spriteutils.pos(80, 60));
        scene.cameraShake(4, anim.length * this.frameLen);
        animation.runImageAnimation(this, anim, this.frameLen, false);
    }

    private exitLevel(): void {
        let anim = assets.animation`rock exit`;
        animation.runImageAnimation(this, anim, this.frameLen, false);
        this.lifespan = this.frameLen * anim.length;
    }
}