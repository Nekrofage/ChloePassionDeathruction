function Spider(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'spider');

    // anchor
    this.anchor.set(0.5);
    // animation
    this.animations.add('crawl', [9, 10, 12], 8, true);
    this.animations.add('die', [0, 4, 0, 4, 0, 4, 3, 3, 3, 3, 3, 3], 12);
    this.animations.play('crawl');


    // physic properties
    this.game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.body.setSize(29, 37, 16, 24);

    this.body.velocity.x = Spider.SPEED;
}

Spider.SPEED = 100;

// inherit from Phaser.Sprite
Spider.prototype = Object.create(Phaser.Sprite.prototype);
Spider.prototype.constructor = Spider;

Spider.prototype.update = function() {
    if (this.body.touching.right || this.body.blocked.right)
        this.body.velocity.x = -Spider.SPEED;
    if (this.body.touching.left || this.body.blocked.left)
        this.body.velocity.x = Spider.SPEED;
};

Spider.prototype.die = function() {
    this.body.enable = false;
    this.animations.play('die').onComplete.addOnce(function() {
        this.kill();
    }, this);
};
