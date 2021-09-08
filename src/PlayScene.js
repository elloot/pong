import Phaser from 'phaser';

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'play',
      physics: {
        arcade: {
          debug: false
        }
      }
    });
  }

  create() {
    const { width, height } = this.sys.game.canvas;
    const ball = this.add.circle(width / 2, height / 2, 75, 0x000000);
    this.physics.add.existing(ball);
    ball.body.setBounce(1, 1).setCollideWorldBounds(true);
    const startingVelocity = this.getRandomVelocity();
    ball.body.setVelocityX(startingVelocity.x);
    ball.body.setVelocityY(startingVelocity.y);
  }

  update() {}

  getRandomVelocity() {
    const seed = { x: Math.random(), y: Math.random() };
    let velocity = {};
    velocity.x = seed.x < 0.5 ? seed.x * 200 * -1 : seed.x * 200;
    velocity.y = seed.y < 0.5 ? seed.y * 200 * -1 : seed.y * 200;
    return velocity;
  }
}
