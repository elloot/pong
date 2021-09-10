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
    this.width = this.sys.game.canvas.width;
    this.height = this.sys.game.canvas.height;

    // Set up ball
    this.ball = this.add.circle(
      this.width / 2,
      this.height / 2,
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
      if (left) {
        this.game.global.AIScore++;
        this.AIScore.setText(this.game.global.AIScore);
        this.reset();
      } else if (right) {
        this.game.global.playerScore++;
        this.playerScore.setText(this.game.global.playerScore);
        this.reset();
      }
    });

    // Set up paddles
    this.playerPaddle = this.add.rectangle(
      gameOptions.paddleWidth,
      this.height / 2,
      gameOptions.paddleWidth,
      gameOptions.paddleHeight,
      0x000000
    );
    this.physics.add
      .existing(this.playerPaddle)
      .body.setCollideWorldBounds(true)
      .setImmovable(true);

    this.AIPaddle = this.add.rectangle(
      this.width - gameOptions.paddleWidth,
      this.height / 2,
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
    this.physics.add.collider(this.ball, this.paddles, (ball, paddle) => {
      const ballVelocityX = ball.body.velocity.x;
      if (
        Math.sign(ballVelocityX) > 0 &&
        ballVelocityX < gameOptions.ballMaxVelocity
      ) {
        this.ball.body.velocity.x += 20;
      } else if (
        Math.sign(ballVelocityX) < 0 &&
        ballVelocityX > -gameOptions.ballMaxVelocity
      ) {
        this.ball.body.velocity.x -= 20;
      }

      // Make the ball go up or down based on where it hits the paddle
      const ballPaddleDistance = ball.y - paddle.y;
      const ballPaddleDistanceCoeff =
        ballPaddleDistance /
        (gameOptions.paddleHeight / 2 + gameOptions.ballRadius);
      const ballNewVelocityY =
        ballPaddleDistanceCoeff * 0.8 * gameOptions.ballMaxVelocity;
      ball.body.setVelocityY(ballNewVelocityY);
    });

    // Add input keys
    this.keys = this.input.keyboard.addKeys('W, S, up, down');

    // Show score
    this.playerScore = this.add.text(
      this.width / 6,
      gameOptions.scoreFontSize / 2,
      this.game.global.playerScore,
      {
        fontFamily: 'sans-serif',
        fontSize: gameOptions.scoreFontSize + 'px'
      }
    );
    this.AIScore = this.add.text(
      this.width - this.width / 6,
      gameOptions.scoreFontSize / 2,
      this.game.global.AIScore,
      {
        fontFamily: 'sans-serif',
        fontSize: gameOptions.scoreFontSize + 'px'
      }
    );
  }

  update() {
    if (this.keys.W.isDown || this.keys.up.isDown) {
      this.playerPaddle.body.setVelocityY(-1 * gameOptions.paddleSpeed);
    } else if (this.keys.S.isDown || this.keys.down.isDown) {
      this.playerPaddle.body.setVelocityY(gameOptions.paddleSpeed);
    } else {
      this.playerPaddle.body.setVelocityY(0);
    }

    // Weird stuff for the AIPaddles velocity
    let ballPaddleDistance = this.ball.y - this.AIPaddle.y;
    let distanceCoefficient = Math.abs(ballPaddleDistance) / this.height;
    let speedCoefficient = distanceCoefficient * distanceCoefficient;
    speedCoefficient = this.game.global.AIFunction(speedCoefficient);
    let newVel =
      Math.sign(ballPaddleDistance) *
      gameOptions.AIPaddleSpeed *
      speedCoefficient;
    this.AIPaddle.body.setVelocityY(newVel);
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

  reset() {
    this.scene.switch('continue');
  }
}
