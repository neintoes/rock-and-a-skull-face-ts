class PlayerSprite extends sprites.ExtendableSprite {
    // GH1
    readonly acceleration: number = 8;
    readonly deceleration: number = 0.9;
    private isMoving: boolean = false;
    // end GH1
    // GH2
    public isBlocking: boolean = false;
    // end GH2

    constructor() {
        super(assets.image`me`, SpriteKind.Player);
        // GH1 remove script
        //this.registerControls();
        // GH2 add script back
        this.registerControls();
        this.setPosition(20, 20)
        this.setStayInScreen(true)
    }

    // GH1 remove script
    // private registerControls() {
    //     controller.moveSprite(this);
    // }

    // GH1
    private registerControls() {
        controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
            this.throttleBlock();
        })
    }
    // end GH2

    // GH2
    private block(): void {
        this.setImage(assets.image`block`)
        this.isBlocking = true;
        pause(1000)
        this.setImage(assets.image`me`)
        this.isBlocking = false;
    }

    private throttleBlock(): void {
        timer.throttle("block", 2000, () => {
            this.block();
        })
    }
    // end GH2 

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
        if (this.isBlocking) {
            this.setImage(assets.image`block`);
        } else {
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
    }

    // private setAnimationStates(): void {
    //     characterAnimations.loopFrames(this, [], 500, characterAnimations.rule(Predicate.Moving))
    // }
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