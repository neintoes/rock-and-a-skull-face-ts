namespace SpriteKind {
    export const Rock = SpriteKind.create();
    export const EnemyProjectile = SpriteKind.create();
}

class GameManager {
    private enemySkull: Skull;
    private playerSprite: PlayerSprite;

    constructor() {
        this.setupLevel();
        this.initialisePlayer();
        this.enemySkull = new Skull();
        new EventHandlerManager();
        // GH1
        this.onUpdates();
        // end GH1
        timer.after(randint(3500, 5000), () => {
            this.combatCycle();
        });
    }

    private initialisePlayer(): void {
        info.setScore(0);
        this.playerSprite = new PlayerSprite();
    }

    private setupLevel(): void {
        scene.setBackgroundImage(assets.image`background`);
    }

    private combatCycle(): void {
        for (let i = 0; i < randint(1, 3); i++) {
            new Rock();
        }
        music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.UntilDone);
        if (randint(1, 2) == 2) {
            this.enemySkull.generateProjectiles(50);
        } else {
            this.enemySkull.generateProjectiles(0);
        }
        timer.after(randint(3500, 5000), () => {
            this.combatCycle();
        });
    }

    // GH1
    private onUpdates(): void {
        game.onUpdate(() => {
            this.playerSprite.movement();
            this.playerSprite.moveCheck();
        });
    }
    // end GH1
}