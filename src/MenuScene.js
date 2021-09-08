import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' });
  }

  create() {
    this.add
      .text(400, 200, 'Pong in Phaser!\n\nPress any key to start playing', {
        align: 'center',
        fill: 'white',
        fontFamily: 'sans-serif',
        fontSize: 48
      })
      .setOrigin(0.5, 0);

    this.input.keyboard.on(
      'keydown',
      function () {
        this.scene.switch('play');
      },
      this
    );
  }
}
