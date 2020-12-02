import Entity from './Entity';

export default class Shot extends Entity {
  constructor(scene, x, y, dirX, dirY, sprite) {
    super(scene, x, y, sprite);
    this.setScale(2, 2);
    this.body.setVelocity(dirX, dirY);
  }
}