import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'continue' });
  }

  create() {
    this.add
      .text(400, 200, 'Press any key to continue playing', {
        align: 'center',
        fill: 'white',
        fontFamily: 'sans-serif',
        fontSize: 48
      })
      .setOrigin(0.5, 0);
    this.input.keyboard.on(
      'keydown',
      function () {
        this.scene.stop('play');
        this.scene.switch('play');
      },
      this
    );
  }
}
