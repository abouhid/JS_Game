import Enemy from '../src/Entities/Enemy'
import Entity from '../src/Entities/Entity';

test('Checks if Enemy is a subclass of Entity', () => {
  expect(Enemy).toBeSubclassOf(Entity);
});
