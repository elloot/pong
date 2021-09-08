import Phaser from 'phaser';
import gameOptions from './gameOptions';

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

    // Set up ball
    const ball = this.add.circle(
      width / 2,
      height / 2,
      gameOptions.ballRadius,
      0x000000
    );
    this.physics.add
      .existing(ball)
      .body.setBounce(1, 1)
      .setCollideWorldBounds(true);
    const startingVelocity = this.getStartingVelocity();
    ball.body.setVelocityX(startingVelocity.x);
    ball.body.setVelocityY(startingVelocity.y);

    // Set up paddles
    this.playerPaddle = this.add.rectangle(
      gameOptions.paddleWidth / 2,
      height / 2,
      gameOptions.paddleWidth,
      gameOptions.paddleHeight,
      0x000000
    );
    this.physics.add
      .existing(this.playerPaddle)
      .body.setCollideWorldBounds(true)
      .setImmovable(true);

    this.AIPaddle = this.add.rectangle(
      width - gameOptions.paddleWidth / 2,
      height / 2,
      gameOptions.paddleWidth,
      gameOptions.paddleHeight,
      0x000000
    );
    this.physics.add
      .existing(this.AIPaddle)
      .body.setCollideWorldBounds(true)
      .setImmovable(true);

    this.paddles = [this.playerPaddle, this.AIPaddle];

    this.physics.add.collider(ball, this.paddles);

    this.keys = this.input.keyboard.addKeys('W, S, up, down');
  }

  update() {
    if (this.keys.W.isDown || this.keys.up.isDown) {
      this.playerPaddle.body.setVelocityY(-1 * gameOptions.paddleSpeed);
    } else if (this.keys.S.isDown || this.keys.down.isDown) {
      this.playerPaddle.body.setVelocityY(gameOptions.paddleSpeed);
    } else {
      this.playerPaddle.body.setVelocityY(0);
    }
  }

  getStartingVelocity() {
    const seed = {
      x: Math.random() < 0.5 ? -1 : 1,
      y: Math.random() < 0.5 ? -1 : 1
    };
    let velocity = {};
    velocity.x = seed.x * gameOptions.startingVelocity;
    velocity.y = seed.y * gameOptions.startingVelocity;
    return velocity;
  }
}
