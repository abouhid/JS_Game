import Player from '../src/Entities/Player'
import Entity from '../src/Entities/Entity';


test('Checks if Player is a subclass of Entity', () => {
  expect(Player).toBeSubclassOf(Entity);
});
