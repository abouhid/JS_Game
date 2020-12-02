import Entity from "./Entity"

export default class Enemy1 extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy_1');
    this.setData('speed', 300);
  }
};