class PlayerSprite extends sprites.ExtendableSprite {

    constructor() {
        super(assets.image`me`, SpriteKind.Player);
        this.registerControls();
        this.setPosition(20, 20)
        this.setStayInScreen(true)
    }

    private registerControls() {
        controller.moveSprite(this);
    }

    public knockback(angle: number) {
        controller.moveSprite(this, 0, 0);
        this.sayText("ow", 500);
        spriteutils.setVelocityAtAngle(this, angle, 150);
        timer.after(100, () => {
            this.reactivateControls();
        })
    }

    private reactivateControls() {
        this.setVelocity(0, 0)
        controller.moveSprite(this)
    }
}