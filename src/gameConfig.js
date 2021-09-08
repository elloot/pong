import Phaser from 'phaser';
import BootScene from './BootScene';
import PlayScene from './PlayScene';
import MenuScene from './MenuScene';
import EndScene from './EndScene';

export default {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#33A5E7',
  scale: {
    width: 800,
    height: 600,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [BootScene, MenuScene, PlayScene, EndScene]
};
