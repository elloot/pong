import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' });
  }

  create() {
    let width = this.sys.game.canvas.width;
    let height = this.sys.game.canvas.height;
    const easyButton = this.add
      .text(width / 2, height / 6, 'Easy', {
        align: 'center',
        fontFamily: 'sans-serif',
        fontSize: '32px'
      })
      .setInteractive()
      .setOrigin(0.5, 0);
    const mediumButton = this.add
      .text(width / 2, height / 3, 'Medium', {
        align: 'center',
        fontFamily: 'sans-serif',
        fontSize: '32px'
      })
      .setInteractive()
      .setOrigin(0.5, 0);
    const hardButton = this.add
      .text(width / 2, height / 2, 'Hard', {
        align: 'center',
        fontFamily: 'sans-serif',
        fontSize: '32px'
      })
      .setInteractive()
      .setOrigin(0.5, 0);

    easyButton.on('pointerdown', () => {
      this.game.global.AIFunction = function (speedCoefficient) {
        return 0.000729 * Math.pow(8.29 * Math.pow(10, 270), speedCoefficient);
      };
      this.scene.switch('play');
    });
    mediumButton.on('pointerdown', () => {
      this.game.global.AIFunction = function (speedCoefficient) {
        return 0.016 * Math.pow(1.74 * Math.pow(10, 154), speedCoefficient);
      };
      this.scene.switch('play');
    });
    hardButton.on('pointerdown', () => {
      this.game.global.AIFunction = function (speedCoefficient) {
        return 0.1 * Math.pow(9.72 * Math.pow(10, 85), speedCoefficient);
      };
      this.scene.switch('play');
    });

    this.input.keyboard.on(
      'keydown',
      function () {
        this.scene.switch('play');
      },
      this
    );
  }
}
