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
    this.ball = this.add.circle(
      width / 2,
      height / 2,
      gameOptions.ballRadius,
      0x000000
    );
    this.physics.add
      .existing(this.ball)
      .body.setBounce(1, 1)
      .setCollideWorldBounds(true);
    const startingVelocity = this.getStartingVelocity();
    this.ball.body.setVelocityX(startingVelocity.x);
    this.ball.body.setVelocityY(startingVelocity.y);

    // If the ball collides with the left or right bounds, the game is over (ish)
    this.ball.body.onWorldBounds = true;
    this.physics.world.on('worldbounds', (_body, _up, _down, left, right) => {
      if (left || right) {
        this.scene.start('end');
      }
    });

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

    // Add collider between ball and paddles
    this.physics.add.collider(this.ball, this.paddles);

    // Add input keys
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

    this.AIPaddle.body.setVelocityY(this.ball.body.velocity.y);
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
