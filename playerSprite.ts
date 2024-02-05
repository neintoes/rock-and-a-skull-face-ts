class PlayerSprite extends sprites.ExtendableSprite {
    // GH1
    readonly acceleration: number = 8;
    readonly deceleration: number = 0.9;
    private isMoving: boolean = false;
    // end GH1

    constructor() {
        super(assets.image`me`, SpriteKind.Player);
        // GH1 remove script
        //this.registerControls();
        this.setPosition(20, 20)
        this.setStayInScreen(true)
    }

    // GH1 remove script
    // private registerControls() {
    //     controller.moveSprite(this);
    // }

    // GH1
    public movement(): void {
        if (controller.up.isPressed()) {
            this.vy -= this.acceleration
        }
        else if (controller.down.isPressed()) {
            this.vy += this.acceleration
        }
        if (controller.left.isPressed()) {
            this.vx -= this.acceleration
        }
        else if (controller.right.isPressed()) {
            this.vx += this.acceleration
        }
        this.vx *= this.deceleration
        this.vy *= this.deceleration
    }

    public moveCheck(): void {
        if (Math.abs(this.vx) > 8 || Math.abs(this.vy) > 8) {
            if (!this.isMoving) {
                animation.runImageAnimation(this, assets.animation`walking`, 100, true);
                this.isMoving = true;
            }
        } else {
            animation.stopAnimation(animation.AnimationTypes.All, this)
            this.isMoving = false;
        }
    }
    // end GH1

    public knockback(angle: number): void {
        controller.moveSprite(this, 0, 0);
        this.sayText("ow", 500);
        spriteutils.setVelocityAtAngle(this, angle, 150);
        timer.after(100, () => {
            this.reactivateControls();
        })
    }

    private reactivateControls(): void {
        this.setVelocity(0, 0)
        controller.moveSprite(this)
    }
}