class EventHandlerManager {
    constructor() {
        this.initialiseOverlapEvents();
        this.initialiseDestroyEvents();
    }

    private initialiseOverlapEvents() {
        // Player <> Projectile => gameOver
        sprites.onOverlap(SpriteKind.Player, SpriteKind.EnemyProjectile, (playerSprite: PlayerSprite, proj: EnemyProjectile) => {
            // GH2
            if (playerSprite.isBlocking) {
                let skull = sprites.allOfKind(SpriteKind.Enemy)[0];
                proj.setKind(SpriteKind.Projectile);
                let angle = spriteutils.angleFrom(playerSprite, skull);
                spriteutils.setVelocityAtAngle(proj, angle, 40);
            } else {
                game.over(false);
            }
            // end GH2
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
        // GH2
        // Boss <> Projectile => bossHit
        sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, (skull: Skull, proj: Sprite) => {
            skull.hit();
            proj.destroy();
        })
        // end GH2
    }

    private initialiseDestroyEvents(): void {
        sprites.onDestroyed(SpriteKind.EnemyProjectile, (proj: Sprite) => {
            info.changeScoreBy(10);
        });
    }
}