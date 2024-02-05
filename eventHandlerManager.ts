class EventHandlerManager {
    constructor() {
        this.initialiseOverlapEvents();
        this.initialiseDestroyEvents();
    }

    private initialiseOverlapEvents() {
        // Player <> Projectile => gameOver
        sprites.onOverlap(SpriteKind.Player, SpriteKind.EnemyProjectile, (playerSprite: PlayerSprite, proj: EnemyProjectile) => {
            game.over(false);
        });
        // Projectile <> Rock => blockProjectile
        sprites.onOverlap(SpriteKind.EnemyProjectile, SpriteKind.Rock, (proj: EnemyProjectile, rock: Rock) => {
            proj.destroy();
        });
        // Player <> Enemy => knockBack
        sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, (playerSprite: PlayerSprite, skull: Skull) => {
            let angle = spriteutils.angleFrom(skull, playerSprite);
            playerSprite.knockback(angle);
        });
        // Player <> Rock => rockBoundaryEnforcement
        sprites.onOverlap(SpriteKind.Player, SpriteKind.Rock, (playerSprite: PlayerSprite, rock: Rock) => {
            let angle = spriteutils.angleFrom(rock, playerSprite);
            spriteutils.placeAngleFrom(playerSprite, angle, 16, rock);
        });
        // Rock <> Rock => fixRockOverlap
        sprites.onOverlap(SpriteKind.Rock, SpriteKind.Rock, (rock: Rock, otherRock: Rock) => {
            sprites.allOfKind(SpriteKind.Rock).pop().destroy();
        });
    }

    private initialiseDestroyEvents(): void {
        sprites.onDestroyed(SpriteKind.EnemyProjectile, (proj: Sprite) => {
            info.changeScoreBy(10);
        });
    }
}